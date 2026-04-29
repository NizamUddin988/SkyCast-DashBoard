import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [city, setCity] = useState('Kolar')
  const [darkMode, setDarkMode] = useState(false)
  const date = new Date()
  const hour = date.getHours();
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])
  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=c5a2f8d35da340ae8aa102843250912&q=${city}&hours=6`
      )
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.error(err))
  }, [city])

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg weather-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fas fa-cloud-sun weather-icon"></i>
            <span style={{ fontSize: '1.4em' }}>WeatherNow</span>
          </a>

          <div className="collapse navbar-collapse">
            <div className="search-container">
              <form
                className="d-flex position-relative"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="form-control search-input"
                  type="search"
                  placeholder="Search city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn search-btn" type="submit">
                  <i className="fas fa-search" style={{ color: 'white' }}></i>
                </button>
              </form>
            </div>

            <button
              className="theme-toggle"
              title="Toggle theme"
              onClick={() => setDarkMode(!darkMode)}
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Current Weather */}
      {data && (
        <div className="weather-display">
          <h1>
            {parseInt(data.current.temp_c)}
            <sup>
              °C{' '}
              <span style={{ color: '#979797', fontSize: '30px' }}>|</span>{' '}
              {parseInt((data.current.temp_c * 9) / 5 + 32)}°F
            </sup>
          </h1>
          <h2>{data.location.name}</h2>
         <pre> <p>Precipitation: {data.current.precip_mm} mm</p>
  <p>Humidity: {data.current.humidity}%</p>
  <p>Wind: {data.current.wind_kph} km/h</p></pre> 
        </div>
      )}
      {data && (
        <div className="forecast-container">
          {data.forecast.forecastday[0].hour.slice(0, 6).map((hour, index) => (
            <div key={index} className="forecast-card">
              <p>{hour.time.split(' ')[1]}</p>

              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                width="50"
              />

              <p>{hour.condition.text}</p>
              <p>{parseInt(hour.temp_c)}°C</p>
            </div>
          ))}
        </div>
      )}
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-cloud-sun-fill"
       viewBox="0 0 16 16"
       style={{position:'fixed',top:'27%',left:'10px',color:'white'}}>
  <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z"/>
  <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
</svg>
{/* Date & Condition Display */}
{data && (
  <div className="date-condition">
    <p>
      {new Date(data.location.localtime).toLocaleString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}
    </p>
  </div>
)}
<footer>
  <p>@Weather 2025</p>
</footer>

    </>
    
  )
}

export default App
