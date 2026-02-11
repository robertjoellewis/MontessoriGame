// Energy Meter UI - Displays player's current energy level
// Energy depletes over time and with activities, restored by coffee/food

export default class EnergyMeter {
    constructor(scene, maxEnergy = 100) {
        this.scene = scene;
        this.maxEnergy = maxEnergy;
        this.currentEnergy = maxEnergy; // Start at full energy

        // Energy depletion rates
        this.passiveDepletionRate = 0; // Disabled - only drain on activities
        this.activityDepletionRate = 5; // Energy lost per lesson/activity

        // Create UI elements (upper left corner)
        this.createUI();
    }

    createUI() {
        // Label first
        this.label = this.scene.add.text(20, 35, '⚡ Energy:', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0, 0).setScrollFactor(0).setDepth(1002);

        // Bar positioned after label with proper spacing
        const barX = 145;  // Starts 145px from left edge

        // Background bar (gray)
        this.bgBar = this.scene.add.rectangle(barX, 30, 250, 30, 0x333333)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1000);

        // Energy bar (green, shrinks based on current energy)
        this.energyBar = this.scene.add.rectangle(barX + 5, 35, 240, 20, 0x4caf50)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1001);

        // Border
        this.border = this.scene.add.rectangle(barX, 30, 250, 30)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1002)
            .setFillStyle();

        // Energy text (shows number) - positioned after bar
        this.energyText = this.scene.add.text(barX + 260, 35, `${Math.floor(this.currentEnergy)}`, {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0, 0).setScrollFactor(0).setDepth(1002);

        // Update display
        this.updateDisplay();
    }

    /**
     * Update energy meter - call this from scene's update() with delta time
     * @param {number} delta - Time elapsed since last frame in milliseconds
     */
    update(delta) {
        // Passive energy depletion over time
        // 0.5 energy per minute = 0.5 / 60 per second = 0.00833 per second
        const depletionPerMs = this.passiveDepletionRate / 60 / 1000;
        this.currentEnergy -= depletionPerMs * delta;

        // Clamp to 0-max range
        this.currentEnergy = Math.max(0, Math.min(this.currentEnergy, this.maxEnergy));

        // Update display
        this.updateDisplay();

        // Check for low energy warning
        if (this.currentEnergy < 20 && this.currentEnergy > 0) {
            this.showLowEnergyWarning();
        }
    }

    updateDisplay() {
        // Update bar width (proportional to current energy)
        const barWidth = (this.currentEnergy / this.maxEnergy) * 240;
        this.energyBar.width = barWidth;

        // Update color based on energy level
        if (this.currentEnergy > 60) {
            this.energyBar.setFillStyle(0x4caf50); // Green
        } else if (this.currentEnergy > 30) {
            this.energyBar.setFillStyle(0xffc107); // Yellow/orange
        } else {
            this.energyBar.setFillStyle(0xf44336); // Red
        }

        // Update text
        this.energyText.setText(`${Math.floor(this.currentEnergy)}`);
    }

    showLowEnergyWarning() {
        // Flash the bar (only create warning once)
        if (!this.warningShown) {
            this.warningShown = true;

            const warningText = this.scene.add.text(200, 70, '⚠️ Low Energy!', {
                fontSize: '18px',
                fill: '#ff0000',
                fontStyle: 'bold',
                backgroundColor: '#000000',
                padding: { x: 8, y: 4 }
            }).setOrigin(0, 0).setScrollFactor(0).setDepth(1003);

            // Fade out after 2 seconds
            this.scene.time.delayedCall(2000, () => {
                this.scene.tweens.add({
                    targets: warningText,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        warningText.destroy();
                        this.warningShown = false;
                    }
                });
            });
        }
    }

    /**
     * Add energy (from coffee, food, rest)
     * @param {number} amount
     */
    addEnergy(amount) {
        this.currentEnergy += amount;
        this.currentEnergy = Math.min(this.currentEnergy, this.maxEnergy);
        this.updateDisplay();

        // Show +Energy popup
        this.showEnergyGain(amount);
    }

    /**
     * Remove energy (from activities, lessons)
     * @param {number} amount
     */
    removeEnergy(amount) {
        this.currentEnergy -= amount;
        this.currentEnergy = Math.max(0, this.currentEnergy);
        this.updateDisplay();
    }

    showEnergyGain(amount) {
        const gainText = this.scene.add.text(240, 35, `+${amount}`, {
            fontSize: '24px',
            fill: '#4caf50',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1004);

        // Float up and fade
        this.scene.tweens.add({
            targets: gainText,
            y: 10,
            alpha: 0,
            duration: 1000,
            onComplete: () => gainText.destroy()
        });
    }

    /**
     * Get current energy level
     * @returns {number}
     */
    getEnergy() {
        return this.currentEnergy;
    }

    /**
     * Check if player has enough energy for an action
     * @param {number} cost
     * @returns {boolean}
     */
    hasEnergy(cost) {
        return this.currentEnergy >= cost;
    }

    /**
     * Reset energy to full
     */
    reset() {
        this.currentEnergy = this.maxEnergy;
        this.updateDisplay();
    }

    /**
     * Destroy the energy meter (cleanup)
     */
    destroy() {
        this.bgBar.destroy();
        this.energyBar.destroy();
        this.border.destroy();
        this.label.destroy();
        this.energyText.destroy();
    }
}
