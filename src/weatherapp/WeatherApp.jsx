import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import humidity_icon from "../Assests/humidity.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";

export default function WeatherApp() {
  let apikey = "29db7d8ea75c2f262beff9a578fe4add";
  const [wicon, setwicon] = useState(cloud_icon);

  const search = () => {
    let element = document.getElementsByClassName("search-bar");
    if (element[0].value == "") return 0;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apikey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => renderWeather(data))
      .catch(() => {
        element[0].value = "";
      });
  };
  const renderWeather = (data) => {
    let temperature = document.getElementsByClassName("temperature");
    let city = document.getElementsByClassName("location");
    let humidity = document.getElementsByClassName("humidity-val");
    let wind = document.getElementsByClassName("wind-val");
    wind[0].innerHTML = `${data.wind.speed} km/h`;
    temperature[0].innerHTML = `${data.main.temp} &deg;c`;
    city[0].innerHTML = data.name;
    humidity[0].innerHTML = `${data.main.humidity}%`;
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setwicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setwicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n" ||
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setwicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n" ||
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setwicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setwicon(snow_icon);
    } else {
      setwicon(clear_icon);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="search-bar" placeholder="Search" />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="search" />
          </div>
        </div>
        <div className="weather-status">
          <div className="weather-icon">
            <img src={wicon} alt="weather_status" />
          </div>
          <div className="temperature">15&deg;c </div>
          <div className="location">Banglore</div>
        </div>
        <div className="data-container ">
          <div className="element ">
            <img src={humidity_icon} alt="humidity" />
            <div className="data">
              <div className="humidity-val">87%</div>
              <div>Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="humidity" />
            <div className="data">
              <div className="wind-val">18km/h</div>
              <div>Wind</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
