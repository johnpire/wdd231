const currentTemp = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#graphic');
const captionDesc = document.querySelector('#description');
const town = document.querySelector('#town');
const url = '//api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=e4ce4e672334afee506ac93437432856';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}°C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  town.innerHTML = data.name;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}

apiFetch();