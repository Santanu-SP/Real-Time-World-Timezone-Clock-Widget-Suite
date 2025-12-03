// src/data.js
import { TIMEZONE_PER_COUNTRY, fetchTimezoneData } from './timezone-data.js';
import { state } from './state.js';

export const defaultTimezones = [
    { id: '1', timezone: 'America/New_York', label: 'New York' },
    { id: '2', timezone: 'Europe/London', label: 'London' },
    { id: '3', timezone: 'Asia/Tokyo', label: 'Tokyo' },
    { id: '4', timezone: 'Australia/Sydney', label: 'Sydney' },
];

export async function initTimezones() {
    if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {

        // Fetch data first
        await fetchTimezoneData();

        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

        state.allTimezones = Intl.supportedValuesOf('timeZone').map(tz => {
            const parts = tz.split('/');
            let label = parts[parts.length - 1].replace(/_/g, ' ');
            let countryName = '';

            // Using the object imported from config or global
            if (TIMEZONE_PER_COUNTRY) {
                for (const [code, zones] of Object.entries(TIMEZONE_PER_COUNTRY)) {
                    if (code === 'ALL') continue;
                    // Handle potential nulls in data
                    if (!zones) continue;

                    if (zones.includes(tz)) {
                        try {
                            countryName = regionNames.of(code);
                        } catch (e) {
                            countryName = code;
                        }
                        break;
                    }
                }
            }

            if (countryName) {
                label = `${label}, ${countryName} `;
            }

            return { timezone: tz, label: label, country: countryName };
        });
    } else {
        console.warn('Intl.supportedValuesOf not supported, falling back to defaults');
        state.allTimezones = [...defaultTimezones];
    }
}