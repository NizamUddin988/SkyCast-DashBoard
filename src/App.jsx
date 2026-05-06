// SkyCast-Dashboard


import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [city, setCity] = useState('Kolar')
  const [darkMode, setDarkMode] = useState(false)
  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  useEffect(() => {
    axios
      .get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&hours=6`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [city])

  return (
    <div className="app-wrapper">
       {/* nav */}
      <nav className="weather-nav">
        <a className="navbar-brand" href="#">
          <i className="fas fa-cloud-sun"></i>
          <span>WeatherNow</span>
        </a>
        <div className="nav-right">
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}> <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </nav>

      {data && (
        <div className="weather-main">
          <div className="temp-block">
            <span className="temp-big">{parseInt(data.current.temp_c)}°C</span>
            <span className="temp-sep">|</span>
            <span className="temp-f">{parseInt((data.current.temp_c * 9) / 5 + 32)}°F</span>
          </div>
          <div className="city-name">{data.location.name}</div>
          <div className="date-condition">
            {new Date(data.location.localtime).toLocaleString('en-US', {
              weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true,
            })}
          </div>
          <div className="stats">
            <span>💧 {data.current.precip_mm} mm</span>
            <span>💦 {data.current.humidity}%</span>
            <span>💨 {data.current.wind_kph} km/h</span>
          </div>
        </div>
      )}

      {data && (
        <div className="forecast-container">
          {data.forecast.forecastday[0].hour.slice(0, 6).map((hour, index) => (
            <div key={index} className="forecast-card">
              <p>{hour.time.split(' ')[1]}</p>
              <img src={hour.condition.icon} alt={hour.condition.text} width="40" />
              <p>{hour.condition.text}</p>
              <p>{parseInt(hour.temp_c)}°C</p>
            </div>
          ))}
        </div>
      )}

      <footer>@Weather 2025</footer>
    </div>
  )
}

export default App
