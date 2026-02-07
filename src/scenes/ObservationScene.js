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
        this.add.text(640, 40, 'Observation Mechanic Prototype - Desktop Version', {
            fontSize: '32px',
            color: '#333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(640, 85, 'Hover over children to observe them', {
            fontSize: '20px',
            color: '#666'
        }).setOrigin(0.5);

        // Create observation info panel (hidden by default)
        this.createObservationPanel();

        // Spawn the 12 children in classroom positions
        this.spawnChildren();
    }

    createObservationPanel() {
        const panelX = 1050;
        const panelY = 300;
        const panelWidth = 400;
        const panelHeight = 350;

        // Background
        this.observationBg = this.add.rectangle(
            panelX, panelY,
            panelWidth, panelHeight,
            0xffffff, 0.95
        );
        this.observationBg.setStrokeStyle(2, 0x333333);
        this.observationBg.setVisible(false);

        // Child name
        this.observationName = this.add.text(panelX, panelY - 150, '', {
            fontSize: '28px',
            color: '#333',
            fontStyle: 'bold',
            wordWrap: { width: panelWidth - 40 }
        }).setOrigin(0.5, 0);
        this.observationName.setVisible(false);

        // Child age
        this.observationAge = this.add.text(panelX, panelY - 110, '', {
            fontSize: '18px',
            color: '#666',
            wordWrap: { width: panelWidth - 40 }
        }).setOrigin(0.5, 0);
        this.observationAge.setVisible(false);

        // Temperament
        this.observationTemp = this.add.text(panelX, panelY - 75, '', {
            fontSize: '18px',
            color: '#444',
            wordWrap: { width: panelWidth - 40 }
        }).setOrigin(0.5, 0);
        this.observationTemp.setVisible(false);

        // Sensitive periods
        this.observationPeriods = this.add.text(panelX, panelY - 30, '', {
            fontSize: '16px',
            color: '#2a5599',
            wordWrap: { width: panelWidth - 40 },
            lineSpacing: 8
        }).setOrigin(0.5, 0);
        this.observationPeriods.setVisible(false);

        // Current mood
        this.observationMood = this.add.text(panelX, panelY + 80, '', {
            fontSize: '16px',
            color: '#c2185b',
            wordWrap: { width: panelWidth - 40 },
            lineSpacing: 6
        }).setOrigin(0.5, 0);
        this.observationMood.setVisible(false);

        // Interests
        this.observationInterests = this.add.text(panelX, panelY + 130, '', {
            fontSize: '16px',
            color: '#558b2f',
            wordWrap: { width: panelWidth - 40 },
            lineSpacing: 6
        }).setOrigin(0.5, 0);
        this.observationInterests.setVisible(false);
    }

    spawnChildren() {
        // Grid layout for children (3 rows x 4 cols) - more space on desktop
        const startX = 150;
        const startY = 180;
        const spacingX = 150;
        const spacingY = 150;

        childrenData.forEach((childData, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const x = startX + (col * spacingX);
            const y = startY + (row * spacingY);

            // Generate pixel art sprite for this child
            const spriteKey = generateChildSprite(this, childData);

            // Create child sprite using the generated texture
            const child = this.add.sprite(x, y, spriteKey);
            child.setScale(1.5); // Bigger for desktop visibility

            // Make interactive
            child.setInteractive({ useHandCursor: true });

            // Store child data
            child.childData = childData;

            // Label with name
            const nameLabel = this.add.text(x, y + 45, childData.name, {
                fontSize: '16px',
                color: '#333',
                fontStyle: 'bold',
                backgroundColor: '#ffffff',
                padding: { x: 4, y: 2 }
            }).setOrigin(0.5);

            // Hover events
            child.on('pointerover', () => {
                this.showObservation(child.childData);
                child.setScale(1.8); // Zoom in on hover
            });

            child.on('pointerout', () => {
                this.hideObservation();
                child.setScale(1.5); // Back to normal size
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
