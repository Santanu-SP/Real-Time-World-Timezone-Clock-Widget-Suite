// src/storage.js
import { state } from './state.js';
import { defaultTimezones } from './data.js';

export function saveSettings() {
    localStorage.setItem('timezones', JSON.stringify(state.timezones));
    console.log('Settings saved:', state.timezones);
}

export function loadSettings() {
    const savedTimezones = localStorage.getItem('timezones');
    if (savedTimezones) {
        try {
            state.timezones = JSON.parse(savedTimezones);
            console.log('Settings loaded:', state.timezones);
        } catch (e) {
            console.error('Error parsing saved timezones:', e);
            state.timezones = [...defaultTimezones];
        }
    } else {
        state.timezones = [...defaultTimezones];
        console.log('No saved settings, using defaults');
    }
}