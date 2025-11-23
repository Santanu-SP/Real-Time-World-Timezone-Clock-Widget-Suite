        const timezones = [
            // Your initial list (100 total entries)
            { id: '1', timezone: 'America/New_York', label: 'New York' },
            { id: '2', timezone: 'Europe/London', label: 'London' },
            { id: '3', timezone: 'Asia/Tokyo', label: 'Tokyo' },
            { id: '4', timezone: 'Australia/Sydney', label: 'Sydney' },
            { id: '5', timezone: 'Asia/Kolkata', label: 'Mumbai' },

            // North America (Cont.)
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

            // South America
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

            // Europe
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
            
            // Africa
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
            
            // Asia & Middle East
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

            // Australia & Pacific
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
            
            // Russian Zones (Major)
            { id: '93', timezone: 'Asia/Yekaterinburg', label: 'Yekaterinburg' },
            { id: '94', timezone: 'Asia/Novosibirsk', label: 'Novosibirsk' },
            { id: '95', timezone: 'Asia/Vladivostok', label: 'Vladivostok' },

            // Special & Canonical
            { id: '96', timezone: 'Etc/UTC', label: 'Coordinated Universal Time (UTC)' },
            { id: '97', timezone: 'Etc/GMT', label: 'Greenwich Mean Time (GMT)' },
            { id: '98', timezone: 'Atlantic/Reykjavik', label: 'Reykjavík, Iceland' },
            { id: '99', timezone: 'Indian/Maldives', label: 'Maldives' },
            { id: '100', timezone: 'Antarctica/Casey', label: 'Casey Station, Antarctica' }
        ];

        const clocksContainer = document.getElementById('clocksContainer');
        // REPLACED: activeTimezones and updateInterval were missing from the user's latest snippet.
        // They must be defined globally for the other functions to use them.
        let activeTimezones = [];
        let updateInterval = null;

        /**
         * @returns {Array<Object>} A subset of the most common and important timezones.
         */
        function getDefaultTimezones() {
            console.log("Retrieving default timezones.");
            // Select a small, representative sample of major global hubs and UTC
            const defaultTimezoneIDs = ['1', '2', '3', '5', '8', '67', '96']; // NY, London, Tokyo, Mumbai, LA, Dubai, UTC
            
            // CORRECTED: Ensure we filter the 'timezones' array, which is the constant defined above.
            return timezones.filter(tz => defaultTimezoneIDs.includes(tz.id));
        }

        /**
         * Converts the current time to a specific timezone string and returns a Date object
         * representing the time in that zone (for easy hour/minute extraction).
         * @param {string} timezone - The IANA timezone string (e.g., 'America/New_York').
         * @returns {Date} A Date object normalized to the target time.
         */
        function getTimeInTimezone(timezone) {
            const now = new Date();

            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            });
            
            // This is a robust way to get the time parts respecting the timezone.
            const parts = formatter.formatToParts(now);
            const timeString = parts.map(p => p.type === 'literal' ? ':' : p.value).join('');
            
            // We create a Date object using a dummy date and the extracted time string.
            // This allows easy extraction of hours/minutes/seconds using Date methods.
            return new Date(`2000-01-01T${timeString}`); 
        }

        /**
         * Generates the SVG for an analog clock face with moving hands.
         * @param {number} hours - Current hour (0-23).
         * @param {number} minutes - Current minute (0-59).
         * @param {number} seconds - Current second (0-59).
         * @returns {string} The HTML SVG string.
         */
        function createAnalogClockSVG(hours, minutes, seconds) {
            // Calculations for hand rotation (0 degrees is 12/60/0 position)
            const secondAngle = (seconds * 6) - 90; // 6 degrees per second
            const minuteAngle = (minutes * 6 + seconds * 0.1) - 90; // 6 degrees per minute + fraction from seconds
            const hourAngle = ((hours % 12) * 30 + minutes * 0.5) - 90; // 30 degrees per hour + fraction from minutes
            
            let svg = `<svg width="160" height="160" viewBox="0 0 160 160">`;
            
            // Center point is (80, 80)
            const cx = 80, cy = 80;

            // Hour hand (short, thick)
            const hourLen = 40;
            const hourRad = hourAngle * Math.PI / 180;
            const hourX = cx + Math.cos(hourRad) * hourLen;
            const hourY = cy + Math.sin(hourRad) * hourLen;
            svg += `<line x1="${cx}" y1="${cy}" x2="${hourX}" y2="${hourY}" stroke="white" stroke-width="6" stroke-linecap="round"/>`;
            
            // Minute hand (long, medium)
            const minuteLen = 60;
            const minuteRad = minuteAngle * Math.PI / 180;
            const minuteX = cx + Math.cos(minuteRad) * minuteLen;
            const minuteY = cy + Math.sin(minuteRad) * minuteLen;
            svg += `<line x1="${cx}" y1="${cy}" x2="${minuteX}" y2="${minuteY}" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"/>`;
            
            // Second hand (thin, red) - Make it slightly longer
            const secondLen = 70; 
            const secondRad = secondAngle * Math.PI / 180;
            const secondX = cx + Math.cos(secondRad) * secondLen;
            const secondY = cy + Math.sin(secondRad) * secondLen;
            svg += `<line x1="${cx}" y1="${cy}" x2="${secondX}" y2="${secondY}" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>`;
            
            // Center pin
            svg += `<circle cx="${cx}" cy="${cy}" r="4" fill="#ef4444"/>`; 
            
            svg += `</svg>`;
            return svg;
        }


        /**
         * Creates the HTML element for a single clock card.
         * @param {Object} tz - Timezone object { id, timezone, label }.
         * @returns {HTMLElement} The clock card div.
         */
        function createClockCard(tz) {
            const card = document.createElement('div');
            card.className = 'clock-card';
            card.setAttribute('data-id', tz.id);
            
            const localTime = getTimeInTimezone(tz.timezone);
            const hours = localTime.getHours();
            const minutes = localTime.getMinutes();
            const seconds = localTime.getSeconds();

            // Display time in 24-hour format
            const time24 = localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            
            card.innerHTML = `
                <div class="clock-header"><h3>${tz.label}</h3></div>
                <div class="clock-display">
                    <div class="digital-clock time-24">${time24}</div>
                    <div class="analog-clock">
                        ${createAnalogClockSVG(hours, minutes, seconds)}
                    </div>
                </div>
            `;
            return card;
        }

        /**
         * Renders the clocks for the given timezone array.
         * (This function was missing from your latest snippet and has been restored)
         * @param {Array<Object>} timezonesToDisplay - Array of timezone objects to render.
         */
        function renderClocks(timezonesToDisplay) {
            clocksContainer.innerHTML = ''; // Clear existing clocks
            activeTimezones = timezonesToDisplay;
            activeTimezones.forEach(tz => {
                const card = createClockCard(tz);
                clocksContainer.appendChild(card);
            });
        }

        /**
         * Updates the time display for ALL currently active clocks.
         */
        function updateAllClocks() {
            activeTimezones.forEach(tz => {
                const card = document.querySelector(`[data-id="${tz.id}"]`);
                if (!card) return; 

                const localTime = getTimeInTimezone(tz.timezone);
                const hours = localTime.getHours();
                const minutes = localTime.getMinutes();
                const seconds = localTime.getSeconds();
                
                // Update digital time
                const time24 = localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                const time24El = card.querySelector('.time-24');
                if (time24El) time24El.textContent = time24;
                
                // Update analog clock (re-render SVG)
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
            // Set the initial set of timezones to the default list
            renderClocks(getDefaultTimezones());
            
            // Clear any previous interval and start the clock loop
            if (updateInterval) {
                clearInterval(updateInterval);
            }
            updateInterval = setInterval(updateAllClocks, 1000);

            // Add button event listeners
            document.getElementById('showDefaultBtn').addEventListener('click', () => {
                renderClocks(getDefaultTimezones());
            });

            document.getElementById('showAllBtn').addEventListener('click', () => {
                renderClocks(timezones);
            });
        }

        // Run the application on load
        window.onload = init;