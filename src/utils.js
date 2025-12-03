// src/utils.js
import { state } from './state.js';

export function getTimeInTimezone(timezone) {
    try {
        const now = new Date();
        // Apply time travel offset
        if (state.globalOffset !== 0) {
            now.setTime(now.getTime() + (state.globalOffset * 3600000));
        }

        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        });

        const parts = formatter.formatToParts(now);
        const values = {};
        parts.forEach(part => { values[part.type] = part.value; });

        return new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`);
    } catch (error) {
        return new Date();
    }
}

export function getTimezoneOffset(timezone) {
    try {
        const now = new Date();
        if (state.globalOffset !== 0) {
            now.setTime(now.getTime() + (state.globalOffset * 3600000));
        }
        const formatter = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'short' });
        const parts = formatter.formatToParts(now);
        const timeZoneName = parts.find(part => part.type === 'timeZoneName');
        return timeZoneName ? timeZoneName.value : '';
    } catch (error) {
        return '';
    }
}

export function getTimeOfDay(hours) {
    if (hours >= 5 && hours < 12) {
        return { icon: 'sunrise', label: 'Morning', className: 'morning' };
    } else if (hours >= 12 && hours < 17) {
        return { icon: 'sun', label: 'Afternoon', className: 'afternoon' };
    } else if (hours >= 17 && hours < 20) {
        return { icon: 'sunset', label: 'Evening', className: 'evening' };
    } else {
        return { icon: 'moon', label: 'Night', className: 'night' };
    }
}

export function getIconSVG(iconName) {
    const icons = {
        sunrise: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>',
        sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
        sunset: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>',
        moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
    };
    return icons[iconName] || icons.sun;
}

export function createAnalogClockSVG(hours, minutes, seconds) {
    const secondAngle = (seconds * 6) - 90;
    const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
    const hourAngle = ((hours % 12) * 30 + minutes * 0.5) - 90;

    let svg = `<svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="75" fill="rgb(30, 41, 59)" stroke="rgb(71, 85, 105)" stroke-width="2"/>`;

    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 80 + Math.cos(angle) * 65; const y1 = 80 + Math.sin(angle) * 65;
        const x2 = 80 + Math.cos(angle) * 70; const y2 = 80 + Math.sin(angle) * 70;
        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgb(148, 163, 184)" stroke-width="2" stroke-linecap="round"/>`;
    }

    const hourX = 80 + Math.cos(hourAngle * Math.PI / 180) * 40;
    const hourY = 80 + Math.sin(hourAngle * Math.PI / 180) * 40;
    svg += `<line x1="80" y1="80" x2="${hourX}" y2="${hourY}" stroke="rgb(226, 232, 240)" stroke-width="6" stroke-linecap="round"/>`;

    const minuteX = 80 + Math.cos(minuteAngle * Math.PI / 180) * 55;
    const minuteY = 80 + Math.sin(minuteAngle * Math.PI / 180) * 55;
    svg += `<line x1="80" y1="80" x2="${minuteX}" y2="${minuteY}" stroke="rgb(96, 165, 250)" stroke-width="4" stroke-linecap="round"/>`;

    const secondLen = 70; const secondRad = secondAngle * Math.PI / 180;
    const secondX = 80 + Math.cos(secondRad) * secondLen;
    const secondY = 80 + Math.sin(secondRad) * secondLen;
    svg += `<line x1="80" y1="80" x2="${secondX}" y2="${secondY}" stroke="rgb(239, 68, 68)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="80" cy="80" r="5" fill="rgb(239, 68, 68)"/>
            </svg>`;
    return svg;
}