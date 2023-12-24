"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [winput, setwinput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [container, setcontainer] = useState("105");
  const [errorclasses, seterrorclasses] = useState("");
  const APIKey = 'c4f983eeacd7b8775371fc019f8d0cdd';
  const getIcon=()=>
  {
    switch (weatherData.weather[0].main) {
      case 'Clear':
         return 'images/clear.png';
          break;

      case 'Rain':
         return 'images/rain.png';
          break;

      case 'Snow':
         return 'images/snow.png';
          break;

      case 'Clouds':
         return 'images/cloud.png';
          break;

      case 'Haze':
         return 'images/mist.png';
          break;

      default:
         return '';
  }
  }
  const fetchWeatherData = async () => {
   
    if (winput === '') return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${winput}&appid=${APIKey}`
      );
      setWeatherData(response.data);
      console.log(response.data);
      setError(null);
      setcontainer("605")
    } catch (error) {
      setWeatherData(null);
      seterrorclasses("d-block fadeIn");
      setError('OPS invalid Location 🤷‍♂️');
      setcontainer("350")
    }
    
  };

  return (
    <>
      <div className="container" style={{ height: `${container}px` }}>
        <div className="search-bar">
          <i className="fa fa-map-marker"></i>
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setwinput(e.target.value)}
          ></input>
          <button className="fa fa-search" onClick={fetchWeatherData}></button>
        </div>
        
          <>
        <div className={`not-found${errorclasses}`}>
          {error && 
          ( <> <img className='not-found-img' src="/not-found.png" alt="Not Found"></img>
          <p className='not-foundp'>{error}</p></> )}
              </div>
            </>
        
      
         
        {weatherData && (
          <>
            <div className="weather-box fadeIn">
              <img className='weather-box-img' src={getIcon()} alt="Weather Icon"></img>
              
              <p className="temperature">{Math.round((weatherData.main.temp - 273.15))}°C</p>
              <p className="description">{weatherData.weather.description}</p>
            </div>
            <div className="weather-details fadeIn">
              <div className="humidity">
                <i className="fa fa-tint weather-details-i"></i>
                <span className='weather-details-span'>{weatherData.main.humidity}%</span>
                <p className='weather-details-p'>Humidity</p>
              </div>
              <div className="wind">
                <i className="fa fa-leaf weather-details-i"></i>
                <span className='weather-details-span'>{weatherData.wind.speed}Km/h</span>
                <p className='weather-details-p'>Wind Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
