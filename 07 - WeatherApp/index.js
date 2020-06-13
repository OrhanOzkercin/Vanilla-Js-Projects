const container = document.querySelector('.container');
const cityInput = document.getElementById('city');
const submitButton = document.querySelector('button');
const weatherInfo = document.getElementById('weather-info');
const weatherImage = document.createElement('img');
const fetchInfo = (cityName) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=77607a55db7537a1daa9e3faccc61da0&units=metric`
  );
};

const showData = () => {
  const h1 = weatherInfo.querySelector('h1');
  const h2Datas = weatherInfo.querySelectorAll('h2');
  if (!cityInput.value) {
    weatherInfo.classList = 'unvisible';
    alert('Lütfen geçerli bir şehir ismi girin!');
    return;
  } else {
    weatherInfo.insertAdjacentElement('afterbegin', weatherImage);
    fetchInfo(cityInput.value)
      .then((res) => res.json())
      .then((data) => {
        weatherImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherInfo.classList = '';
        h1.innerText = `${data.main.temp.toFixed(0)} °C`;
        h2Datas[0].innerText = `${data.main.humidity} % Humidity`;
        h2Datas[1].innerText = `${data.weather[0].description.toUpperCase()}`;
      });

    weatherImage.src = `https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif`;
  }
};
console.log(submitButton);
submitButton.addEventListener('click', showData);
