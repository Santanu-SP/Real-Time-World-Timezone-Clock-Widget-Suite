// src/api.js

import { state } from './state.js';

export async function fetchWeather(city, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const now = Date.now();
    if (state.weatherCache[city] && (now - state.weatherCache[city].timestamp < 600000)) {
        updateWeatherUI(elementId, state.weatherCache[city].data);
        return;
    }

    try {
        container.innerHTML = '<span class="weather-loading">Loading weather...</span>';
        // Use the serverless proxy
        const response = await fetch(`/api/weather?city=${city}`);

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") === -1) {
            throw new Error('Weather proxy requires Vercel deployment');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Weather fetch failed');
        }

        const data = await response.json();
        state.weatherCache[city] = { timestamp: now, data: data };
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