
let allTimezones = [];

function initTimezones() {
    if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

        allTimezones = Intl.supportedValuesOf('timeZone').map(tz => {
            const parts = tz.split('/');
            let label = parts[parts.length - 1].replace(/_/g, ' ');

            // Get Country Name
            let countryName = '';
            if (typeof TIMEZONE_PER_COUNTRY !== 'undefined') {
                for (const [code, zones] of Object.entries(TIMEZONE_PER_COUNTRY)) {
                    if (code === 'ALL') continue;
                    if (zones.includes(tz)) {
                        try {
                            countryName = regionNames.of(code);
                        } catch (e) {
                            countryName = code; // Fallback to code if DisplayNames fails
                        }
                        break;
                    }
                }
            }

            if (countryName) {
                label = `${label}, ${countryName} `;
                if (countryName === 'India') {
                    console.log('Mapped India:', tz, label);
                }
            }

            return {
                timezone: tz,
                label: label,
                country: countryName // Store for potential separate filtering
            };
        });
    } else {
        console.warn('Intl.supportedValuesOf not supported, falling back to defaults');
        allTimezones = [...defaultTimezones];
    }
}

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
let searchSuggestions;
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

// Persistence
function saveSettings() {
    localStorage.setItem('timezones', JSON.stringify(timezones));
    console.log('Settings saved:', timezones);
}

function loadSettings() {
    const savedTimezones = localStorage.getItem('timezones');
    if (savedTimezones) {
        try {
            timezones = JSON.parse(savedTimezones);
            console.log('Settings loaded:', timezones);
        } catch (e) {
            console.error('Error parsing saved timezones:', e);
            timezones = [...defaultTimezones];
        }
    } else {
        timezones = [...defaultTimezones];
        console.log('No saved settings, using defaults');
    }
}

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

function toggleTheme(event) {
    // If body has light-mode, we are in light mode. Toggling removes it (dark).
    // If body doesn't have light-mode, we are in dark mode. Toggling adds it (light).

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
        document.body.classList.toggle('light-mode');
        updateThemeIcon();

        // Save preference
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        return;
    }

    // Get click position or center of screen
    const x = event ? event.clientX : window.innerWidth / 2;
    const y = event ? event.clientY : window.innerHeight / 2;

    // Calculate distance to furthest corner
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
        document.body.classList.toggle('light-mode');
        updateThemeIcon();
    });

    transition.ready.then(() => {
        const isLight = document.body.classList.contains('light-mode');

        // Animate the clip-path
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 500,
                easing: 'ease-in',
                pseudoElement: isLight ? '::view-transition-new(root)' : '::view-transition-old(root)'
            }
        );
    });

    // Save preference
    // The transition callback runs synchronously for the DOM update.
    // So checking outside is fine, but we need to be careful about the order.
    // Let's just re-check the class list.
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
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

    // Calculate Asia/Kolkata time and difference
    const kolkataTime = getTimeInTimezone('Asia/Kolkata');
    const kolkataTimeStr = kolkataTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const diffMs = localTime.getTime() - kolkataTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffStr = diffHours === 0 ? 'Same time' : `${Math.abs(diffHours)} hrs ${diffHours > 0 ? 'ahead' : 'behind'}`;

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
                <div class="kolkata-info" style="font-size: 0.85em; color: var(--text-secondary); margin-top: 8px; text-align: center;">
                    <div>🇮🇳 India: <span class="kolkata-time">${kolkataTimeStr}</span></div>
                    <div class="time-diff">${diffStr}</div>
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

    // Render comparison section
    const comparisonSection = document.createElement('div');
    comparisonSection.className = 'comparison-section';
    comparisonSection.innerHTML = `
        <div class="comparison-header">
            <span style="font-size: 0.85rem; font-weight: 500;">Comparisons</span>
            <div class="comparison-controls">
                <button class="comparison-reset-btn" onclick="resetComparisonTimezones('${tz.id}')" title="Clear all comparisons">Reset</button>
                <button class="comparison-toggle-btn" onclick="toggleComparisonSearch('${tz.id}')">+ Add</button>
            </div>
        </div>
        <div id="comparison-search-${tz.id}" class="comparison-search-container hidden">
            <input type="text" class="comparison-search-input" placeholder="Search city..." oninput="searchComparisonTimezones('${tz.id}', this.value)">
            <ul id="comparison-suggestions-${tz.id}" class="comparison-suggestions hidden"></ul>
        </div>
        <ul id="sub-timezones-${tz.id}" class="sub-timezone-list"></ul>
    `;
    card.appendChild(comparisonSection);

    // Initial render of sub-timezones if any
    if (tz.additionalTimezones && tz.additionalTimezones.length > 0) {
        // We need to do this after the card is in DOM or just append now? 
        // We can't use getElementById yet because card isn't in DOM.
        // So we'll render it manually here or call a helper after.
        // Let's defer it to renderClocks loop.
    }

    return card;
}

