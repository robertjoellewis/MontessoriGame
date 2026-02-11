// Clock UI - Displays current game time
// Time advances: 1 real second = 1 game minute

export default class Clock {
    constructor(scene, startHour = 7, startMinute = 0, startDay = 0) {
        this.scene = scene;
        this.hour = startHour;
        this.minute = startMinute;
        this.dayOfWeek = startDay; // 0=Monday, 1=Tuesday, ... 6=Sunday

        // Day names
        this.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // Time advancement: 1 real second = 1 game minute
        this.msPerGameMinute = 1000; // 1000ms = 1 second
        this.accumulator = 0;

        // Create clock text (upper right corner)
        this.clockText = scene.add.text(1200, 30, this.getFormattedTime(), {
            fontSize: '28px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(1000);

        // Create date/day text (above clock)
        this.dateText = scene.add.text(1200, 5, this.getDayName(), {
            fontSize: '18px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            fontStyle: 'bold'
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(1000);
    }

    /**
     * Update clock - call this from scene's update() with delta time
     * @param {number} delta - Time elapsed since last frame in milliseconds
     */
    update(delta) {
        this.accumulator += delta;

        // Advance time when accumulator reaches threshold
        while (this.accumulator >= this.msPerGameMinute) {
            this.accumulator -= this.msPerGameMinute;
            this.advanceMinute();
        }

        // Update display
        this.clockText.setText(this.getFormattedTime());

        // Update color based on urgency (for morning rush to school)
        this.updateColorBasedOnTime();
    }

    advanceMinute() {
        this.minute++;
        if (this.minute >= 60) {
            this.minute = 0;
            this.hour++;
            if (this.hour >= 24) {
                this.hour = 0;
                // Advance to next day
                this.dayOfWeek++;
                if (this.dayOfWeek >= 7) {
                    this.dayOfWeek = 0; // Loop back to Monday
                }
                // Update day display
                this.dateText.setText(this.getDayName());
                console.log(`New day: ${this.getDayName()}`);
            }
        }
    }

    getFormattedTime() {
        const period = this.hour >= 12 ? 'PM' : 'AM';
        let displayHour = this.hour % 12;
        if (displayHour === 0) displayHour = 12;

        const minuteStr = this.minute.toString().padStart(2, '0');
        return `${displayHour}:${minuteStr} ${period}`;
    }

    updateColorBasedOnTime() {
        // Morning urgency: must get to school by 7:45 AM
        if (this.hour === 7) {
            if (this.minute < 40) {
                // Normal - white
                this.clockText.setFill('#ffffff');
            } else if (this.minute < 45) {
                // Getting late - yellow
                this.clockText.setFill('#ffff00');
            } else {
                // Late! - red
                this.clockText.setFill('#ff0000');
            }
        } else if (this.hour > 7 && this.hour < 12) {
            // Already late, keep red
            this.clockText.setFill('#ff0000');
        } else {
            // Other times - normal white
            this.clockText.setFill('#ffffff');
        }
    }

    /**
     * Get current day name
     * @returns {string}
     */
    getDayName() {
        return this.dayNames[this.dayOfWeek];
    }

    /**
     * Check if current day is a weekday (Monday-Friday)
     * @returns {boolean}
     */
    isWeekday() {
        return this.dayOfWeek >= 0 && this.dayOfWeek <= 4; // Monday=0 to Friday=4
    }

    /**
     * Check if current day is a weekend (Saturday-Sunday)
     * @returns {boolean}
     */
    isWeekend() {
        return this.dayOfWeek >= 5; // Saturday=5, Sunday=6
    }

    /**
     * Get current time in 24-hour format for comparisons
     * @returns {object} { hour, minute, dayOfWeek }
     */
    getTime() {
        return {
            hour: this.hour,
            minute: this.minute,
            dayOfWeek: this.dayOfWeek
        };
    }

    /**
     * Check if current time is past a specific time
     * @param {number} hour
     * @param {number} minute
     * @returns {boolean}
     */
    isPast(hour, minute) {
        if (this.hour > hour) return true;
        if (this.hour === hour && this.minute >= minute) return true;
        return false;
    }

    /**
     * Check if current time is between two times
     * @param {number} startHour
     * @param {number} startMinute
     * @param {number} endHour
     * @param {number} endMinute
     * @returns {boolean}
     */
    isBetween(startHour, startMinute, endHour, endMinute) {
        const currentMinutes = this.hour * 60 + this.minute;
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
        return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    }

    /**
     * Set time manually (useful for testing)
     * @param {number} hour
     * @param {number} minute
     * @param {number} dayOfWeek - Optional, 0=Monday
     */
    setTime(hour, minute, dayOfWeek = null) {
        this.hour = hour;
        this.minute = minute;
        if (dayOfWeek !== null) {
            this.dayOfWeek = dayOfWeek;
            this.dateText.setText(this.getDayName());
        }
        this.clockText.setText(this.getFormattedTime());
    }

    /**
     * Destroy the clock (cleanup)
     */
    destroy() {
        this.clockText.destroy();
        this.dateText.destroy();
    }
}
