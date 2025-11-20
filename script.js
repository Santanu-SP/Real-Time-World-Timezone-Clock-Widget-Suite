// Popular timezones data
const popularTimezones = [
    { value: 'America/New_York', label: 'New York (EST)' },
    { value: 'America/Chicago', label: 'Chicago (CST)' },
    { value: 'America/Denver', label: 'Denver (MST)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
    { value: 'America/Anchorage', label: 'Anchorage (AKST)' },
    { value: 'Pacific/Honolulu', label: 'Honolulu (HST)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET)' },
    { value: 'Europe/Rome', label: 'Rome (CET)' },
    { value: 'Europe/Madrid', label: 'Madrid (CET)' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Seoul', label: 'Seoul (KST)' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
    { value: 'Australia/Melbourne', label: 'Melbourne (AEDT)' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZDT)' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)' },
    { value: 'America/Mexico_City', label: 'Mexico City (CST)' },
    { value: 'Africa/Cairo', label: 'Cairo (EET)' },
    { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)' },
];

// Default timezones
const defaultTimezones = [
    { id: '1', timezone: 'America/New_York', label: 'New York' },
    { id: '2', timezone: 'Europe/London', label: 'London' },
    { id: '3', timezone: 'Asia/Tokyo', label: 'Tokyo' },
    { id: '4', timezone: 'Australia/Sydney', label: 'Sydney' },
];

// State
let timezones = [...defaultTimezones];
// clockIntervals and other state/DOM elements are declared for completeness, 
// but their logic is deferred until later days.

// DOM Elements
const clocksContainer = document.getElementById('clocksContainer');
const emptyState = document.getElementById('emptyState');
// Modal elements for future use
const addTimezoneBtn = document.getElementById('addTimezoneBtn');
const timezoneModal = document.getElementById('timezoneModal');
const closeModal = document.getElementById('closeModal');
const timezoneSelect = document.getElementById('timezoneSelect');
const searchInput = document.getElementById('searchInput');
const customLabel = document.getElementById('customLabel');
const addTimezoneSubmit = document.getElementById('addTimezoneSubmit');


// --- CORE UTILITY FUNCTIONS ---

// Get time in timezone
function getTimeInTimezone(timezone) {
    try {
        // We use Intl.DateTimeFormat to ensure we get the time adjusted 
        // for the specified timezone.
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const parts = formatter.formatToParts(now);
        const values = {};
        parts.forEach(part => {
            values[part.type] = part.value;
        });
        
        // Reconstruct the date object adjusted to the target timezone's local time
        return new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`);
    } catch (error) {
        // Fallback to local time if timezone is invalid
        return new Date();
    }
}

// Get timezone offset/abbreviation
function getTimezoneOffset(timezone) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'short'
        });
        const parts = formatter.formatToParts(now);
        const timeZoneName = parts.find(part => part.type === 'timeZoneName');
        return timeZoneName ? timeZoneName.value : '';
    } catch (error) {
        return '';
    }
}

// Determine time of day for styling/icon
function getTimeOfDay(hours) {
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

// Get icon SVG path data
function getIconSVG(iconName) {
    const icons = {
        sunrise: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>',
        sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
        sunset: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>',
        moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
    };
    return icons[iconName] || icons.sun;
}

// Create analog clock SVG
function createAnalogClockSVG(hours, minutes, seconds) {
    const secondAngle = (seconds * 6) - 90;
    const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
    const hourAngle = ((hours % 12) * 30 + minutes * 0.5) - 90;
    
    let svg = `
        <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="75" fill="rgb(30, 41, 59)" stroke="rgb(71, 85, 105)" stroke-width="2"/>
    `;
    
    // Hour markers
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 80 + Math.cos(angle) * 65;
        const y1 = 80 + Math.sin(angle) * 65;
        const x2 = 80 + Math.cos(angle) * 70;
        const y2 = 80 + Math.sin(angle) * 70;
        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgb(148, 163, 184)" stroke-width="2" stroke-linecap="round"/>`;
    }
    
    // Hour hand
    const hourX = 80 + Math.cos(hourAngle * Math.PI / 180) * 40;
    const hourY = 80 + Math.sin(hourAngle * Math.PI / 180) * 40;
    svg += `<line x1="80" y1="80" x2="${hourX}" y2="${hourY}" stroke="rgb(226, 232, 240)" stroke-width="6" stroke-linecap="round"/>`;
    
    // Minute hand
    const minuteX = 80 + Math.cos(minuteAngle * Math.PI / 180) * 55;
    const minuteY = 80 + Math.sin(minuteAngle * Math.PI / 180) * 55;
    svg += `<line x1="80" y1="80" x2="${minuteX}" y2="${minuteY}" stroke="rgb(96, 165, 250)" stroke-width="4" stroke-linecap="round"/>`;
    
    // Second hand
    const secondX = 80 + Math.cos(secondAngle * Math.PI / 180) * 60;
    const secondY = 80 + Math.sin(secondAngle * Math.PI / 180) * 60;
    svg += `<line x1="80" y1="80" x2="${secondX}" y2="${secondY}" stroke="rgb(239, 68, 68)" stroke-width="2" stroke-linecap="round"/>`;
    
    // Center dot
    svg += `<circle cx="80" cy="80" r="5" fill="rgb(239, 68, 68)"/>`;
    svg +=`</svg>`;
    
    return svg;
}

// Create clock card
function createClockCard(tz) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.setAttribute('data-id', tz.id);
    
    // Calculate the current static time
    const localTime = getTimeInTimezone(tz.timezone);
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const seconds = localTime.getSeconds();
    const timeOfDay = getTimeOfDay(hours);
    const offset = getTimezoneOffset(tz.timezone);
    
    // Format the time strings
    const time24 = localTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const time12 = localTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    card.innerHTML = `
        <div class="clock-header">
            <h3>${tz.label}</h3>
            <span class="timezone-offset">${offset}</span>
        </div>
        <div class="time-of-day ${timeOfDay.className}">
            <svg class="time-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                ${getIconSVG(timeOfDay.icon)}
            </svg>
            <span>${timeOfDay.label}</span>
        </div>
        <div class="clock-display">
            <div class="digital-clock">
                <div class="time-24">${time24}</div>
                <div class="time-12">${time12}</div>
            </div>
            <div class="analog-clock hidden">
                ${createAnalogClockSVG(hours, minutes, seconds)}
            </div>
        </div>
        <div class="card-actions">
            <button class="btn-secondary toggle-clock-btn" onclick="toggleClockView('${tz.id}')">Show Analog</button>
            <button class="btn-danger" onclick="removeTimezone('${tz.id}')">Remove</button>
        </div>
    `;
    
    return card;
}

