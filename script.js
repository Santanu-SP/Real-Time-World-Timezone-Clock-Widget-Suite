const popularTimezones = [
    { id: '1', timezone: 'America/New_York', label: 'New York' },
    { id: '2', timezone: 'Europe/London', label: 'London' },
    { id: '3', timezone: 'Asia/Tokyo', label: 'Tokyo' },
    { id: '4', timezone: 'Australia/Sydney', label: 'Sydney' },
    { id: '5', timezone: 'Asia/Kolkata', label: 'Bengaluru' },
    { id: '6', timezone: 'America/Chicago', label: 'Chicago' },
    { id: '7', timezone: 'America/Denver', label: 'Denver' },
    { id: '8', timezone: 'America/Los_Angeles', label: 'Los Angeles' },
    { id: '9', timezone: 'America/Anchorage', label: 'Anchorage' },
    { id: '10', timezone: 'America/Halifax', label: 'Halifax' },
    { id: '11', timezone: 'America/Phoenix', label: 'Phoenix' },
    { id: '12', timezone: 'America/Mexico_City', label: 'Mexico City' },
    { id: '13', timezone: 'America/Toronto', label: 'Toronto' },
    { id: '14', timezone: 'America/Vancouver', label: 'Vancouver' },
    { id: '15', timezone: 'America/St_Johns', label: 'St. John\'s' },
    { id: '16', timezone: 'America/Havana', label: 'Havana, Cuba' },
    { id: '17', timezone: 'America/Cancun', label: 'Cancún' },
    { id: '18', timezone: 'America/Guatemala', label: 'Guatemala City' },
    { id: '19', timezone: 'America/Costa_Rica', label: 'San José, CR' },
    { id: '20', timezone: 'America/Jamaica', label: 'Kingston, Jamaica' },
    { id: '21', timezone: 'America/Puerto_Rico', label: 'San Juan, Puerto Rico' },
    { id: '22', timezone: 'America/Sao_Paulo', label: 'São Paulo' },
    { id: '23', timezone: 'America/Buenos_Aires', label: 'Buenos Aires' },
    { id: '24', timezone: 'America/Santiago', label: 'Santiago, Chile' },
    { id: '25', timezone: 'America/Bogota', label: 'Bogotá, Colombia' },
    { id: '26', timezone: 'America/Lima', label: 'Lima, Peru' },
    { id: '27', timezone: 'America/Caracas', label: 'Caracas, Venezuela' },
    { id: '28', timezone: 'America/La_Paz', label: 'La Paz, Bolivia' },
    { id: '29', timezone: 'America/Asuncion', label: 'Asunción, Paraguay' },
    { id: '30', timezone: 'America/Montevideo', label: 'Montevideo, Uruguay' },
    { id: '31', timezone: 'America/Manaus', label: 'Manaus, Brazil' },
    { id: '32', timezone: 'America/Rio_Branco', label: 'Rio Branco, Brazil' },
    { id: '33', timezone: 'Atlantic/Stanley', label: 'Falkland Islands' },
    { id: '34', timezone: 'Europe/Paris', label: 'Paris' },
    { id: '35', timezone: 'Europe/Berlin', label: 'Berlin' },
    { id: '36', timezone: 'Europe/Madrid', label: 'Madrid' },
    { id: '37', timezone: 'Europe/Rome', label: 'Rome' },
    { id: '38', timezone: 'Europe/Amsterdam', label: 'Amsterdam' },
    { id: '39', timezone: 'Europe/Stockholm', label: 'Stockholm' },
    { id: '40', timezone: 'Europe/Zurich', label: 'Zurich' },
    { id: '41', timezone: 'Europe/Vienna', label: 'Vienna' },
    { id: '42', timezone: 'Europe/Warsaw', label: 'Warsaw' },
    { id: '43', timezone: 'Europe/Athens', label: 'Athens' },
    { id: '44', timezone: 'Europe/Istanbul', label: 'Istanbul' },
    { id: '45', timezone: 'Europe/Moscow', label: 'Moscow' },
    { id: '46', timezone: 'Europe/Kiev', label: 'Kyiv, Ukraine' },
    { id: '47', timezone: 'Europe/Helsinki', label: 'Helsinki' },
    { id: '48', timezone: 'Europe/Dublin', label: 'Dublin' },
    { id: '49', timezone: 'Europe/Lisbon', label: 'Lisbon' },
    { id: '50', timezone: 'Europe/Prague', label: 'Prague' },
    { id: '51', timezone: 'Europe/Brussels', label: 'Brussels' },
    { id: '52', timezone: 'Europe/Oslo', label: 'Oslo' },
    { id: '53', timezone: 'Africa/Lagos', label: 'Lagos, Nigeria' },
    { id: '54', timezone: 'Africa/Cairo', label: 'Cairo, Egypt' },
    { id: '55', timezone: 'Africa/Johannesburg', label: 'Johannesburg, South Africa' },
    { id: '56', timezone: 'Africa/Nairobi', label: 'Nairobi, Kenya' },
    { id: '57', timezone: 'Africa/Casablanca', label: 'Casablanca, Morocco' },
    { id: '58', timezone: 'Africa/Algiers', label: 'Algiers, Algeria' },
    { id: '59', timezone: 'Africa/Tunis', label: 'Tunis, Tunisia' },
    { id: '60', timezone: 'Africa/Tripoli', label: 'Tripoli, Libya' },
    { id: '61', timezone: 'Africa/Accra', label: 'Accra, Ghana' },
    { id: '62', timezone: 'Africa/Dakar', label: 'Dakar, Senegal' },
    { id: '63', timezone: 'Africa/Windhoek', label: 'Windhoek, Namibia' },
    { id: '64', timezone: 'Africa/Lusaka', label: 'Lusaka, Zambia' },
    { id: '65', timezone: 'Asia/Shanghai', label: 'Shanghai, China' },
    { id: '66', timezone: 'Asia/Seoul', label: 'Seoul, South Korea' },
    { id: '67', timezone: 'Asia/Dubai', label: 'Dubai, UAE' },
    { id: '68', timezone: 'Asia/Riyadh', label: 'Riyadh, Saudi Arabia' },
    { id: '69', timezone: 'Asia/Jerusalem', label: 'Jerusalem, Israel' },
    { id: '70', timezone: 'Asia/Bangkok', label: 'Bangkok, Thailand' },
    { id: '71', timezone: 'Asia/Singapore', label: 'Singapore' },
    { id: '72', timezone: 'Asia/Jakarta', label: 'Jakarta, Indonesia' },
    { id: '73', timezone: 'Asia/Manila', label: 'Manila, Philippines' },
    { id: '74', timezone: 'Asia/Karachi', label: 'Karachi, Pakistan' },
    { id: '75', timezone: 'Asia/Tashkent', label: 'Tashkent, Uzbekistan' },
    { id: '76', timezone: 'Asia/Tehran', label: 'Tehran, Iran' },
    { id: '77', timezone: 'Asia/Dhaka', label: 'Dhaka, Bangladesh' },
    { id: '78', timezone: 'Asia/Hong_Kong', label: 'Hong Kong' },
    { id: '79', timezone: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur, Malaysia' },
    { id: '80', timezone: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh, Vietnam' },
    { id: '81', timezone: 'Asia/Taipei', label: 'Taipei, Taiwan' },
    { id: '82', timezone: 'Asia/Qatar', label: 'Doha, Qatar' },
    { id: '83', timezone: 'Australia/Perth', label: 'Perth' },
    { id: '84', timezone: 'Australia/Adelaide', label: 'Adelaide' },
    { id: '85', timezone: 'Australia/Brisbane', label: 'Brisbane' },
    { id: '86', timezone: 'Pacific/Auckland', label: 'Auckland, New Zealand' },
    { id: '87', timezone: 'Pacific/Honolulu', label: 'Honolulu, Hawaii' },
    { id: '88', timezone: 'Pacific/Fiji', label: 'Suva, Fiji' },
    { id: '89', timezone: 'Pacific/Guam', label: 'Hagåtña, Guam' },
    { id: '90', timezone: 'Pacific/Midway', label: 'Midway Atoll' },
    { id: '91', timezone: 'Pacific/Tahiti', label: 'Tahiti' },
    { id: '92', timezone: 'Pacific/Port_Moresby', label: 'Port Moresby, PNG' },
    { id: '93', timezone: 'Asia/Yekaterinburg', label: 'Yekaterinburg' },
    { id: '94', timezone: 'Asia/Novosibirsk', label: 'Novosibirsk' },
    { id: '95', timezone: 'Asia/Vladivostok', label: 'Vladivostok' },
    { id: '96', timezone: 'Etc/UTC', label: 'Coordinated Universal Time (UTC)' },
    { id: '97', timezone: 'Etc/GMT', label: 'Greenwich Mean Time (GMT)' },
    { id: '98', timezone: 'Atlantic/Reykjavik', label: 'Reykjavík, Iceland' },
    { id: '99', timezone: 'Indian/Maldives', label: 'Maldives' },
    { id: '100', timezone: 'Antarctica/Casey', label: 'Casey Station, Antarctica' }
];

const defaultTimezones = [
    { id: '1', timezone: 'America/New_York', label: 'New York' },
    { id: '2', timezone: 'Europe/London', label: 'London' },
    { id: '3', timezone: 'Asia/Tokyo', label: 'Tokyo' },
    { id: '4', timezone: 'Australia/Sydney', label: 'Sydney' },
];

let timezones = [...defaultTimezones];
let clockIntervals; // Placeholder for future state management
let updateInterval = null; // Used to hold the setInterval reference

// DOM Elements will be initialized in init()
let clocksContainer;
let emptyState;
let addTimezoneBtn;
let timezoneModal;
let closeModal;
let timezoneSelect;
let searchInput;
let customLabel;
let addTimezoneSubmit;
let themeToggleBtn;
let timeTravelSlider;
let timeOffsetLabel;
let resetTimeBtn;
let globalOffset = 0; // Hours

// Weather API
const weatherApiKey = CONFIG.WEATHER_API_KEY;
const weatherCache = {}; // Simple cache to prevent excessive API calls

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
}

function updateThemeIcon(isLight) {
    const moonIcon = themeToggleBtn.querySelector('.icon-moon');
    const sunIcon = themeToggleBtn.querySelector('.icon-sun');

    if (isLight) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

// Fetch weather data
async function fetchWeather(city, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (!weatherApiKey || weatherApiKey === 'YOUR_API_KEY') {
        container.innerHTML = '<span class="weather-error">Configure API Key in config.js</span>';
        return;
    }

    // Check cache (valid for 10 minutes)
    const now = Date.now();
    if (weatherCache[city] && (now - weatherCache[city].timestamp < 600000)) {
        updateWeatherUI(elementId, weatherCache[city].data);
        return;
    }

    try {
        // Show loading state
        container.innerHTML = '<span class="weather-loading">Loading weather...</span>';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API Key');
            } else if (response.status === 404) {
                throw new Error('City not found');
            }
            throw new Error('Weather fetch failed');
        }

        const data = await response.json();
        weatherCache[city] = {
            timestamp: now,
            data: data
        };
        updateWeatherUI(elementId, data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        container.innerHTML = `<span class="weather-error">${error.message}</span>`;
    }
}

function updateWeatherUI(elementId, data) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const temp = Math.round(data.main.temp);

    container.innerHTML = `
        <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
        <span class="weather-temp">${temp}°C</span>
        <span class="weather-desc">${data.weather[0].main}</span>
    `;
}

