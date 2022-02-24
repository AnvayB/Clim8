import React, {useState} from "react";
import axios from "axios";
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')


  const key = '64be88d0435a2d6eca2e8e9877b67807'
  let url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`
  // https://api.openweathermap.org/data/2.5/weather?q=Milpitas&units=imperial&appid=64be88d0435a2d6eca2e8e9877b67807
 
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">

      <div className="search">
        <input 
          type="text" 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
        />
      </div>

      <div className="container">

        <div className="top">
          <div className="location">
            <p>{data.name}, {data.sys.country}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}ºF</h1> : null}
          </div>

          <div className="report">
            {data.weather ? <p>{data.weather[0].main};</p> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].description.charAt(0).toUpperCase() + 
            data.weather[0].description.slice(1) }</p> : null}
          </div>

          <div className="icon">
            {data.weather ? <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="icon" /> : null}
          </div>
        </div>
{/* ----------------------------------------- */}
        {data.main !== undefined && 
          <div className="bottom">
          <div className="feels">
            <h4>Feels Like</h4>
            {data.main ? <p>{data.main.feels_like.toFixed()}ºF</p> : null}
          </div>

          <div className="humidity">
            <h4>Humidity</h4>
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>

          <div className="wind">
            <h4>Wind Speed</h4>
            {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
          </div>
        </div>
        }
        

      </div>
    </div>
  );
}

export default Weather;