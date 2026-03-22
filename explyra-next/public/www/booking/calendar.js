// calendar.js - Availability and Slot Generation Logic

/**
 * Generates time slots for a specific date
 * @param {string} startTime - 'HH:mm'
 * @param {string} endTime - 'HH:mm'
 * @param {number} duration - minutes
 * @param {Array} existingBookings - Array of scheduledAt strings for that day
 */
export const generateSlots = (startTime, endTime, duration, existingBookings = []) => {
    const slots = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    const bookedTimes = existingBookings.map(b => {
        const d = new Date(b);
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    });

    while (current < end) {
        const timeStr = `${String(current.getHours()).padStart(2, '0')}:${String(current.getMinutes()).padStart(2, '0')}`;

        if (!bookedTimes.includes(timeStr)) {
            slots.push(timeStr);
        }

        current.setMinutes(current.getMinutes() + duration);
    }

    return slots;
};

/**
 * Returns the next 14 available dates based on working days
 * @param {Array} workingDays - ['monday', 'tuesday', ...]
 */
export const getAvailableDates = (workingDays, daysToLookAhead = 14) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < daysToLookAhead; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

        if (workingDays.includes(dayName)) {
            dates.push(d.toISOString().split('T')[0]);
        }
    }

    return dates;
};
