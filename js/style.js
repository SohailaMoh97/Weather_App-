const search_input = document.querySelector('#search');
const current_Date = document.querySelector('#current_Date');
const current_Day = document.querySelector('#current_Day');
const city = document.querySelector('#city');
const current_max_temp = document.querySelector('#current_max_temp');
const status_img = document.querySelector('#status_img');

const humidity = document.querySelector('#humidity');
const wind_kph = document.querySelector('#wind_kph');
const wind_dir = document.querySelector('#wind_dir');

const nextDay = document.querySelector('#nextDay');
const nextDay_icon = document.querySelector('#nextDay_icon');
const next_max_temp = document.querySelector('#next_max_temp');
const next_min_temp = document.querySelector('#next_min_temp');
const next_status = document.querySelector('#next_status');

const afterNextDay = document.querySelector('#afterNextDay');
const afterNextDay_icon = document.querySelector('#afterNextDay_icon');
const afterNext_max_temp = document.querySelector('#afterNext_max_temp');
const afterNext_min_temp = document.querySelector('#afterNext_min_temp');  
const afterNext_status = document.querySelector('#afterNext_status');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let currentDayIndex = new Date().getDay();
let currentMonthIndex = new Date().getMonth();
let currentDate = new Date().getDate();

search_input.addEventListener("keyup", function(){
    fetchApi(search_input.value);
});

async function fetchApi(cityName) {
  try {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=04995eb437324c17844195529241710&q=${cityName}&days=3`);
    let res = await data.json();
    displayCurrent(res.current, res.location.name);  
    displayNextDay(res.forecast.forecastday[1]);  
    displayAfterNext(res.forecast.forecastday[2]);
    console.log(res);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

fetchApi("Cairo");

function displayCurrent(current, cityName) {
  let box = `
    <div class="card">
      <div class="card-header p-0 px-2">
        <div class="d-flex justify-content-between align-items-center pt-1">
          <p id="current_day">${days[currentDayIndex]}</p>
          <p id="current_Date">${currentDate} ${months[currentMonthIndex]}</p>
        </div>
      </div>
      <div class="card-body pb-4">
        <span id="city">${cityName}</span>
        <div class="d-flex mb-3">
          <h2 class="text-white me-5" id="current_max_temp">
            ${current.temp_c}<sup>o</sup>C
          </h2>
          <img
            src=${current.condition.icon}
            class="w-25"
            alt="status image"
            id="status_img"
          />
        </div>
        <span class="custom" id="current_status">${current.condition.text}</span>
        <div class="d-flex my-3">
          <div class="flex">
            <img src="images/icon-umberella.png" class="me-1" alt="humidity icon" />
            <span id="humidity">${current.humidity}%</span>
          </div>
          <div class="flex mx-3">
            <img src="images/icon-wind.png" class="me-1" alt="wind speed icon" />
            <span id="wind_kph">${current.wind_kph} km/h</span>
          </div>
          <div class="flex">
            <img src="images/icon-compass.png" class="me-1" alt="wind direction icon" />
            <span id="wind_dir">${current.wind_dir}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.querySelector("#currentCard").innerHTML = box;
}

function displayNextDay(nextDayObj) {
    let dayIndex = new Date(nextDayObj.date).getDay();

    let box = `
    <div class="card sec_card">
      <div class="card-header p-0 px-2 pt-1">
        <div class="d-flex justify-content-center">
          <p id="nextDay">${days[dayIndex]}</p>
        </div>
      </div>
      <div class="card-body py-5">
        <div class="d-flex flex-column align-items-center">
          <img
            id="nextDay_icon"
            src=${nextDayObj.day.condition.icon}
            class="img-fluid mb-3"
            alt="Weather icon"
          />
          <h4 class="text-white" id="next_max_temp">${nextDayObj.day.maxtemp_c}<sup>o</sup>C</h4>
          <span class="text-white" id="next_min_temp">
            ${nextDayObj.day.mintemp_c}<sup>o</sup>
          </span>
          <span class="custom mt-4" id="next_status">${nextDayObj.day.condition.text}</span>
        </div>
      </div>
    </div>
    `;
    document.querySelector("#nextDay_card").innerHTML = box;
}

function displayAfterNext(afterNextObj) {
    let dayIndex = new Date(afterNextObj.date).getDay();
    
    let box = `
     <div class="card">
       <div class="card-header p-0 px-2 pt-1">
         <div class="d-flex justify-content-center">
           <p class="afterNextDay">${days[dayIndex]}</p>
         </div>
       </div>
       <div class="card-body py-5">
         <div class="d-flex flex-column align-items-center">
           <img
             id="afterNextDay_icon"
             src=${afterNextObj.day.condition.icon}
             class="img-fluid mb-3"
             alt="Weather icon"
           />
           <h4 class="text-white" id="afterNext_max_temp">
             ${afterNextObj.day.maxtemp_c}<sup>o</sup>C
           </h4>
           <span class="text-white" id="afterNext_min_temp">
             ${afterNextObj.day.mintemp_c}<sup>o</sup>
           </span>
           <span class="custom mt-4" id="afterNext_status">
             ${afterNextObj.day.condition.text}
           </span>
         </div>
       </div>
     </div>
    `;
    
    document.querySelector("#afterNextDay_card").innerHTML = box;
 }
 
