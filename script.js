window.addEventListener("load", () => {
    
    const searchCity = document.querySelector('#search');
    const city = document.querySelector('#city');
    const temperature = document.querySelector('#temp');
    const iconImg = document.querySelector('#icon');
    const statusInfo = document.querySelector('#status-info');
    const humiditySpeed = document.querySelector('#humidity');
    const wind = document.querySelector('#wind');
    const cityImg = document.querySelector('#city-img');
    const content = document.querySelector('#content');

    const weatherApp = {
        apiKey : "5ac30503b7dd860c4afcad1b90c00e23",
        fetchWeather: function (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`).then((response) =>{
                if(response.status >= 400 && response.status <= 499){
                    return Promise.reject('Error: ' + response.status)
                }
                return response.json();
            } ).then((data) => this.showWeather(data))
        },

        showWeather: function(data) {
            if(data.cod < 400 ){
                content.style.display = 'flex';
                const { name } = data;
                const { temp, humidity } = data.main;
                const { icon, description } = data.weather[0];
                const { speed } = data.wind;
                city.textContent = name;
                temperature.textContent = `${temp} °C`;
                iconImg.src = `http://openweathermap.org/img/w/${icon}.png`
                statusInfo.textContent = description;
                humiditySpeed.textContent = `Humidity: ${humidity}%`;
                wind.textContent = `Wind Speed: ${speed} km/h`;

                const client_id = "xmBQXD7MeDn0Pe1hWgdgOSx4UK8d_WFhyTbiDSGZJ98"

                fetch(`https://api.unsplash.com/search/photos?query=${name}&client_id=${client_id}`).then((response) =>{
                    return response.json();
                } ).then((data) => {
                    showImg(data.results[0].urls.small_s3)
                })
                function showImg(data){
                    cityImg.src = data;
                }
            } else{
                content.style.display = 'none';
            }
        }   
    }

    searchCity.addEventListener('input', function(){
        weatherApp.fetchWeather(searchCity.value);
    })
});