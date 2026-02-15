// Item Definitions for Montessori Game Inventory System
// Stardew Valley-inspired item system with types, uses, and crafting support

/**
 * Item Type Categories
 * - FOOD: Consumables that restore energy
 * - MATERIAL: Raw materials for crafting
 * - TOOL: Usable tools with special functions
 * - CONSUMABLE: Other consumables (not food)
 * - QUEST: Quest-related items
 */
export const ItemType = {
    FOOD: 'food',
    MATERIAL: 'material',
    TOOL: 'tool',
    CONSUMABLE: 'consumable',
    QUEST: 'quest'
};

/**
 * Base Item Class
 * All items inherit from this structure
 */
export class ItemDefinition {
    constructor({
        id,
        name,
        type,
        description,
        iconKey,
        stackable = true,
        maxStack = 999,
        useFunction = null,
        energyRestore = 0,
        sellPrice = 0,
        craftable = false,
        craftingRecipe = null
    }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.iconKey = iconKey; // Phaser texture key for sprite
        this.stackable = stackable;
        this.maxStack = maxStack;
        this.useFunction = useFunction;
        this.energyRestore = energyRestore;
        this.sellPrice = sellPrice;
        this.craftable = craftable;
        this.craftingRecipe = craftingRecipe; // { materials: [{itemId, quantity}], result: {itemId, quantity} }
    }
}

/**
 * All available items in the game
 * These are the definitions - actual item instances will be created by InventorySystem
 */
export const ITEMS = {
    // === FOOD ITEMS ===
    COFFEE: new ItemDefinition({
        id: 'coffee',
        name: 'Coffee',
        type: ItemType.FOOD,
        description: 'A hot cup of morning coffee. Restores 20 energy.',
        iconKey: 'item_coffee',
        stackable: true,
        maxStack: 10,
        energyRestore: 20,
        sellPrice: 0,
        useFunction: (scene, inventorySystem) => {
            // Restore energy when consumed
            if (scene.energyMeter) {
                scene.energyMeter.addEnergy(20);
                return {
                    success: true,
                    message: 'You feel more awake! +20 Energy'
                };
            }
            return { success: false, message: 'Cannot use right now' };
        }
    }),

    APPLE: new ItemDefinition({
        id: 'apple',
        name: 'Apple',
        type: ItemType.FOOD,
        description: 'A crisp, fresh apple. Restores 10 energy.',
        iconKey: 'item_apple',
        stackable: true,
        maxStack: 50,
        energyRestore: 10,
        sellPrice: 5,
        useFunction: (scene, inventorySystem) => {
            if (scene.energyMeter) {
                scene.energyMeter.addEnergy(10);
                return {
                    success: true,
                    message: 'Delicious! +10 Energy'
                };
            }
            return { success: false, message: 'Cannot use right now' };
        }
    }),

    SANDWICH: new ItemDefinition({
        id: 'sandwich',
        name: 'Sandwich',
        type: ItemType.FOOD,
        description: 'A hearty lunch sandwich. Restores 30 energy.',
        iconKey: 'item_sandwich',
        stackable: true,
        maxStack: 20,
        energyRestore: 30,
        sellPrice: 15,
        useFunction: (scene, inventorySystem) => {
            if (scene.energyMeter) {
                scene.energyMeter.addEnergy(30);
                return {
                    success: true,
                    message: 'Very filling! +30 Energy'
                };
            }
            return { success: false, message: 'Cannot use right now' };
        }
    }),

    COOKIE: new ItemDefinition({
        id: 'cookie',
        name: 'Cookie',
        type: ItemType.FOOD,
        description: 'A sweet treat. Restores 5 energy.',
        iconKey: 'item_cookie',
        stackable: true,
        maxStack: 50,
        energyRestore: 5,
        sellPrice: 3,
        useFunction: (scene, inventorySystem) => {
            if (scene.energyMeter) {
                scene.energyMeter.addEnergy(5);
                return {
                    success: true,
                    message: 'Sweet! +5 Energy'
                };
            }
            return { success: false, message: 'Cannot use right now' };
        }
    }),

    GLUTEN_FREE_BAR: new ItemDefinition({
        id: 'gluten_free_bar',
        name: 'Gluten-Free Energy Bar',
        type: ItemType.FOOD,
        description: 'A healthy snack from Robert',
        iconKey: 'item_gluten_free_bar',
        stackable: true,
        maxStack: 5,
        energyRestore: 20,
        sellPrice: 10,
        useFunction: (scene, inventorySystem) => {
            if (scene.energyMeter) {
                scene.energyMeter.addEnergy(20);
                return {
                    success: true,
                    message: 'Healthy and delicious! +20 Energy'
                };
            }
            return { success: false, message: 'Cannot use right now' };
        }
    }),

    // === MATERIAL ITEMS ===
    WOOD: new ItemDefinition({
        id: 'wood',
        name: 'Wood',
        type: ItemType.MATERIAL,
        description: 'Basic building material. Used for crafting.',
        iconKey: 'item_wood',
        stackable: true,
        maxStack: 999,
        sellPrice: 2,
        craftable: false
    }),

    STONE: new ItemDefinition({
        id: 'stone',
        name: 'Stone',
        type: ItemType.MATERIAL,
        description: 'A piece of stone. Used for crafting.',
        iconKey: 'item_stone',
        stackable: true,
        maxStack: 999,
        sellPrice: 2,
        craftable: false
    }),

    FABRIC: new ItemDefinition({
        id: 'fabric',
        name: 'Fabric',
        type: ItemType.MATERIAL,
        description: 'Soft fabric material. Used for crafting.',
        iconKey: 'item_fabric',
        stackable: true,
        maxStack: 999,
        sellPrice: 5,
        craftable: false
    }),

    PAINT: new ItemDefinition({
        id: 'paint',
        name: 'Paint',
        type: ItemType.MATERIAL,
        description: 'Colorful paint. Used for crafting.',
        iconKey: 'item_paint',
        stackable: true,
        maxStack: 50,
        sellPrice: 8,
        craftable: false
    }),

    // === TOOL ITEMS ===
    STORYBOOK: new ItemDefinition({
        id: 'storybook',
        name: 'Storybook',
        type: ItemType.TOOL,
        description: 'A children\'s storybook. Use to read to students.',
        iconKey: 'item_storybook',
        stackable: false,
        maxStack: 1,
        sellPrice: 25,
        useFunction: (scene, inventorySystem) => {
            return {
                success: true,
                message: 'You read a story to nearby children.'
            };
        }
    }),

    MEASURING_TAPE: new ItemDefinition({
        id: 'measuring_tape',
        name: 'Measuring Tape',
        type: ItemType.TOOL,
        description: 'For measuring classroom materials and furniture.',
        iconKey: 'item_measuring_tape',
        stackable: false,
        maxStack: 1,
        sellPrice: 10
    }),

    NOTEBOOK: new ItemDefinition({
        id: 'notebook',
        name: 'Observation Notebook',
        type: ItemType.TOOL,
        description: 'Record observations about children\'s development.',
        iconKey: 'item_notebook',
        stackable: false,
        maxStack: 1,
        sellPrice: 15,
        useFunction: (scene, inventorySystem) => {
            return {
                success: true,
                message: 'You jot down some observations.'
            };
        }
    }),

    // === CONSUMABLE ITEMS ===
    BANDAGE: new ItemDefinition({
        id: 'bandage',
        name: 'Bandage',
        type: ItemType.CONSUMABLE,
        description: 'First aid supplies. Use to help hurt children.',
        iconKey: 'item_bandage',
        stackable: true,
        maxStack: 20,
        sellPrice: 5,
        useFunction: (scene, inventorySystem) => {
            return {
                success: true,
                message: 'Applied bandage. All better!'
            };
        }
    }),

    TISSUE_BOX: new ItemDefinition({
        id: 'tissue_box',
        name: 'Tissue Box',
        type: ItemType.CONSUMABLE,
        description: 'Soft tissues. Use to help children with runny noses.',
        iconKey: 'item_tissue',
        stackable: true,
        maxStack: 10,
        sellPrice: 3,
        useFunction: (scene, inventorySystem) => {
            return {
                success: true,
                message: 'Helped child wipe their nose.'
            };
        }
    }),

    // === QUEST ITEMS ===
    PARENT_NOTE: new ItemDefinition({
        id: 'parent_note',
        name: 'Parent Note',
        type: ItemType.QUEST,
        description: 'An important note from a parent.',
        iconKey: 'item_note',
        stackable: true,
        maxStack: 50,
        sellPrice: 0
    }),

    FIELD_TRIP_PERMISSION: new ItemDefinition({
        id: 'field_trip_permission',
        name: 'Field Trip Permission Slip',
        type: ItemType.QUEST,
        description: 'Signed permission slip for the field trip.',
        iconKey: 'item_permission',
        stackable: true,
        maxStack: 50,
        sellPrice: 0
    })
};

