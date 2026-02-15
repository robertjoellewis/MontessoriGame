// Experience and Leveling System
// Tracks Virginia's progress as a Montessori guide

export default class ExperienceSystem {
    constructor(scene) {
        this.scene = scene;

        // Load saved XP or start fresh
        this.currentXP = this.scene.registry.get('playerXP') || 0;
        this.currentLevel = this.scene.registry.get('playerLevel') || 1;

        // XP required for each level (increases each level)
        this.xpPerLevel = 100; // Base XP needed for level 2
        this.xpScaling = 1.5;  // Each level requires 50% more XP

        // Calculate XP needed for next level
        this.xpForNextLevel = this.calculateXPForLevel(this.currentLevel + 1);

        this.createUI();
    }

    calculateXPForLevel(level) {
        // Level 1 -> 2: 100 XP
        // Level 2 -> 3: 150 XP
        // Level 3 -> 4: 225 XP, etc.
        if (level <= 1) return 0;
        return Math.floor(this.xpPerLevel * Math.pow(this.xpScaling, level - 2));
    }

    createUI() {
        // Position below the energy meter - SMALLER SIZE
        const x = 20;
        const y = 110; // Below energy meter at y=20
        const width = 200;  // Reduced from 300
        const height = 45;  // Reduced from 60

        // Stardew-style wooden frame
        // Outer border (dark)
        this.frameOuter = this.scene.add.rectangle(x, y, width + 8, height + 8, 0x4A3020)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(998);

        // Middle border (medium brown)
        this.frameMid = this.scene.add.rectangle(x + 4, y + 4, width, height, 0x8B6F47)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(998);

        // Inner background (tan)
        this.frameInner = this.scene.add.rectangle(x + 8, y + 8, width - 8, height - 8, 0xF5DEB3)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(999);

        // Level text (left side) - SMALLER FONT
        this.levelText = this.scene.add.text(x + 15, y + 10, `LEVEL ${this.currentLevel}`, {
            fontSize: '14px',  // Reduced from 18px
            fill: '#2C1C0C',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setScrollFactor(0).setDepth(1000);

        // XP bar background (dark inset) - SMALLER BAR
        const barX = x + 15;
        const barY = y + 28;
        const barWidth = width - 30;
        const barHeight = 12;  // Reduced from 16

        this.xpBarBg = this.scene.add.rectangle(barX, barY, barWidth, barHeight, 0x4A3020)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1000);

        // XP bar (filled portion) - purple/gold color for XP
        const xpPercentage = this.currentXP / this.xpForNextLevel;
        const filledWidth = Math.max(0, barWidth * xpPercentage);

        this.xpBar = this.scene.add.rectangle(barX, barY, filledWidth, barHeight, 0x9C27B0)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1001);

        // XP text overlay (shows current/needed)
        this.xpText = this.scene.add.text(barX + barWidth / 2, barY + barHeight / 2,
            `${this.currentXP}/${this.xpForNextLevel} XP`, {
            fontSize: '14px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);
    }

    /**
     * Award XP to the player
     * @param {number} amount - Amount of XP to award
     * @param {string} reason - Why XP was awarded (for notification)
     */
    addXP(amount, reason = '') {
        this.currentXP += amount;

        // Save to registry
        this.scene.registry.set('playerXP', this.currentXP);

        // Show XP gain notification
        this.showXPGain(amount, reason);

        // Check for level up
        if (this.currentXP >= this.xpForNextLevel) {
            this.levelUp();
        } else {
            // Just update the bar
            this.updateUI();
        }
    }

    levelUp() {
        this.currentLevel++;
        this.currentXP = 0; // Reset XP for new level
        this.xpForNextLevel = this.calculateXPForLevel(this.currentLevel + 1);

        // Save to registry
        this.scene.registry.set('playerLevel', this.currentLevel);
        this.scene.registry.set('playerXP', this.currentXP);

        // Update UI
        this.updateUI();

        // Show celebratory level up notification
        this.showLevelUp();
    }

    updateUI() {
        // Update level text
        this.levelText.setText(`LEVEL ${this.currentLevel}`);

        // Update XP bar width
        const barWidth = 260; // width - 40
        const xpPercentage = this.currentXP / this.xpForNextLevel;
        const filledWidth = Math.max(0, barWidth * xpPercentage);

        // Animate bar growth
        this.scene.tweens.add({
            targets: this.xpBar,
            width: filledWidth,
            duration: 500,
            ease: 'Power2'
        });

        // Update text
        this.xpText.setText(`${this.currentXP}/${this.xpForNextLevel} XP`);
    }

    showXPGain(amount, reason) {
        // Create floating "+XP" notification
        const notifX = 170; // Center of XP bar
        const notifY = 130;

        const xpGainText = this.scene.add.text(notifX, notifY, `+${amount} XP`, {
            fontSize: '24px',
            fill: '#9C27B0',
            fontStyle: 'bold',
            fontFamily: 'monospace',
            stroke: '#FFFFFF',
            strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1500);

        // Reason text below (if provided)
        let reasonText;
        if (reason) {
            reasonText = this.scene.add.text(notifX, notifY + 30, reason, {
                fontSize: '16px',
                fill: '#2C1C0C',
                fontFamily: 'monospace'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(1500);
        }

        // Float up and fade out
        this.scene.tweens.add({
            targets: [xpGainText, reasonText].filter(t => t),
            y: '-=60',
            alpha: 0,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                xpGainText.destroy();
                if (reasonText) reasonText.destroy();
            }
        });
    }

    showLevelUp() {
        // Disable controls during celebration
        if (this.scene.controlsEnabled !== undefined) {
            this.scene.controlsEnabled = false;
        }

        // Create big celebration overlay
        const overlay = this.scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7)
            .setScrollFactor(0)
            .setDepth(2000)
            .setAlpha(0);

        // Fade in overlay
        this.scene.tweens.add({
            targets: overlay,
            alpha: 0.7,
            duration: 500
        });

        // LEVEL UP text
        const levelUpText = this.scene.add.text(640, 300, '✨ LEVEL UP! ✨', {
            fontSize: '64px',
            fill: '#FFD700',
            fontStyle: 'bold',
            fontFamily: 'monospace',
            stroke: '#2C1C0C',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2001).setScale(0);

        // Scale up level up text
        this.scene.tweens.add({
            targets: levelUpText,
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });

        // New level number
        const newLevelText = this.scene.add.text(640, 400, `You are now Level ${this.currentLevel}!`, {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2001).setAlpha(0);

        this.scene.tweens.add({
            targets: newLevelText,
            alpha: 1,
            duration: 500,
            delay: 500
        });

        // Clean up after 3 seconds
        this.scene.time.delayedCall(3000, () => {
            this.scene.tweens.add({
                targets: [overlay, levelUpText, newLevelText],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    overlay.destroy();
                    levelUpText.destroy();
                    newLevelText.destroy();

                    // Re-enable controls
                    if (this.scene.controlsEnabled !== undefined) {
                        this.scene.controlsEnabled = true;
                    }
                }
            });
        });
    }

    /**
     * Get current level
     */
    getLevel() {
        return this.currentLevel;
    }

    /**
     * Get current XP
     */
    getXP() {
        return this.currentXP;
    }

    /**
     * Destroy the XP system (cleanup)
     */
    destroy() {
        this.frameOuter.destroy();
        this.frameMid.destroy();
        this.frameInner.destroy();
        this.levelText.destroy();
        this.xpBarBg.destroy();
        this.xpBar.destroy();
        this.xpText.destroy();
    }
}
