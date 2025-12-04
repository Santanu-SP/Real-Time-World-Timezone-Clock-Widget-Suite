export default async function handler(request, response) {
    const { city } = request.query;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        return response.status(500).json({ error: 'Server configuration error: API Key missing' });
    }

    if (!city) {
        return response.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if (!weatherResponse.ok) {
            const errorData = await weatherResponse.json();
            return response.status(weatherResponse.status).json({ error: errorData.message || 'Weather fetch failed' });
        }

        const data = await weatherResponse.json();
        return response.status(200).json(data);
    } catch (error) {
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
