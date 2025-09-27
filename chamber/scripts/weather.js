// Current Weather
const tempCurrent = document.querySelector('#temp-current');
const tempHigh = document.querySelector('#temp-high');
const tempLow = document.querySelector('#temp-low');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const weatherIcon = document.querySelector('#graphic');
const captionDesc = document.querySelector('#description');
// Weather Forecast
const tempToday = document.querySelector('#today');
const tempTomorow = document.querySelector('#tomorrow')
const tempOvermorrow = document.querySelector('#overmorrow')

let lat = 60.16992335251783;
let long = 24.928012679576764;
const urlWeatherCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=e4ce4e672334afee506ac93437432856`;
const urlWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=e4ce4e672334afee506ac93437432856`;

async function apiFetch(url, func) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (typeof func === "function") {
        func(data);
      }
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayWeatherCurrent(data) {
  // Weather Icon
  const iconsrc = `https://openweathermap.org/img/wn/10d@2x.png`;
  weatherIcon.setAttribute('src', iconsrc);
  let desc = data.weather[0].description; 
  weatherIcon.setAttribute('alt', desc);

  // Weather Details
  tempCurrent.innerHTML = `${data.main.temp}°C`;
  tempToday.innerHTML = `Today: <b>${data.main.temp}°C</b>`; // This is for WeatherForecast
  captionDesc.textContent = `${capitalizeFirstLetters(desc)}`;
  tempHigh.innerHTML = `High: ${data.main.temp_max}°`
  tempLow.innerHTML = `Low: ${data.main.temp_min}°`
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`

  // Sunrise/Sunset in accordance to the city's timezone
  const sunriseTime = new Date(data.sys.sunrise * 1000);
  const sunsetTime = new Date(data.sys.sunset * 1000);
  const timeConfig = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/Helsinki"
  };

  sunrise.innerHTML = `Sunrise: ${sunriseTime.toLocaleTimeString("en-US", timeConfig)}`
  sunset.innerHTML = `Sunset: ${sunsetTime.toLocaleTimeString("en-US", timeConfig)}`
}

function displayWeatherForecast(data) {
  let startIndex = 8;

  const startingForecast = data.list[startIndex];
  const startingTime = startingForecast.dt_txt.split(' ')[1] // HH:MM:SS
  const startingHour = parseInt(startingTime.split(':')[0]); // get only the 'hour' as number

  // Apply my formula: ((currentHour - 12) / 3) * -1: this will always return the exact number on how many indexes away the startIndex is from the index where the time is noon
  const jumpsNeeded = ((startingHour - 12) / 3) * -1;
  const tomorrowIndex = startIndex + jumpsNeeded;
  // get the day after tomorrow
  const overmorrowIndex = tomorrowIndex + 8;

  const tomorrowNoonTemp = data.list[tomorrowIndex].main.temp;
  const overmorrowNoonTemp = data.list[overmorrowIndex].main.temp;

  // get day names
  const tomorrowDateStr = data.list[tomorrowIndex].dt_txt.split(' ')[0];
  const overmorrowDateStr = data.list[overmorrowIndex].dt_txt.split(' ')[0];

  // convert to date then get day names
  const tomorrowDate = new Date(tomorrowDateStr + 'T12:00:00Z')
  const overmorrowDate = new Date(overmorrowDateStr + 'T12:00:00Z')

  const tomorrowDayName = tomorrowDate.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'Europe/Helsinki'
  });

   const overmorrowDayName = overmorrowDate.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'Europe/Helsinki'
  });


  tempTomorow.innerHTML = `${tomorrowDayName}: <b>${tomorrowNoonTemp}°C</b>`
  tempOvermorrow.innerHTML = `${overmorrowDayName}: <b>${overmorrowNoonTemp}°C</b>`
}

function capitalizeFirstLetters(str) {
  let words = str.split(" ")
  for (let i in words) {
    let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  return words.join(" ")
}

apiFetch(urlWeatherCurrent, displayWeatherCurrent);
apiFetch(urlWeatherForecast, displayWeatherForecast);
