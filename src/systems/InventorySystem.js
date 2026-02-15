// Inventory System - Core inventory management logic
// Handles item storage, stacking, persistence, and slot management
// Inspired by Stardew Valley's inventory system

import { getItemDefinition, ItemType } from '../data/items.js';

/**
 * Represents a single item stack in the inventory
 */
export class ItemStack {
    constructor(itemId, quantity = 1) {
        this.itemId = itemId;
        this.quantity = quantity;
        this.definition = getItemDefinition(itemId);

        if (!this.definition) {
            console.error(`Invalid item ID: ${itemId}`);
        }
    }

    /**
     * Check if this stack can accept more items
     * @returns {boolean}
     */
    canStack() {
        if (!this.definition || !this.definition.stackable) return false;
        return this.quantity < this.definition.maxStack;
    }

    /**
     * Add items to this stack
     * @param {number} amount - Number of items to add
     * @returns {number} - Number of items that couldn't be added (overflow)
     */
    addToStack(amount) {
        if (!this.definition || !this.definition.stackable) return amount;

        const maxStack = this.definition.maxStack;
        const spaceLeft = maxStack - this.quantity;
        const canAdd = Math.min(amount, spaceLeft);

        this.quantity += canAdd;
        return amount - canAdd; // Return overflow
    }

    /**
     * Remove items from this stack
     * @param {number} amount - Number of items to remove
     * @returns {number} - Number actually removed
     */
    removeFromStack(amount) {
        const removed = Math.min(amount, this.quantity);
        this.quantity -= removed;
        return removed;
    }

    /**
     * Check if stack is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.quantity <= 0;
    }

    /**
     * Serialize for saving
     * @returns {Object}
     */
    serialize() {
        return {
            itemId: this.itemId,
            quantity: this.quantity
        };
    }
}

/**
 * Main Inventory System
 * Manages all item storage, hotbar, and inventory operations
 */
export default class InventorySystem {
    constructor(scene, config = {}) {
        this.scene = scene;

        // Configuration
        this.config = {
            hotbarSize: config.hotbarSize || 10,
            inventoryRows: config.inventoryRows || 4, // 4 rows including hotbar
            inventoryCols: config.inventoryCols || 10, // 10 columns per row
            persistKey: config.persistKey || 'montessori_inventory'
        };

        // Calculate total slots
        this.totalSlots = this.config.inventoryRows * this.config.inventoryCols;
        this.hotbarSize = this.config.hotbarSize;

        // Initialize slots (array of ItemStack or null)
        this.slots = new Array(this.totalSlots).fill(null);

        // Selected hotbar slot (0-9 for hotbar)
        this.selectedSlot = 0;

        // Check if this is a new game session
        const isNewGame = this.scene.registry.get('isNewGame');

        if (isNewGame) {
            // Fresh game start - empty inventory
            console.log('New game detected - starting with empty inventory');
            // Clear the flag so subsequent scene transitions load from storage
            this.scene.registry.set('isNewGame', false);
        } else {
            // Continuation or scene transition - load saved inventory
            this.loadFromStorage();
        }

        console.log(`InventorySystem initialized: ${this.totalSlots} slots (${this.hotbarSize} hotbar)`);
    }

    /**
     * Add an item to the inventory
     * @param {string} itemId - Item ID to add
     * @param {number} quantity - Amount to add
     * @returns {boolean} - True if all items were added, false if inventory full
     */
    addItem(itemId, quantity = 1) {
        const definition = getItemDefinition(itemId);
        if (!definition) {
            console.error(`Cannot add unknown item: ${itemId}`);
            return false;
        }

        let remaining = quantity;

        // Strategy 1: Try to stack with existing items
        if (definition.stackable) {
            for (let i = 0; i < this.slots.length && remaining > 0; i++) {
                const slot = this.slots[i];
                if (slot && slot.itemId === itemId && slot.canStack()) {
                    remaining = slot.addToStack(remaining);
                }
            }
        }

        // Strategy 2: Fill empty slots
        for (let i = 0; i < this.slots.length && remaining > 0; i++) {
            if (!this.slots[i]) {
                const stack = new ItemStack(itemId, 0);
                remaining = stack.addToStack(remaining);
                this.slots[i] = stack;
            }
        }

        // Save after modification
        this.saveToStorage();

        // Log result
        if (remaining > 0) {
            console.warn(`Inventory full! Could not add ${remaining} ${itemId}`);
            return false;
        } else {
            console.log(`Added ${quantity} ${itemId} to inventory`);
            return true;
        }
    }

