import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTemperatureFull, faTemperatureArrowDown, faTemperatureArrowUp, faEye, faWater } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=952dabd57f952e5bd2486c49693bf61c`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      setLocation('');
    }
  };


  return (
    <section className="weather-app">
      <div className="container">
        <div className="search-bar">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text"
          />
        </div>
        {Object.keys(data).length > 0 && (
          <div className="general-info">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <p>{data.main.temp.toFixed()}°F</p> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        )}
        {Object.keys(data).length > 0 && (
          <div className="info-boxes">
            <div className="box" id="feels-like">
              <h3>Feels Like <FontAwesomeIcon icon={faTemperatureFull} color="#FFFFFF" /> </h3>
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className="box" id="humidity">
              <h3>Humidity <FontAwesomeIcon icon={faWater} color="#FFFFFF" /></h3>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
            </div>
            <div className="box" id="wind">
              <h3>Wind Speed <FontAwesomeIcon icon={faWind} color="#FFFFFF" /></h3>
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
            <div className="box" id="temp-min">
              <h3>Temp-Min <FontAwesomeIcon icon={faTemperatureArrowDown} color="#FFFFFF" /></h3>
              {data.main ? <p>{data.main.temp_min.toFixed()}°F</p> : null}
            </div>
            <div className="box" id="temp-max">
              <h3>Temp-Max <FontAwesomeIcon icon={faTemperatureArrowUp} color="#FFFFFF" /></h3>
              {data.main ? <p>{data.main.temp_max.toFixed()}°F</p> : null}
            </div>
            <div className="box" id="visibility">
              <h3>Visibility <FontAwesomeIcon icon={faEye} color="#FFFFFF" /></h3>
              {data.visibility ? <p>{data.visibility / 1000}km</p> : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
