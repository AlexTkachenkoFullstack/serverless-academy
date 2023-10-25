const axios = require("axios");
const formatDate = require("../utils/formatDate");
const windDirection=require('../utils/windDirection')
const API_KEY = "YOUR API_KEY";
const LATITUDE = 50.376289;
const LONGITUDE = -4.143841;

async function fetchWeather() {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
    );
    const weather = response.data.list.map((item) => {
      const date = formatDate(item.dt);
      const temp = Math.round(item.main.temp) + "\u00B0C";
      const clouds = item.clouds.all + "%";
      const windSpeed = item.wind.speed + "m/s";
      const weatherParams = item.weather[0].main;
      const weatherDesc = item.weather[0].description;
      return `${date},${temp}, ${clouds}, ${windSpeed},${weatherDesc},${weatherParams}`;
    });
    return weather;
  }

  async function fetchWind() {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
    );
    const windNow=response.data.wind;
    console.log(typeof windNow.deg)
    return `Speed ​​change rate -${windNow.speed} meter/sec, wind gust - ${windNow.gust}meter/sec, direction-${windDirection(windNow.deg)}`
  }
  
  module.exports={fetchWeather, fetchWind}