function getTimeInTimezone(timezone) {
    try {
        // We use Intl.DateTimeFormat to ensure we get the time adjusted
        // for the specified timezone.
        const now = new Date();

        // Apply time travel offset
        if (globalOffset !== 0) {
            now.setTime(now.getTime() + (globalOffset * 3600000));
        }

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
        // Note: The date components are mandatory for correct time parsing across time zones
        return new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`);
    } catch (error) {
        // Fallback to local time if timezone is invalid
        return new Date();
    }
}

// Get timezone offset/abbreviation (New Utility)
function getTimezoneOffset(timezone) {
    try {
        const now = new Date();
        // Apply time travel offset for correct offset calculation (e.g. DST changes)
        if (globalOffset !== 0) {
            now.setTime(now.getTime() + (globalOffset * 3600000));
        }

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

// Determine time of day for styling/icon (New Utility)
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

// Get icon SVG path data (New Utility - Lucide icons path data)
function getIconSVG(iconName) {
    const icons = {
        sunrise: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>',
        sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
        sunset: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>',
        moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
    };
    return icons[iconName] || icons.sun;
}

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
    const secondLen = 70;
    const secondRad = secondAngle * Math.PI / 180;
    const secondX = 80 + Math.cos(secondRad) * secondLen;
    const secondY = 80 + Math.sin(secondRad) * secondLen;
    svg += `<line x1="80" y1="80" x2="${secondX}" y2="${secondY}" stroke="rgb(239, 68, 68)" stroke-width="2" stroke-linecap="round"/>`;

    // Center dot
    svg += `<circle cx="80" cy="80" r="5" fill="rgb(239, 68, 68)"/>`;
    svg += `</svg>`;

    return svg;
}


function createClockCard(tz) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.setAttribute('data-id', tz.id);

    const localTime = getTimeInTimezone(tz.timezone);
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const seconds = localTime.getSeconds();
    const timeOfDay = getTimeOfDay(hours);
    const offset = getTimezoneOffset(tz.timezone);

    // Display time in 24-hour format
    const time24 = localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    // Extract city name from timezone for more robust weather query
    // e.g., "America/New_York" -> "New York", "Asia/Kolkata" -> "Kolkata"
    const cityFromTimezone = tz.timezone.split('/').pop().replace(/_/g, ' ');
    const weatherId = `weather-${tz.id}`;

    card.innerHTML = `
                <div class="clock-header">
                    <h3>${tz.label}</h3>
                    <span class="timezone-offset">${offset}</span>
                </div>
                <div class="time-of-day ${timeOfDay.className}">
                    <svg class="time-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${getIconSVG(timeOfDay.icon)}
                    </svg>
                    <span>${timeOfDay.label}</span>
                </div>
                <div class="clock-display">
                    <div class="digital-clock time-24">${time24}</div>
                    <div class="analog-clock hidden">
                        ${createAnalogClockSVG(hours, minutes, seconds)}
                    </div>
                </div>
                <div id="${weatherId}" class="weather-display">
                    <!-- Weather will be loaded here -->
                </div>
                <div class="card-actions">
                    <button class="btn-secondary toggle-clock-btn" onclick="toggleClockView('${tz.id}')">Show Analog</button>
                    <button class="btn-danger" onclick="removeTimezone('${tz.id}')">Remove</button>
                </div>
            `;

    // Store city query on the card for later use if needed, or just return it
    card.dataset.city = cityFromTimezone;
    card.dataset.weatherId = weatherId;

    return card;
}

function renderClocks() {
    console.log('renderClocks called, timezones:', timezones.length, 'container:', clocksContainer);

    if (!clocksContainer) {
        console.error('clocksContainer is null!');
        return;
    }

    if (timezones.length === 0) {
        clocksContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        emptyState.classList.add('visible');
        return;
    }

    emptyState.classList.remove('visible');
    emptyState.classList.add('hidden');
    clocksContainer.innerHTML = '';

    timezones.forEach(tz => {
        console.log('Creating card for:', tz.label);
        const card = createClockCard(tz);
        clocksContainer.appendChild(card);

        // Fetch weather AFTER appending to DOM so getElementById works
        if (card.dataset.city && card.dataset.weatherId) {
            fetchWeather(card.dataset.city, card.dataset.weatherId);
        }
    });

    console.log('renderClocks finished, cards rendered:', clocksContainer.children.length);
}

// Populate timezone select dropdown
function populateTimezoneSelect() {
    timezoneSelect.innerHTML = '<option value="">Choose a timezone</option>';
    popularTimezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.timezone;
        option.textContent = tz.label;
        timezoneSelect.appendChild(option);
    });
}

// Open modal
function openModal() {
    timezoneModal.classList.add('show');
    console.log('Modal opened');
}

// Close modal
function closeModalHandler() {
    timezoneModal.classList.remove('show');
    searchInput.value = '';
    customLabel.value = '';
    timezoneSelect.value = '';
    filterTimezones();
    console.log('Modal closed');
}

// Filter timezones based on search
function filterTimezones() {
    const query = searchInput.value.toLowerCase();
    const options = timezoneSelect.querySelectorAll('option');

    options.forEach((option, index) => {
        if (index === 0) return; // Skip first "Choose a timezone" option
        const text = option.textContent.toLowerCase();
        const value = option.value.toLowerCase();

        if (text.includes(query) || value.includes(query)) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
}

// Add timezone
function addTimezone() {
    const selectedTimezone = timezoneSelect.value;
    if (!selectedTimezone) {
        alert('Please select a timezone');
        return;
    }

    const timezoneData = popularTimezones.find(tz => tz.timezone === selectedTimezone);
    const label = customLabel.value || timezoneData.label;

    const newTimezone = {
        id: Date.now().toString(),
        timezone: selectedTimezone,
        label: label
    };

    timezones.push(newTimezone);
    console.log('Timezone added:', newTimezone);
    renderClocks();
    closeModalHandler();
}

/**
 * Updates the time display for ALL currently active clocks.
 */
function updateAllClocks() {
    timezones.forEach(tz => {
        const card = document.querySelector(`[data-id="${tz.id}"]`);
        if (!card) return; // Skip if card was removed

        const localTime = getTimeInTimezone(tz.timezone);
        const hours = localTime.getHours();
        const minutes = localTime.getMinutes();
        const seconds = localTime.getSeconds();

        const timeOfDay = getTimeOfDay(hours);

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

        // 2. Update Time of Day indicator
        const timeOfDayEl = card.querySelector('.time-of-day');
        if (timeOfDayEl) {
            timeOfDayEl.className = `time-of-day ${timeOfDay.className}`;
            timeOfDayEl.querySelector('span').textContent = timeOfDay.label;
            timeOfDayEl.querySelector('.time-icon').innerHTML = getIconSVG(timeOfDay.icon);
        }

        // 3. Update analog clock SVG by regenerating its inner HTML
        const analogClockEl = card.querySelector('.analog-clock');
        if (analogClockEl) {
            analogClockEl.innerHTML = createAnalogClockSVG(hours, minutes, seconds);
        }
    });
}

/**
 * Initializes the application.
 */
function init() {
    console.log('init() called');

    // Initialize DOM elements
    clocksContainer = document.getElementById('clocksContainer');
    emptyState = document.getElementById('emptyState');
    addTimezoneBtn = document.getElementById('addTimezoneBtn');
    timezoneModal = document.getElementById('timezoneModal');
    closeModal = document.getElementById('closeModal');
    timezoneSelect = document.getElementById('timezoneSelect');
    searchInput = document.getElementById('searchInput');
    customLabel = document.getElementById('customLabel');
    addTimezoneSubmit = document.getElementById('addTimezoneSubmit');
    themeToggleBtn = document.getElementById('themeToggleBtn');
    timeTravelSlider = document.getElementById('timeTravelSlider');
    timeOffsetLabel = document.getElementById('timeOffsetLabel');
    resetTimeBtn = document.getElementById('resetTimeBtn');


    console.log('DOM elements initialized:', {
        clocksContainer: !!clocksContainer,
        emptyState: !!emptyState,
        timezones: timezones.length
    });

    // Populate timezone select dropdown
    populateTimezoneSelect();

    // Initialize theme
    initTheme();

    // Add event listeners
    addTimezoneBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalHandler);
    timezoneModal.addEventListener('click', (e) => {
        if (e.target === timezoneModal) closeModalHandler();
    });
    searchInput.addEventListener('input', filterTimezones);
    addTimezoneSubmit.addEventListener('click', addTimezone);
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Time travel listeners
    timeTravelSlider.addEventListener('input', (e) => {
        globalOffset = parseInt(e.target.value);
        const sign = globalOffset >= 0 ? '+' : '';
        timeOffsetLabel.textContent = `${sign}${globalOffset}h`;
        updateAllClocks();
    });

    resetTimeBtn.addEventListener('click', () => {
        globalOffset = 0;
        timeTravelSlider.value = 0;
        timeOffsetLabel.textContent = '+0h';
        updateAllClocks();
    });

    // Render clocks and start updates
    renderClocks();

    // Clear any previous interval and start the clock loop
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    updateInterval = setInterval(updateAllClocks, 1000);
    console.log('init() completed');
}

// Call init when DOM is ready
if (document.readyState === 'loading') {
    console.log('DOM still loading, attaching DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', init);
} else {
    console.log('DOM already loaded, calling init directly');
    init();
}

// Placeholder functions for future days to prevent errors when buttons are clicked (Required by target code)
function toggleClockView(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    const analogClock = card.querySelector('.analog-clock');
    const digitalClock = card.querySelector('.digital-clock');
    const button = card.querySelector('.toggle-clock-btn');

    analogClock.classList.toggle('hidden');
    digitalClock.classList.toggle('hidden');

    if (analogClock.classList.contains('hidden')) {
        button.textContent = 'Show Analog';
    } else {
        button.textContent = 'Show Digital';
    }
}
function removeTimezone(id) {
    timezones = timezones.filter(tz => tz.id !== id);
    renderClocks();
}