    /**
     * Remove an item from inventory
     * @param {string} itemId - Item ID to remove
     * @param {number} quantity - Amount to remove
     * @returns {boolean} - True if all items were removed
     */
    removeItem(itemId, quantity = 1) {
        let remaining = quantity;

        // Remove from stacks (from end to start)
        for (let i = this.slots.length - 1; i >= 0 && remaining > 0; i--) {
            const slot = this.slots[i];
            if (slot && slot.itemId === itemId) {
                const removed = slot.removeFromStack(remaining);
                remaining -= removed;

                // Clear slot if empty
                if (slot.isEmpty()) {
                    this.slots[i] = null;
                }
            }
        }

        // Save after modification
        this.saveToStorage();

        if (remaining > 0) {
            console.warn(`Not enough ${itemId} to remove ${quantity} (missing ${remaining})`);
            return false;
        }

        return true;
    }

    /**
     * Check if inventory contains an item
     * @param {string} itemId - Item to check
     * @param {number} quantity - Minimum quantity needed
     * @returns {boolean}
     */
    hasItem(itemId, quantity = 1) {
        let count = 0;
        for (const slot of this.slots) {
            if (slot && slot.itemId === itemId) {
                count += slot.quantity;
                if (count >= quantity) return true;
            }
        }
        return false;
    }

    /**
     * Count total quantity of an item
     * @param {string} itemId
     * @returns {number}
     */
    countItem(itemId) {
        let count = 0;
        for (const slot of this.slots) {
            if (slot && slot.itemId === itemId) {
                count += slot.quantity;
            }
        }
        return count;
    }

    /**
     * Get the currently selected hotbar item
     * @returns {ItemStack|null}
     */
    getSelectedItem() {
        return this.slots[this.selectedSlot] || null;
    }

    /**
     * Get item at specific slot
     * @param {number} slotIndex
     * @returns {ItemStack|null}
     */
    getItemAt(slotIndex) {
        if (slotIndex < 0 || slotIndex >= this.slots.length) return null;
        return this.slots[slotIndex];
    }

    /**
     * Use/consume the currently selected item
     * @returns {Object} - Result object with success status and message
     */
    useSelectedItem() {
        const item = this.getSelectedItem();
        if (!item) {
            return { success: false, message: 'No item selected' };
        }

        const definition = item.definition;
        if (!definition.useFunction) {
            return { success: false, message: `${definition.name} cannot be used` };
        }

        // Execute the item's use function
        const result = definition.useFunction(this.scene, this);

        // If successful and item is consumable, remove one
        if (result.success && (definition.type === ItemType.FOOD || definition.type === ItemType.CONSUMABLE)) {
            this.removeItem(item.itemId, 1);
        }

        this.saveToStorage();
        return result;
    }

    /**
     * Use an item at a specific slot index
     * @param {number} slotIndex - Slot index to use item from
     * @returns {Object} { success: boolean, message: string }
     */
    useItem(slotIndex) {
        const item = this.getItemAt(slotIndex);
        if (!item) {
            return { success: false, message: 'No item in that slot' };
        }

        const definition = item.definition;
        if (!definition.useFunction) {
            return { success: false, message: `${definition.name} cannot be used` };
        }

        // Execute the item's use function
        const result = definition.useFunction(this.scene, this);

        // If successful and item is consumable, remove one
        if (result.success && (definition.type === ItemType.FOOD || definition.type === ItemType.CONSUMABLE)) {
            this.removeItem(item.itemId, 1);
        }

        this.saveToStorage();
        return result;
    }

    /**
     * Select a hotbar slot
     * @param {number} slotIndex - Index 0-9
     */
    selectSlot(slotIndex) {
        if (slotIndex >= 0 && slotIndex < this.hotbarSize) {
            this.selectedSlot = slotIndex;
            console.log(`Selected hotbar slot ${slotIndex}`);
        }
    }

