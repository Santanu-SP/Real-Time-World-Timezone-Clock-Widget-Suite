// src/state.js
export const state = {
    allTimezones: [],
    timezones: [],
    globalOffset: 0, // Hours
    weatherCache: {},
    updateInterval: null
};

// Helper to update global offset
export function setGlobalOffset(val) {
    state.globalOffset = val;
}