// Render clocks
function renderClocks() {
    if (timezones.length === 0) {
        clocksContainer.innerHTML = '';
        emptyState.classList.add('visible');
        return;
    }
    
    emptyState.classList.remove('visible');
    clocksContainer.innerHTML = '';
    
    timezones.forEach(tz => {
        const card = createClockCard(tz);
        clocksContainer.appendChild(card);
    });
}


// Update all clocks (NEW FOR DAY 2)
function updateAllClocks() {
    timezones.forEach(tz => {
        const card = document.querySelector(`[data-id="${tz.id}"]`);
        if (!card) return; // Skip if card was removed
        
        const localTime = getTimeInTimezone(tz.timezone);
        const hours = localTime.getHours();
        const minutes = localTime.getMinutes();
        const seconds = localTime.getSeconds();
        
        // Format time strings
        const time24 = localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const time12 = localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        // 1. Update digital clock text
        const time24El = card.querySelector('.time-24');
        const time12El = card.querySelector('.time-12');
        if (time24El) time24El.textContent = time24;
        if (time12El) time12El.textContent = time12;
        
        // 2. Update analog clock SVG by regenerating its inner HTML
        const analogClockEl = card.querySelector('.analog-clock');
        if (analogClockEl) {
            analogClockEl.innerHTML = createAnalogClockSVG(hours, minutes, seconds);
        }
    });
}

// --- INITIALIZATION ---

// Initialize
function init() {
    // populateTimezoneSelect() and search/modal logic are for Day 4/5
    
    renderClocks();
    
    // updateAllClocks() and setInterval are for Day 2
    updateAllClocks();

    setInterval(updateAllClocks, 1000);
    
    // Event listeners are for Day 4/5
}

// Call the initialization function
init();

// Placeholder functions for future days to prevent errors when buttons are clicked
function toggleClockView() { console.log('Toggle view logic is for Day 3'); }
function removeTimezone() { console.log('Remove logic is for Day 3'); }
function populateTimezoneSelect() { console.log('Select population logic is for Day 4'); }