// src/timezone-data.js
export let TIMEZONE_PER_COUNTRY = {};

export async function fetchTimezoneData() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/riamaria/d08b352bc671f6615bd9/raw/timezones-per-country.json');
        if (!response.ok) throw new Error('Failed to fetch timezone data');
        TIMEZONE_PER_COUNTRY = await response.json();

        // Manual fix for India if missing in the source or needs alias
        if (TIMEZONE_PER_COUNTRY["IN"]) {
            if (!TIMEZONE_PER_COUNTRY["IN"].includes("Asia/Calcutta")) {
                TIMEZONE_PER_COUNTRY["IN"].push("Asia/Calcutta");
            }
        } else {
            // Fallback if IN is missing entirely
            TIMEZONE_PER_COUNTRY["IN"] = ["Asia/Kolkata", "Asia/Calcutta"];
        }

        console.log('Timezone data fetched successfully');
    } catch (error) {
        console.error('Error fetching timezone data:', error);
        // Fallback to empty or minimal set if needed, but for now we log
        TIMEZONE_PER_COUNTRY = {};
    }
}