    /**
     * Move item from one slot to another
     * @param {number} fromIndex
     * @param {number} toIndex
     * @returns {boolean}
     */
    moveItem(fromIndex, toIndex) {
        if (fromIndex === toIndex) return false;
        if (fromIndex < 0 || fromIndex >= this.slots.length) return false;
        if (toIndex < 0 || toIndex >= this.slots.length) return false;

        const fromSlot = this.slots[fromIndex];
        const toSlot = this.slots[toIndex];

        // If destination is empty, simple move
        if (!toSlot) {
            this.slots[toIndex] = fromSlot;
            this.slots[fromIndex] = null;
            this.saveToStorage();
            return true;
        }

        // If both slots have same item and can stack, try to stack
        if (fromSlot && toSlot && fromSlot.itemId === toSlot.itemId && toSlot.canStack()) {
            const overflow = toSlot.addToStack(fromSlot.quantity);
            if (overflow > 0) {
                fromSlot.quantity = overflow;
            } else {
                this.slots[fromIndex] = null;
            }
            this.saveToStorage();
            return true;
        }

        // Otherwise, swap
        this.slots[toIndex] = fromSlot;
        this.slots[fromIndex] = toSlot;
        this.saveToStorage();
        return true;
    }

    /**
     * Clear entire inventory
     */
    clearInventory() {
        this.slots = new Array(this.totalSlots).fill(null);
        this.selectedSlot = 0;
        this.saveToStorage();
        console.log('Inventory cleared');
    }

    /**
     * Get all hotbar items (first row)
     * @returns {Array<ItemStack|null>}
     */
    getHotbarItems() {
        return this.slots.slice(0, this.hotbarSize);
    }

    /**
     * Get all inventory items (everything)
     * @returns {Array<ItemStack|null>}
     */
    getAllItems() {
        return [...this.slots];
    }

    /**
     * Get inventory organized by rows
     * @returns {Array<Array<ItemStack|null>>}
     */
    getInventoryRows() {
        const rows = [];
        const cols = this.config.inventoryCols;

        for (let row = 0; row < this.config.inventoryRows; row++) {
            const startIdx = row * cols;
            const endIdx = startIdx + cols;
            rows.push(this.slots.slice(startIdx, endIdx));
        }

        return rows;
    }

    /**
     * Save inventory to localStorage
     */
    saveToStorage() {
        try {
            const data = {
                slots: this.slots.map(slot => slot ? slot.serialize() : null),
                selectedSlot: this.selectedSlot
            };
            localStorage.setItem(this.config.persistKey, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save inventory:', error);
        }
    }

    /**
     * Load inventory from localStorage
     */
    loadFromStorage() {
        try {
            const savedData = localStorage.getItem(this.config.persistKey);
            if (savedData) {
                const data = JSON.parse(savedData);

                // Restore slots
                this.slots = data.slots.map(slotData => {
                    if (slotData) {
                        return new ItemStack(slotData.itemId, slotData.quantity);
                    }
                    return null;
                });

                // Restore selected slot
                this.selectedSlot = data.selectedSlot || 0;

                console.log('Inventory loaded from storage');
            }
        } catch (error) {
            console.error('Failed to load inventory:', error);
        }
    }

    /**
     * Alternative: Save to Phaser registry (cross-scene persistence)
     * @param {Phaser.Game} game
     */
    saveToRegistry(game) {
        const data = {
            slots: this.slots.map(slot => slot ? slot.serialize() : null),
            selectedSlot: this.selectedSlot
        };
        game.registry.set(this.config.persistKey, data);
    }

    /**
     * Alternative: Load from Phaser registry
     * @param {Phaser.Game} game
     */
    loadFromRegistry(game) {
        const data = game.registry.get(this.config.persistKey);
        if (data) {
            this.slots = data.slots.map(slotData => {
                if (slotData) {
                    return new ItemStack(slotData.itemId, slotData.quantity);
                }
                return null;
            });
            this.selectedSlot = data.selectedSlot || 0;
            console.log('Inventory loaded from registry');
        }
    }

    /**
     * Debug: Print inventory contents
     */
    debugPrintInventory() {
        console.log('=== INVENTORY ===');
        console.log('Hotbar:');
        for (let i = 0; i < this.hotbarSize; i++) {
            const slot = this.slots[i];
            const selected = i === this.selectedSlot ? ' [SELECTED]' : '';
            if (slot) {
                console.log(`  [${i}] ${slot.definition.name} x${slot.quantity}${selected}`);
            } else {
                console.log(`  [${i}] Empty${selected}`);
            }
        }

        console.log('\nRest of inventory:');
        for (let i = this.hotbarSize; i < this.slots.length; i++) {
            const slot = this.slots[i];
            if (slot) {
                console.log(`  [${i}] ${slot.definition.name} x${slot.quantity}`);
            }
        }
        console.log('=================');
    }
}