// --- Multi-Timezone Comparison Logic ---

function toggleComparisonSearch(cardId) {
    const searchContainer = document.getElementById(`comparison-search-${cardId}`);
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
        searchContainer.querySelector('input').focus();
    }
}

function searchComparisonTimezones(cardId, query) {
    const suggestionsEl = document.getElementById(`comparison-suggestions-${cardId}`);
    if (!query) {
        suggestionsEl.classList.add('hidden');
        return;
    }

    const matches = allTimezones.filter(tz =>
        tz.label.toLowerCase().includes(query.toLowerCase()) ||
        tz.timezone.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10); // Limit to 10

    suggestionsEl.innerHTML = '';
    if (matches.length > 0) {
        matches.forEach(match => {
            const li = document.createElement('li');
            li.textContent = match.label;
            li.onclick = () => addComparisonTimezone(cardId, match);
            suggestionsEl.appendChild(li);
        });
        suggestionsEl.classList.remove('hidden');
    } else {
        suggestionsEl.classList.add('hidden');
    }
}

function addComparisonTimezone(cardId, timezoneObj) {
    const cardIndex = timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;

    if (!timezones[cardIndex].additionalTimezones) {
        timezones[cardIndex].additionalTimezones = [];
    }

    // Prevent duplicates
    if (timezones[cardIndex].additionalTimezones.some(t => t.timezone === timezoneObj.timezone)) {
        alert('Timezone already added to comparison');
        return;
    }

    timezones[cardIndex].additionalTimezones.push({
        id: Date.now().toString(), // Sub-ID
        timezone: timezoneObj.timezone,
        label: timezoneObj.label
    });

    saveSettings();

    // Clear search
    const searchContainer = document.getElementById(`comparison-search-${cardId}`);
    searchContainer.classList.add('hidden');
    searchContainer.querySelector('input').value = '';
    document.getElementById(`comparison-suggestions-${cardId}`).classList.add('hidden');

    renderSubTimezones(cardId);
}

function removeComparisonTimezone(cardId, subId) {
    const cardIndex = timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;

    if (timezones[cardIndex].additionalTimezones) {
        timezones[cardIndex].additionalTimezones = timezones[cardIndex].additionalTimezones.filter(t => t.id !== subId);
        saveSettings();
        renderSubTimezones(cardId);
    }
}

function resetComparisonTimezones(cardId) {
    const cardIndex = timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;

    if (confirm('Remove all comparison timezones for this clock?')) {
        timezones[cardIndex].additionalTimezones = [];
        saveSettings();
        renderSubTimezones(cardId);
    }
}

function renderSubTimezones(cardId) {
    const cardIndex = timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;

    const container = document.getElementById(`sub-timezones-${cardId}`);
    if (!container) return;

    const subTimezones = timezones[cardIndex].additionalTimezones || [];
    container.innerHTML = '';

    subTimezones.forEach(sub => {
        const li = document.createElement('li');
        li.className = 'sub-timezone-item';
        li.id = `sub-tz-${sub.id}`;
        li.setAttribute('data-sub-id', sub.id);

        // Time calculation will happen in updateAllClocks, but we need initial structure
        li.innerHTML = `
            <div class="sub-tz-info">
                <span class="sub-tz-label">${sub.label.split('(')[0].trim()}</span>
                <span class="sub-tz-meta">Loading...</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span class="sub-tz-time">--:--</span>
                <button class="sub-tz-remove" onclick="removeComparisonTimezone('${cardId}', '${sub.id}')">&times;</button>
            </div>
        `;
        container.appendChild(li);
    });

    // Trigger an immediate update for this card's sub-clocks
    // We need to find the card element first
    const card = document.querySelector(`.clock-card[data-id="${cardId}"]`);
    if (card) {
        updateSubClocks(timezones[cardIndex], card);
    }
}

