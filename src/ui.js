// src/ui.js
import { state } from './state.js';
import { saveSettings } from './storage.js';
import { fetchWeather } from './api.js';
import { getTimeInTimezone, getTimezoneOffset, getTimeOfDay, getIconSVG, createAnalogClockSVG } from './utils.js';

// DOM Elements cache
export const dom = {};

export function initDOM() {
    dom.clocksContainer = document.getElementById('clocksContainer');
    dom.emptyState = document.getElementById('emptyState');
    dom.themeToggleBtn = document.getElementById('themeToggleBtn');
    dom.timezoneSelect = document.getElementById('timezoneSelect');
    // ... add others if needed internally
}

export function updateThemeIcon(isLight) {
    const moonIcon = dom.themeToggleBtn.querySelector('.icon-moon');
    const sunIcon = dom.themeToggleBtn.querySelector('.icon-sun');
    if (isLight) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

export function populateTimezoneSelect() {
    dom.timezoneSelect.innerHTML = '<option value="">Choose a timezone</option>';
    state.allTimezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.timezone;
        option.textContent = tz.label;
        dom.timezoneSelect.appendChild(option);
    });
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
    const time24 = localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const cityFromTimezone = tz.timezone.split('/').pop().replace(/_/g, ' ');
    const weatherId = `weather-${tz.id}`;

    const kolkataTime = getTimeInTimezone('Asia/Kolkata');
    const kolkataTimeStr = kolkataTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const diffMs = localTime.getTime() - kolkataTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffStr = diffHours === 0 ? 'Same time' : `${Math.abs(diffHours)} hrs ${diffHours > 0 ? 'ahead' : 'behind'}`;

    // Note: We keep onclick handlers, but we must attach functions to window in main.js
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
                <div id="${weatherId}" class="weather-display"></div>
                <div class="card-actions">
                    <button class="btn-secondary toggle-clock-btn" onclick="toggleClockView('${tz.id}')">Show Analog</button>
                    <button class="btn-danger" onclick="removeTimezone('${tz.id}')">Remove</button>
                </div>
            `;

    card.dataset.city = cityFromTimezone;
    card.dataset.weatherId = weatherId;

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
            <input type="text" class="comparison-search-input" name="comparisonSearch" placeholder="Search city..." oninput="searchComparisonTimezones('${tz.id}', this.value)">
            <ul id="comparison-suggestions-${tz.id}" class="comparison-suggestions hidden"></ul>
        </div>
        <ul id="sub-timezones-${tz.id}" class="sub-timezone-list"></ul>
    `;
    card.appendChild(comparisonSection);
    return card;
}

export function renderClocks() {
    if (!dom.clocksContainer) return;

    if (state.timezones.length === 0) {
        dom.clocksContainer.innerHTML = '';
        dom.emptyState.classList.remove('hidden');
        dom.emptyState.classList.add('visible');
        return;
    }

    dom.emptyState.classList.remove('visible');
    dom.emptyState.classList.add('hidden');
    dom.clocksContainer.innerHTML = '';

    state.timezones.forEach(tz => {
        const card = createClockCard(tz);
        dom.clocksContainer.appendChild(card);
        renderSubTimezones(tz.id);
        if (card.dataset.city && card.dataset.weatherId) {
            fetchWeather(card.dataset.city, card.dataset.weatherId);
        }
    });
}

export function updateAllClocks() {
    state.timezones.forEach(tz => {
        try {
            const card = document.querySelector(`[data-id="${tz.id}"]`);
            if (!card) return;

            const localTime = getTimeInTimezone(tz.timezone);
            const hours = localTime.getHours();
            const minutes = localTime.getMinutes();
            const seconds = localTime.getSeconds();
            const timeOfDay = getTimeOfDay(hours);

            const time24 = localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

            const time24El = card.querySelector('.time-24');
            if (time24El) time24El.textContent = time24;

            const timeOfDayEl = card.querySelector('.time-of-day');
            if (timeOfDayEl) {
                timeOfDayEl.className = `time-of-day ${timeOfDay.className}`;
                timeOfDayEl.querySelector('span').textContent = timeOfDay.label;
                timeOfDayEl.querySelector('.time-icon').innerHTML = getIconSVG(timeOfDay.icon);
            }

            const analogClockEl = card.querySelector('.analog-clock');
            if (analogClockEl) {
                analogClockEl.innerHTML = createAnalogClockSVG(hours, minutes, seconds);
            }

            const kolkataTime = getTimeInTimezone('Asia/Kolkata');
            const kolkataTimeStr = kolkataTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            const diffMs = localTime.getTime() - kolkataTime.getTime();
            const diffHours = diffMs / (1000 * 60 * 60);
            const formattedDiff = Math.abs(diffHours) % 1 === 0 ? Math.abs(diffHours) : Math.abs(diffHours).toFixed(1);
            const diffStr = diffHours === 0 ? 'Same time' : `${formattedDiff} hrs ${diffHours > 0 ? 'ahead' : 'behind'}`;

            const kolkataTimeEl = card.querySelector('.kolkata-time');
            const timeDiffEl = card.querySelector('.time-diff');
            if (kolkataTimeEl) kolkataTimeEl.textContent = kolkataTimeStr;
            if (timeDiffEl) timeDiffEl.textContent = diffStr;

            updateSubClocks(tz, card);
        } catch (e) {
            console.error('Error updating clock', e);
        }
    });
}

export function renderSubTimezones(cardId) {
    const cardIndex = state.timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;
    const container = document.getElementById(`sub-timezones-${cardId}`);
    if (!container) return;

    const subTimezones = state.timezones[cardIndex].additionalTimezones || [];
    container.innerHTML = '';

    subTimezones.forEach(sub => {
        const li = document.createElement('li');
        li.className = 'sub-timezone-item';
        li.id = `sub-tz-${sub.id}`;
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
    const card = document.querySelector(`.clock-card[data-id="${cardId}"]`);
    if (card) updateSubClocks(state.timezones[cardIndex], card);
}

function updateSubClocks(mainTz, card) {
    if (!mainTz.additionalTimezones || mainTz.additionalTimezones.length === 0) return;
    const mainTime = getTimeInTimezone(mainTz.timezone);

    mainTz.additionalTimezones.forEach(sub => {
        const subItem = document.getElementById(`sub-tz-${sub.id}`);
        if (!subItem) return;
        const subTime = getTimeInTimezone(sub.timezone);
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