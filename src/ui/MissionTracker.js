// Mission Tracker UI - Displays current missions/objectives
// Shows an exclamation point icon that can be clicked to view missions

export default class MissionTracker {
    constructor(scene) {
        this.scene = scene;
        this.missions = [];
        this.popupVisible = false;

        // Position near the clock (upper right area, below clock)
        const iconX = 1200;
        const iconY = 80;
        const iconSize = 40;

        // Create Stardew-style frame for the icon
        // Outer border (dark brown)
        this.iconFrameOuter = scene.add.rectangle(iconX, iconY, iconSize + 8, iconSize + 8, 0x4A3020)
            .setOrigin(1, 0)
            .setScrollFactor(0)
            .setDepth(999);

        // Middle border (medium brown)
        this.iconFrameMid = scene.add.rectangle(iconX, iconY, iconSize + 4, iconSize + 4, 0x8B6F47)
            .setOrigin(1, 0)
            .setScrollFactor(0)
            .setDepth(999);

        // Inner background (tan)
        this.iconFrameInner = scene.add.rectangle(iconX, iconY, iconSize, iconSize, 0xF5DEB3)
            .setOrigin(1, 0)
            .setScrollFactor(0)
            .setDepth(999)
            .setInteractive({ useHandCursor: true });

        // Exclamation point icon
        this.iconText = scene.add.text(iconX - iconSize / 2, iconY + iconSize / 2, '!', {
            fontSize: '32px',
            fill: '#ff0000',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1000);

        // Mission count badge (small circle)
        this.badge = scene.add.circle(iconX - 5, iconY + 5, 10, 0xff0000)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(1001);

        this.badgeText = scene.add.text(iconX - 5, iconY + 5, '0', {
            fontSize: '14px',
            fill: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);

        // Click handler - toggle popup
        this.iconFrameInner.on('pointerdown', () => {
            this.togglePopup();
        });

        // Hover effect
        this.iconFrameInner.on('pointerover', () => {
            this.iconFrameInner.setFillStyle(0xFFFFCC); // Lighter tan on hover
        });

        this.iconFrameInner.on('pointerout', () => {
            this.iconFrameInner.setFillStyle(0xF5DEB3); // Back to normal tan
        });

        // Create popup (initially hidden)
        this.createPopup();
    }

    createPopup() {
        // Popup positioned below the icon
        const popupX = 1050;
        const popupY = 130;
        const popupWidth = 350;
        const popupHeight = 200;

        // Popup container (for easy show/hide)
        this.popup = this.scene.add.container(0, 0);
        this.popup.setScrollFactor(0);
        this.popup.setDepth(1100);
        this.popup.setVisible(false);

        // Background frame (Stardew style)
        const bgOuter = this.scene.add.rectangle(popupX, popupY, popupWidth, popupHeight, 0x4A3020)
            .setOrigin(1, 0);
        const bgMid = this.scene.add.rectangle(popupX, popupY, popupWidth - 6, popupHeight - 6, 0x8B6F47)
            .setOrigin(1, 0);
        const bgInner = this.scene.add.rectangle(popupX, popupY, popupWidth - 12, popupHeight - 12, 0xF5DEB3)
            .setOrigin(1, 0);

        // Title
        this.popupTitle = this.scene.add.text(popupX - popupWidth / 2, popupY + 15, 'CURRENT MISSIONS', {
            fontSize: '20px',
            fill: '#2C1C0C',
            fontStyle: 'bold',
            fontFamily: 'monospace'
        }).setOrigin(0.5, 0);

        // Mission list text
        this.popupMissionsText = this.scene.add.text(popupX - popupWidth + 25, popupY + 50, '', {
            fontSize: '16px',
            fill: '#2C1C0C',
            fontFamily: 'monospace',
            lineSpacing: 8,
            wordWrap: { width: popupWidth - 40 }
        });

        // Add all to container
        this.popup.add([bgOuter, bgMid, bgInner, this.popupTitle, this.popupMissionsText]);
    }

    togglePopup() {
        this.popupVisible = !this.popupVisible;
        this.popup.setVisible(this.popupVisible);

        if (this.popupVisible) {
            this.updatePopupContent();
        }
    }

    updatePopupContent() {
        if (this.missions.length === 0) {
            this.popupMissionsText.setText('No active missions.');
        } else {
            const missionList = this.missions.map((mission, index) => {
                const checkbox = mission.completed ? '☑' : '☐';
                return `${checkbox} ${mission.text}`;
            }).join('\n\n');
            this.popupMissionsText.setText(missionList);
        }
    }

    /**
     * Add a new mission
     * @param {string} text - Mission description
     * @param {string} id - Unique mission identifier
     */
    addMission(text, id) {
        // Check if mission already exists
        if (this.missions.find(m => m.id === id)) {
            return;
        }

        this.missions.push({
            id: id,
            text: text,
            completed: false
        });

        this.updateBadge();
    }

    /**
     * Mark a mission as completed
     * @param {string} id - Mission identifier
     */
    completeMission(id) {
        const mission = this.missions.find(m => m.id === id);
        if (mission) {
            mission.completed = true;
            this.updateBadge();
            this.updatePopupContent();
        }
    }

    /**
     * Remove a mission
     * @param {string} id - Mission identifier
     */
    removeMission(id) {
        this.missions = this.missions.filter(m => m.id !== id);
        this.updateBadge();
        this.updatePopupContent();
    }

    /**
     * Update the mission count badge
     */
    updateBadge() {
        const activeMissions = this.missions.filter(m => !m.completed).length;
        this.badgeText.setText(activeMissions.toString());

        // Hide badge if no active missions
        if (activeMissions === 0) {
            this.badge.setVisible(false);
            this.badgeText.setVisible(false);
        } else {
            this.badge.setVisible(true);
            this.badgeText.setVisible(true);
        }
    }

    /**
     * Get all missions
     * @returns {Array} List of missions
     */
    getMissions() {
        return this.missions;
    }

    /**
     * Destroy the mission tracker (cleanup)
     */
    destroy() {
        this.iconFrameOuter.destroy();
        this.iconFrameMid.destroy();
        this.iconFrameInner.destroy();
        this.iconText.destroy();
        this.badge.destroy();
        this.badgeText.destroy();
        this.popup.destroy();
    }
}