function updateSubClocks(mainTz, card) {
    if (!mainTz.additionalTimezones || mainTz.additionalTimezones.length === 0) return;

    const mainTime = getTimeInTimezone(mainTz.timezone);

    mainTz.additionalTimezones.forEach(sub => {
        const subItem = document.getElementById(`sub-tz-${sub.id}`);
        if (!subItem) return;

        const subTime = getTimeInTimezone(sub.timezone);

        // Time Diff relative to MAIN card timezone
        const diffMs = subTime.getTime() - mainTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const formattedDiff = Math.abs(diffHours) % 1 === 0 ? Math.abs(diffHours) : Math.abs(diffHours).toFixed(1);
        const sign = diffHours >= 0 ? '+' : '-';
        const diffStr = diffHours === 0 ? 'Same time' : `${sign}${formattedDiff}h`;

        const timeStr = subTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

        const timeEl = subItem.querySelector('.sub-tz-time');
        const metaEl = subItem.querySelector('.sub-tz-meta');

        if (timeEl) timeEl.textContent = timeStr;
        if (metaEl) metaEl.textContent = diffStr;
    });
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

        // Render sub-timezones
        renderSubTimezones(tz.id);

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
    allTimezones.forEach(tz => {
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

    // Handle Suggestions
    searchSuggestions.innerHTML = '';
    if (query.length === 0) {
        searchSuggestions.classList.add('hidden');
        return;
    }

    const matches = allTimezones.filter(tz =>
        tz.label.toLowerCase().includes(query) ||
        tz.timezone.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
        matches.forEach(tz => {
            const li = document.createElement('li');
            li.textContent = tz.label;
            li.addEventListener('click', () => {
                selectSuggestion(tz);
            });
            searchSuggestions.appendChild(li);
        });
        searchSuggestions.classList.remove('hidden');
    } else {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        li.className = 'no-results';
        searchSuggestions.appendChild(li);
        searchSuggestions.classList.remove('hidden');
    }
}

function selectSuggestion(tz) {
    timezoneSelect.value = tz.timezone;
    searchInput.value = tz.label;
    searchSuggestions.classList.add('hidden');
    // Trigger change event if needed, or just let the user click Add
}

// Add timezone
function addTimezone() {
    const selectedTimezone = timezoneSelect.value;
    if (!selectedTimezone) {
        alert('Please select a timezone');
        return;
    }

    const timezoneData = allTimezones.find(tz => tz.timezone === selectedTimezone);
    const label = customLabel.value || timezoneData.label;

    const newTimezone = {
        id: Date.now().toString(),
        timezone: selectedTimezone,
        label: label
    };

    timezones.push(newTimezone);
    console.log('Timezone added:', newTimezone);
    saveSettings();
    renderClocks();
    closeModalHandler();
}

// Reset to default settings
function resetToDefault() {
    if (confirm('Are you sure you want to reset to default settings? This will clear all your custom timezones.')) {
        localStorage.removeItem('timezones');
        timezones = [...defaultTimezones];
        console.log('Reset to defaults');
        renderClocks();
    }
}

/**
 * Updates the time display for ALL currently active clocks.
 */
function updateAllClocks() {
    timezones.forEach(tz => {
        try {
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

            // 4. Update Kolkata time and difference
            const kolkataTime = getTimeInTimezone('Asia/Kolkata');
            const kolkataTimeStr = kolkataTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            const diffMs = localTime.getTime() - kolkataTime.getTime();
            const diffHours = diffMs / (1000 * 60 * 60);
            // Format to 1 decimal place if needed, or keep as is if it's usually .5 or .0
            const formattedDiff = Math.abs(diffHours) % 1 === 0 ? Math.abs(diffHours) : Math.abs(diffHours).toFixed(1);
            const diffStr = diffHours === 0 ? 'Same time' : `${formattedDiff} hrs ${diffHours > 0 ? 'ahead' : 'behind'}`;

            const kolkataTimeEl = card.querySelector('.kolkata-time');
            const timeDiffEl = card.querySelector('.time-diff');
            if (kolkataTimeEl) kolkataTimeEl.textContent = kolkataTimeStr;
            if (timeDiffEl) timeDiffEl.textContent = diffStr;

            // 5. Update Sub-clocks (Comparisons)
            updateSubClocks(tz, card);
        } catch (e) {
            console.error('Error updating clock for:', tz.label, e);
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
    searchSuggestions = document.getElementById('searchSuggestions');
    customLabel = document.getElementById('customLabel');
    addTimezoneSubmit = document.getElementById('addTimezoneSubmit');
    themeToggleBtn = document.getElementById('themeToggleBtn');
    timeTravelSlider = document.getElementById('timeTravelSlider');
    timeOffsetLabel = document.getElementById('timeOffsetLabel');
    resetTimeBtn = document.getElementById('resetTimeBtn');
    const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');


    console.log('DOM elements initialized:', {
        clocksContainer: !!clocksContainer,
        emptyState: !!emptyState,
        timezones: timezones.length
    });

    // Initialize timezones
    initTimezones();

    // Populate timezone select dropdown
    populateTimezoneSelect();

    // Load saved settings
    loadSettings();

    // Initialize theme
    initTheme();

    // Add event listeners
    addTimezoneBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalHandler);
    timezoneModal.addEventListener('click', (e) => {
        if (e.target === timezoneModal) closeModalHandler();
    });
    searchSuggestions.classList.add('hidden');

    searchInput.addEventListener('input', filterTimezones);

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target !== searchInput && e.target !== searchSuggestions) {
            if (searchSuggestions && !searchSuggestions.classList.contains('hidden')) {
                searchSuggestions.classList.add('hidden');
            }
        }
    });

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

    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', resetToDefault);
    }

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
    saveSettings();
    renderClocks();
}