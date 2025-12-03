// src/main.js
import { state, setGlobalOffset } from './state.js';
import { defaultTimezones, initTimezones } from './data.js';
import { saveSettings, loadSettings } from './storage.js';
import { dom, initDOM, renderClocks, updateAllClocks, updateThemeIcon, populateTimezoneSelect, renderSubTimezones } from './ui.js';

// --- Global Logic exposed to Window (Required for HTML onclicks) ---

window.toggleClockView = (id) => {
    const card = document.querySelector(`[data-id="${id}"]`);
    const analogClock = card.querySelector('.analog-clock');
    const digitalClock = card.querySelector('.digital-clock');
    const button = card.querySelector('.toggle-clock-btn');
    analogClock.classList.toggle('hidden');
    digitalClock.classList.toggle('hidden');
    button.textContent = analogClock.classList.contains('hidden') ? 'Show Analog' : 'Show Digital';
};

window.removeTimezone = (id) => {
    state.timezones = state.timezones.filter(tz => tz.id !== id);
    saveSettings();
    renderClocks();
};

window.toggleComparisonSearch = (cardId) => {
    const searchContainer = document.getElementById(`comparison-search-${cardId}`);
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
        searchContainer.querySelector('input').focus();
    }
};

window.resetComparisonTimezones = (cardId) => {
    const cardIndex = state.timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;
    if (confirm('Remove all comparison timezones for this clock?')) {
        state.timezones[cardIndex].additionalTimezones = [];
        saveSettings();
        renderSubTimezones(cardId);
    }
};

window.searchComparisonTimezones = (cardId, query) => {
    const suggestionsEl = document.getElementById(`comparison-suggestions-${cardId}`);
    if (!query) {
        suggestionsEl.classList.add('hidden');
        return;
    }
    const matches = state.allTimezones.filter(tz =>
        tz.label.toLowerCase().includes(query.toLowerCase()) ||
        tz.timezone.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);

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
};

window.removeComparisonTimezone = (cardId, subId) => {
    const cardIndex = state.timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;
    if (state.timezones[cardIndex].additionalTimezones) {
        state.timezones[cardIndex].additionalTimezones = state.timezones[cardIndex].additionalTimezones.filter(t => t.id !== subId);
        saveSettings();
        renderSubTimezones(cardId);
    }
};

// Helper for comparisons
function addComparisonTimezone(cardId, timezoneObj) {
    const cardIndex = state.timezones.findIndex(tz => tz.id === cardId);
    if (cardIndex === -1) return;
    if (!state.timezones[cardIndex].additionalTimezones) {
        state.timezones[cardIndex].additionalTimezones = [];
    }
    if (state.timezones[cardIndex].additionalTimezones.some(t => t.timezone === timezoneObj.timezone)) {
        alert('Timezone already added to comparison');
        return;
    }
    state.timezones[cardIndex].additionalTimezones.push({
        id: Date.now().toString(),
        timezone: timezoneObj.timezone,
        label: timezoneObj.label
    });
    saveSettings();
    const searchContainer = document.getElementById(`comparison-search-${cardId}`);
    searchContainer.classList.add('hidden');
    searchContainer.querySelector('input').value = '';
    document.getElementById(`comparison-suggestions-${cardId}`).classList.add('hidden');
    renderSubTimezones(cardId);
}

// --- Internal Logic ---

