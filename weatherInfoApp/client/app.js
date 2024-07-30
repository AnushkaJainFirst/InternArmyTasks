document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);
});

function getWeather(city) {
    const url = `/api/weather?city=${city}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            showWeather(data);
        })
        .catch(error => {
            showError(error.message);
        });
}

function showWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <div>City: ${data.name}</div>
        <div>Temperature: ${data.main.temp} °C</div>
        <div>Weather: ${data.weather[0].description}</div>
    `;
}

function showError(message) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `<div style="color: red;">${message}</div>`;
}
