import Phaser from 'phaser';
import { childrenData } from '../data/children.js';
import { generateChildSprite } from '../utils/spriteGenerator.js';

export default class ObservationScene extends Phaser.Scene {
    constructor() {
        super('ObservationScene');
        this.studentList = [];
        this.observationPanel = null;
    }

    create() {
        // Title
        this.add.text(400, 30, 'Observation Mechanic Prototype', {
            fontSize: '24px',
            color: '#333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(400, 60, 'Hover over children to observe them', {
            fontSize: '16px',
            color: '#666'
        }).setOrigin(0.5);

        // Create observation info panel (hidden by default)
        this.createObservationPanel();

        // Spawn the 12 children in classroom positions
        this.spawnChildren();
    }

    createObservationPanel() {
        const panelX = 600;
        const panelY = 150;
        const panelWidth = 180;
        const panelHeight = 200;

        // Background
        this.observationBg = this.add.rectangle(
            panelX, panelY,
            panelWidth, panelHeight,
            0xffffff, 0.95
        );
        this.observationBg.setStrokeStyle(2, 0x333333);
        this.observationBg.setVisible(false);

        // Child name
        this.observationName = this.add.text(panelX, panelY - 80, '', {
            fontSize: '18px',
            color: '#333',
            fontStyle: 'bold',
            wordWrap: { width: panelWidth - 20 }
        }).setOrigin(0.5, 0);
        this.observationName.setVisible(false);

        // Child age
        this.observationAge = this.add.text(panelX, panelY - 60, '', {
            fontSize: '14px',
            color: '#666',
            wordWrap: { width: panelWidth - 20 }
        }).setOrigin(0.5, 0);
        this.observationAge.setVisible(false);

        // Temperament
        this.observationTemp = this.add.text(panelX, panelY - 35, '', {
            fontSize: '13px',
            color: '#444',
            wordWrap: { width: panelWidth - 20 }
        }).setOrigin(0.5, 0);
        this.observationTemp.setVisible(false);

        // Sensitive periods
        this.observationPeriods = this.add.text(panelX, panelY - 5, '', {
            fontSize: '12px',
            color: '#2a5599',
            wordWrap: { width: panelWidth - 20 }
        }).setOrigin(0.5, 0);
        this.observationPeriods.setVisible(false);

        // Current mood
        this.observationMood = this.add.text(panelX, panelY + 50, '', {
            fontSize: '12px',
            color: '#c2185b',
            wordWrap: { width: panelWidth - 20 }
        }).setOrigin(0.5, 0);
        this.observationMood.setVisible(false);

        // Interests
        this.observationInterests = this.add.text(panelX, panelY + 75, '', {
            fontSize: '12px',
            color: '#558b2f',
            wordWrap: { width: panelWidth - 20 }
        }).setOrigin(0.5, 0);
        this.observationInterests.setVisible(false);
    }

    spawnChildren() {
        // Grid layout for children (3 rows x 4 cols)
        const startX = 100;
        const startY = 150;
        const spacingX = 120;
        const spacingY = 120;

        childrenData.forEach((childData, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const x = startX + (col * spacingX);
            const y = startY + (row * spacingY);

            // Generate pixel art sprite for this child
            const spriteKey = generateChildSprite(this, childData);

            // Create child sprite using the generated texture
            const child = this.add.sprite(x, y, spriteKey);
            child.setScale(1.0); // Now they're properly sized

            // Make interactive
            child.setInteractive({ useHandCursor: true });

            // Store child data
            child.childData = childData;

            // Label with name
            const nameLabel = this.add.text(x, y + 35, childData.name, {
                fontSize: '11px',
                color: '#333',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            // Hover events
            child.on('pointerover', () => {
                this.showObservation(child.childData);
                child.setScale(1.3); // Zoom in on hover
            });

            child.on('pointerout', () => {
                this.hideObservation();
                child.setScale(1.0); // Back to normal size
            });

            this.studentList.push({ sprite: child, label: nameLabel, data: childData });
        });
    }

    showObservation(childData) {
        // Show panel
        this.observationBg.setVisible(true);
        this.observationName.setVisible(true);
        this.observationAge.setVisible(true);
        this.observationTemp.setVisible(true);
        this.observationPeriods.setVisible(true);
        this.observationMood.setVisible(true);
        this.observationInterests.setVisible(true);

        // Update content
        this.observationName.setText(childData.name);
        this.observationAge.setText(`Age: ${childData.ageMonths} months`);
        this.observationTemp.setText(`Temperament: ${childData.temperament}`);
        this.observationPeriods.setText(`Sensitive to:\n${childData.sensitivePeriods.join(', ')}`);
        this.observationMood.setText(`Mood: ${childData.currentMood}`);
        this.observationInterests.setText(`Interested in:\n${childData.currentInterest}`);
    }

    hideObservation() {
        this.observationBg.setVisible(false);
        this.observationName.setVisible(false);
        this.observationAge.setVisible(false);
        this.observationTemp.setVisible(false);
        this.observationPeriods.setVisible(false);
        this.observationMood.setVisible(false);
        this.observationInterests.setVisible(false);
    }
}
