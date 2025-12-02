# Real-Time World Timezone Clock Widget Suite

A modern, feature-rich web application for tracking time and weather across multiple timezones in real-time. This suite offers a visually appealing interface with dark/light mode support, analog and digital clocks, and time travel capabilities.

## Features

-   **Real-Time Global Time Tracking**: Accurate time display for cities worldwide, adjusted for daylight saving time.
-   **Dual Clock Views**: Switch between Digital (24-hour) and Analog clock faces for each timezone.
-   **Weather Integration**: Real-time weather updates (temperature and condition) for each tracked city using the OpenWeatherMap API.
-   **Time Travel Mode**: A slider to offset the global time by +/- 24 hours to plan meetings or visualize time differences.
-   **Dynamic Theming**:
    -   **Dark/Light Mode**: Toggle between themes with a smooth, circular view transition effect.
    -   **Time of Day Styling**: Cards dynamically update styles and icons based on the local time (Morning, Afternoon, Evening, Night).
-   **Comparison with India**: Each card shows the time difference relative to Indian Standard Time (IST/Asia/Kolkata).
-   **Customization**:
    -   **Add Timezones**: Searchable dropdown with auto-complete to add new cities.
    -   **Custom Labels**: Rename locations (e.g., "Home", "Office") for better organization.
    -   **Persistence**: User settings (selected timezones, theme preference) are saved to `localStorage`.
-   **Responsive Design**: Fully responsive layout that works seamlessly on desktops, tablets, and mobile devices.

## Technologies Used

-   **HTML5**: Semantic structure.
-   **CSS3**: Modern styling with CSS Variables, Flexbox, Grid, and Animations.
-   **JavaScript (ES6+)**: Core logic, DOM manipulation, and API integration.
-   **OpenWeatherMap API**: For fetching real-time weather data.
-   **LocalStorage API**: For persisting user preferences.
-   **Intl.DateTimeFormat**: For robust and accurate timezone handling.

## Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd Real-Time-World-Timezone-Clock-Widget-Suite
    ```

2.  **Configure API Key**:
    -   This project uses OpenWeatherMap for weather data.
    -   Rename `config.example.js` to `config.js`.
    -   Open `config.js` and replace `'YOUR_API_KEY_HERE'` with your actual OpenWeatherMap API key.

    ```javascript
    // config.js
    const CONFIG = {
        WEATHER_API_KEY: 'your_actual_api_key_starts_with_...'
    };
    ```

3.  **Run the Application**:
    -   Simply open `index.html` in your modern web browser.
    -   No build step or server is strictly required for local testing, though using a local server (like Live Server in VS Code) is recommended to avoid CORS issues with some browser configurations.

## Usage

-   **Adding a Clock**: Click the "Add Timezone" button, search for a city, optionally give it a label, and click "Add".
-   **Removing a Clock**: Click the "Remove" button on any clock card.
-   **Switching Views**: Click "Show Analog" / "Show Digital" to toggle the clock face.
-   **Time Travel**: Drag the slider at the top to shift time forward or backward. Click the reset icon to return to "Now".
-   **Reset**: Click the red reset icon in the header to clear all custom timezones and restore defaults.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.