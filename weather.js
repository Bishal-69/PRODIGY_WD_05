document.querySelector('.weather').addEventListener('submit', async function (event) {
    event.preventDefault();

    const apiKey = '321aeeaf01140b98344e307532148886';
    const cityInput = document.querySelector('.Search').value.trim();
    
    if (cityInput === '') {
        displayError('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();

        if (weatherData.cod === 200) {
            updateWeatherDisplay(weatherData);
            document.querySelector('.display').style.display = 'flex';
        } else {
            displayError(weatherData.message);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError('Unable to retrieve weather data. Please try again later.');
    }
});

function updateWeatherDisplay(data) {
    document.querySelector('.citydisplay').innerText = `${data.name}`;
    document.querySelector('.temp').innerText = `${data.main.temp} °C`;
    document.querySelector('.humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.querySelector('.dep').innerText = `${data.weather[0].description}`;
    document.querySelector('.emoji').innerText = getWeatherEmoji(data.weather[0].main);
    document.querySelector('.errordisplay').innerText = ''; // To Clear any previous error
}

function getWeatherEmoji(weather) {
    const weatherEmojis = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️'
    };
    return weatherEmojis[weather];
}

function displayError(message) {
    document.querySelector('.errordisplay').innerText = message;
    document.querySelector('.display').style.display = 'flex';
}
