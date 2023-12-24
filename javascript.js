document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '179a85928546c2d7edd22f8253ef9fab'; // Replace with your OpenWeatherMap API key
    const form = document.getElementById('location-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const city = document.getElementById('city').value;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
});

function displayWeather(data) {

    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const icon = document.getElementById('icon');
    const dateandTime =document.getElementById('date_time');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    dateandTime.textContent = 'Date and Time: ' + currentDate.toLocaleDateString('en-US', options);

    location.textContent = data.name + ', ' + data.sys.country;
    temperature.textContent = 'Temperature: ' + (data.main.temp - 273.15).toFixed(2) + '°C';
    description.textContent = 'Description: ' + data.weather[0].description;
    icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" style="width:150px;height:150px;border-radius: 50%;">`;
}