/**
 * Helper function to get item definition by ID
 * @param {string} itemId - The item's unique ID
 * @returns {ItemDefinition|null}
 */
export function getItemDefinition(itemId) {
    const itemKey = Object.keys(ITEMS).find(key => ITEMS[key].id === itemId);
    return itemKey ? ITEMS[itemKey] : null;
}

/**
 * Helper function to get all items of a specific type
 * @param {string} type - Item type from ItemType enum
 * @returns {ItemDefinition[]}
 */
export function getItemsByType(type) {
    return Object.values(ITEMS).filter(item => item.type === type);
}

/**
 * Example crafting recipes (for future expansion)
 * Format: { materials: [{itemId, quantity}], result: {itemId, quantity} }
 */
export const CRAFTING_RECIPES = {
    SIMPLE_SHELF: {
        id: 'simple_shelf',
        name: 'Simple Shelf',
        materials: [
            { itemId: 'wood', quantity: 10 },
            { itemId: 'stone', quantity: 2 }
        ],
        result: { itemId: 'simple_shelf', quantity: 1 }
    },

    CLASSROOM_RUG: {
        id: 'classroom_rug',
        name: 'Classroom Rug',
        materials: [
            { itemId: 'fabric', quantity: 15 },
            { itemId: 'wood', quantity: 3 }
        ],
        result: { itemId: 'classroom_rug', quantity: 1 }
    },

    PAINTED_SIGN: {
        id: 'painted_sign',
        name: 'Painted Sign',
        materials: [
            { itemId: 'wood', quantity: 5 },
            { itemId: 'paint', quantity: 2 }
        ],
        result: { itemId: 'painted_sign', quantity: 1 }
    }
};
