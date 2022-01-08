/**
 * Library to display information about the current weather at the location of
 * the user. It uses geolocation and the weatherbit API, info of this api at:
 * https://www.weatherbit.io/api/weather-current
 * It is a wrapper over the API, so look the documentation for more info about
 * the parameters.
 *
 * This data will display in the element with data-weather.
 *
 * @param {String} key API key
 * @param {Function} [template] A function with the DOM template to display in the UI. Returns a string.
 *                              This function recieves the response data as the parameter.
 * @param {Boolean} [showIcon = true] Wether or not to display the weather icon.
 * @param {String} [errorMessage] Message to display to the user in case the
 * @param {Object} [queryParameters] Parameters to include in the API query (lang, units, include, etc.).
 *
 */
const localWeather = function (
  key,
  template,
  showIcon = true,
  errorMessage,
  queryParameters
) {
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
      key: key,
      lon: longitude,
      lat: latitude,
      ...queryParameters,
    };

    return `${currentWeather_endpoint}?${buildQuery(data)}`;
  }

  /**
   * Sanitize the response from the API
   *
   * @param {Object} response The data object recieved from the API
   */
  function sanitizeWeatherData(data) {
    let sanitized = {};
    for (let item in data) {
      if (typeof data[item] === "object") {
        sanitized[item] = sanitizeWeatherData(data[item]);
      } else if (typeof data[item] === "string") {
        sanitized[item] = sanitizeHTML(data[item]);
      } else {
        sanitized[item] = data[item];
      }
    }

    return sanitized;
  }

  // Template
  let getTemplate = template ? template : function (weather) {
    let imageURL = `https://www.weatherbit.io/static/img/icons/${weather.weather?.icon}.png`;

    return `${
      showIcon
        ? `<img src="${imageURL}" alt="Icon corresponding to the ${weather.weather?.description.toLowerCase()}" >`
        : ""
    }
    <p>You are currently in ${weather.city_name}. The temperature is ${
      weather.temp
    } degrees 
          and the weather is ${weather.weather?.description.toLowerCase()}.</p>
    `;
  };
  

  // Methods

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
      if (!response) throw new Error(response);

      // Get JSON
      let data = await response.json();
      if (!data) throw new Error(response);

      let weather = sanitizeWeatherData(data.data[0]);

      app.innerHTML = getTemplate(weather);
      
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
    app.textContent = errorMessage ||
      "Our monkey was not able to send the information at the moment.. no info for you!";

    console.warn(error);
  }

  // Init
  navigator.geolocation.getCurrentPosition(getWeatherData, noPermision);
};

// API KEY--- This should never go here in a real app...
const current_weather_key = "dfe1b7f19e37439f9dee825bad822f31";

localWeather(current_weather_key);
