import React, { useEffect, useState } from "react";
import WeatherCard from "../weather/WeatherCard";
import axios from "axios";
import "./Style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Lucknow");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=fdd1ea6d0cb232affceeef08b4d7481b`;
      const data = await axios.get(url);

      const { temp, humidity, pressure } = data.data.main;
      const { main: weathermood } = data.data.weather[0];
      const { name } = data.data;
      const { speed } = data.data.wind;
      const { country, sunset } = data.data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
      <h1 style={{color:"white"}}>Weather Application</h1>
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      {/*  our temp card */}
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
