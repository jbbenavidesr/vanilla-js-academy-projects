//
// Variables
//

// Endponts
const current_weather_endpoint = "https://api.weatherbit.io/v2.0/current";

// API KEY--- This should never go here in a real app...
const current_weather_key = "dfe1b7f19e37439f9dee825bad822f31";

const app = document.querySelector("[data-app]");

//
// Functions
//

// Helpers
/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML(str) {
  return str.replace(/javascript:/gi, "").replace(/[^\w-_. ]/gi, function (c) {
    return `&#${c.charCodeAt(0)};`;
  });
}

/**
 * Generates the fetch weather URL for a specific latitude and longitude.
 *
 * @param {Number} latitude The latitude
 * @param {Number} longitude The longitude
 *
 * @return {String} The url to fetch weather data
 */
function weatherURL(latitude, longitude) {
  return `${current_weather_endpoint}?lat=${latitude}&lon=${longitude}&key=${current_weather_key}`;
}

// Rendering
function renderWeather(data) {
  let imageURL = `https://www.weatherbit.io/static/img/icons/${sanitizeHTML(
    data.weather?.icon
  )}.png`;

  app.textContent = `You are currently in ${data.city_name}. The temperature is ${data.temp} degrees 
        and the weather is ${data.weather?.description}.`;

  app.innerHTML += `<img src="${imageURL}" alt="Icon corresponding to the ${sanitizeHTML(
    data.weather?.description
  )}" >`;
}

// Fetch

/**
 * Fetch the weather data and display it in the app. This function works as the
 * success callbac for the geolocation.getCurrentPosition();
 *
 * @param {Geolocation} position The information about the location given by the browser.
 */
async function getWeatherData(position) {
  try {
    // Get position data
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // Fetch weather
    let response = await fetch(weatherURL(lat, lon));
    if (!response) throw new Error(response);

    // Get JSON
    let data = await response.json();
    if (!data) throw new Error(response);

    renderWeather(data.data[0]);

  } catch (error) {
    app.textContent =
      "Our monkey was not able to deliver the information of the weather in your city.";
    console.warn(error);
  }
}

/**
 * Callback if the user doesn't allow the position to show. Ideally it should give
 * fallback functionality, here just says sorry.
 */
function noPermision(error) {
  app.textContent =
    "Our monkey was not able to send the information at the moment.. no info for you!";

  console.warn(error);
}

//
// initializations
//
navigator.geolocation.getCurrentPosition(getWeatherData, noPermision);
