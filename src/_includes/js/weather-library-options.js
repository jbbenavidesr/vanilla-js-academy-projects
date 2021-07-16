/**
 * Library to display information about the current weather at the location of
 * the user. It uses geolocation and the weatherbit API, info of this api at:
 * https://www.weatherbit.io/api/weather-current
 * It is a wrapper over the API, so look the documentation for more info about
 * the parameters.
 *
 * This data will display in the element with data-weather.
 *
 * @param {String} apiKey API key
 * @param {Object} options Object of options to add to library.
 * @param {String} [options.template] A template message with the name of the element to be displayed between double curly brackets. Ex: {{city_name}}
 * @param {Boolean} [options.showIcon = true] Wether or not to display the weather icon.
 * @param {String} [options.errorMessage] Message to display to the user in case there is no permission to use location or an error occurs.
 * @param {String} [options.units = "M"] Units to display temperature. M(etric), S(cientific), I(mperial).
 * @param {String} [options.lang = "en"] Language for the response.
 * @param {Object} [options.queryParameters] Parameters to include in the API query.
 *
 */
const localWeather = function (
  apiKey,
  {
    template = "You are currently in {city_name}. The temperature is {temp} degrees and the weather is {description}.",
    showIcon = true,
    errorMessage = "Our monkey was not able to send the information at the moment.. no info for you!",
    units = "M",
    lang = "en",
    queryParameters,
  }
) {
  //check apiKey
  if (!apiKey) {
    throw new Error("No api key was provided!");
  }

  // Variables
  const currentWeather_endpoint = "https://api.weatherbit.io/v2.0/current";

  const app = document.querySelector("[data-weather]");

  // Helper functions

  /**
   * Sanitize and encode all HTML in a user-submitted string
   * https://portswigger.net/web-security/cross-site-scripting/preventing
   * @param  {String} str  The user-submitted string
   * @return {String} str  The sanitized string
   */
  function sanitizeHTML(str) {
    return str
      .replace(/javascript:/gi, "")
      .replace(/[^\w-_. ]/gi, function (c) {
        return `&#${c.charCodeAt(0)};`;
      });
  }

  /**
   * Build a query string from an object of data
   * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Object} data The data to turn into a query string
   * @return {String}      The query string
   */
  function buildQuery(data) {
    return new URLSearchParams(data).toString();
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
    let data = {
      key: apiKey,
      lon: longitude,
      lat: latitude,
      units: units,
      lang: lang,
      ...queryParameters,
    };

    return `${currentWeather_endpoint}?${buildQuery(data)}`;
  }

  // Methods

  function getMessage(weather) {
    let message = template;

    for (let item in weather) {
        message = message.replaceAll(`{${item}}`, (typeof weather[item] === "string") ?
        sanitizeHTML(weather[item]) : weather[item]);
      
    }
    return message;
  }

  /**
   * Render the ui with the message
   *
   * @param {Object} weather response data from api
   */
  function render(weather) {
    weather = {
      ...weather,
      ...weather.weather,
    };

    let imageURL = `https://www.weatherbit.io/static/img/icons/${sanitizeHTML(
      weather.icon
    )}.png`;

    app.innerHTML = `
    ${showIcon ? `<img src ="${imageURL}" alt= "" > ` : ""}
    <p>${getMessage(weather)}</p>
    `;
  }

  /**
   * Fetch the weather data and display it in the app. This function works as the
   * success callback for the geolocation.getCurrentPosition();
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
      if (!response.ok) throw new Error(response);

      // Get JSON
      let data = await response.json();
      if (!data) throw new Error(response);

      render(data.data[0]);
    } catch (error) {
      app.textContent = errorMessage;
      console.warn(error);
    }
  }

  /**
   * Callback if the user doesn't allow the position to show. Ideally it should give
   * fallback functionality, here just says sorry.
   */
  function noPermision(error) {
    app.textContent = errorMessage;

    console.warn(error);
  }

  // Init
  navigator.geolocation.getCurrentPosition(getWeatherData, noPermision);
};

// API KEY--- This should never go here in a real app...
const current_weather_key = "dfe1b7f19e37439f9dee825bad822f31";

let options = {
}

localWeather(current_weather_key, options);