function filterTimezones() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const options = document.getElementById('timezoneSelect').querySelectorAll('option');

    options.forEach((option, index) => {
        if (index === 0) return;
        const text = option.textContent.toLowerCase();
        const value = option.value.toLowerCase();
        option.style.display = (text.includes(query) || value.includes(query)) ? '' : 'none';
    });

    const searchSuggestions = document.getElementById('searchSuggestions');
    searchSuggestions.innerHTML = '';
    if (query.length === 0) {
        searchSuggestions.classList.add('hidden');
        return;
    }

    const matches = state.allTimezones.filter(tz =>
        tz.label.toLowerCase().includes(query) ||
        tz.timezone.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
        matches.forEach(tz => {
            const li = document.createElement('li');
            li.textContent = tz.label;
            li.addEventListener('click', () => {
                document.getElementById('timezoneSelect').value = tz.timezone;
                document.getElementById('searchInput').value = tz.label;
                searchSuggestions.classList.add('hidden');
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

function addTimezone() {
    const timezoneSelect = document.getElementById('timezoneSelect');
    const customLabel = document.getElementById('customLabel');
    const selectedTimezone = timezoneSelect.value;
    if (!selectedTimezone) {
        alert('Please select a timezone');
        return;
    }
    const timezoneData = state.allTimezones.find(tz => tz.timezone === selectedTimezone);
    const label = customLabel.value || timezoneData.label;

    const newTimezone = {
        id: Date.now().toString(),
        timezone: selectedTimezone,
        label: label
    };
    state.timezones.push(newTimezone);
    saveSettings();
    renderClocks();
    closeModalHandler();
}

function openModal() {
    document.getElementById('timezoneModal').classList.add('show');
}

function closeModalHandler() {
    document.getElementById('timezoneModal').classList.remove('show');
    document.getElementById('searchInput').value = '';
    document.getElementById('customLabel').value = '';
    document.getElementById('timezoneSelect').value = '';
    filterTimezones();
}

function resetToDefault() {
    if (confirm('Are you sure you want to reset to default settings?')) {
        localStorage.removeItem('timezones');
        state.timezones = [...defaultTimezones];
        renderClocks();
    }
}

function toggleTheme(event) {
    if (!document.startViewTransition) {
        document.body.classList.toggle('light-mode');
        updateThemeIcon(document.body.classList.contains('light-mode'));
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        return;
    }
    const x = event ? event.clientX : window.innerWidth / 2;
    const y = event ? event.clientY : window.innerHeight / 2;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
        document.body.classList.toggle('light-mode');
        updateThemeIcon(document.body.classList.contains('light-mode'));
    });

    transition.ready.then(() => {
        const isLight = document.body.classList.contains('light-mode');
        document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
            { duration: 500, easing: 'ease-in', pseudoElement: isLight ? '::view-transition-new(root)' : '::view-transition-old(root)' }
        );
    });
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

// --- Initialization ---

async function init() {
    console.log('init() called');
    initDOM();
    await initTimezones();
    populateTimezoneSelect();
    loadSettings();
    initTheme();

    // Listeners
    document.getElementById('addTimezoneBtn').addEventListener('click', openModal);
    document.getElementById('closeModal').addEventListener('click', closeModalHandler);
    document.getElementById('timezoneModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('timezoneModal')) closeModalHandler();
    });
    document.getElementById('searchInput').addEventListener('input', filterTimezones);

    // Search suggestions outside click
    document.addEventListener('click', (e) => {
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (e.target !== searchInput && e.target !== searchSuggestions) {
            if (searchSuggestions && !searchSuggestions.classList.contains('hidden')) {
                searchSuggestions.classList.add('hidden');
            }
        }
    });

    document.getElementById('addTimezoneSubmit').addEventListener('click', addTimezone);
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

    // Time Travel
    document.getElementById('timeTravelSlider').addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        setGlobalOffset(val);
        const sign = val >= 0 ? '+' : '';
        document.getElementById('timeOffsetLabel').textContent = `${sign}${val}h`;
        updateAllClocks();
    });

    document.getElementById('resetTimeBtn').addEventListener('click', () => {
        setGlobalOffset(0);
        document.getElementById('timeTravelSlider').value = 0;
        document.getElementById('timeOffsetLabel').textContent = '+0h';
        updateAllClocks();
    });

    const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', resetToDefault);
    }

    renderClocks();

    if (state.updateInterval) clearInterval(state.updateInterval);
    state.updateInterval = setInterval(updateAllClocks, 1000);
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}