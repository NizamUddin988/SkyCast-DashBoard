import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [city, setCity] = useState('Kolar')
  const [darkMode, setDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  useEffect(() => {
    axios
      .get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}=${city}&hours=6`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [city])

  const mobileH1 = isMobile ? { position:'static', fontSize:'3.5em', margin:'70px 5% 0 5%', display:'block' } : {}
  const mobileSup = isMobile ? { position:'static', fontSize:'16px', verticalAlign:'super', display:'inline' } : {}
  const mobileH2 = isMobile ? { position:'static', fontSize:'1.5em', textAlign:'left', margin:'4px 5%' } : {}
  const mobilePre = isMobile ? { marginLeft:'5%', marginTop:'4px', fontSize:'0.9em', whiteSpace:'pre-wrap' } : {}
  const mobileDateCondition = isMobile ? { position:'static', textAlign:'left', margin:'4px 5%', fontSize:'0.9em', color:'white' } : {}
  const mobileForecastContainer = isMobile ? { position:'static', display:'flex', flexDirection:'row', flexWrap:'nowrap', overflowX:'auto', overflowY:'hidden', gap:'10px', padding:'10px 5%', marginTop:'15px', width:'100%', boxSizing:'border-box' } : {}
  const mobileForecastCard = isMobile ? { minWidth:'110px', width:'110px', height:'auto', minHeight:'130px', fontSize:'0.85em', padding:'8px', flexShrink:0, boxSizing:'border-box' } : {}
  const mobileFooter = isMobile ? { position:'static', transform:'none', textAlign:'center', padding:'10px 0', marginTop:'10px', fontSize:'14px' } : {}

  return (
    <>
      <nav className="navbar navbar-expand-lg weather-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fas fa-cloud-sun weather-icon"></i>
            <span style={{ fontSize: '1.4em' }}>WeatherNow</span>
          </a>
          <div className="collapse navbar-collapse">
            <div className="search-container">
              <form className="d-flex position-relative" onSubmit={(e) => e.preventDefault()}>
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
            <button className="theme-toggle" title="Toggle theme" onClick={() => setDarkMode(!darkMode)}>
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {data && (
        <div className="weather-display">
          <h1 style={mobileH1}>
            {parseInt(data.current.temp_c)}
            <sup style={mobileSup}>
              °C <span style={{ color: '#979797', fontSize: '30px' }}>|</span> {parseInt((data.current.temp_c * 9) / 5 + 32)}°F
            </sup>
          </h1>
          <h2 style={mobileH2}>{data.location.name}</h2>
          <pre style={mobilePre}>
            <p>Precipitation: {data.current.precip_mm} mm</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {data.current.wind_kph} km/h</p>
          </pre>
        </div>
      )}

      {data && (
        <div className="forecast-container" style={mobileForecastContainer}>
          {data.forecast.forecastday[0].hour.slice(0, 6).map((hour, index) => (
            <div key={index} className="forecast-card" style={mobileForecastCard}>
              <p>{hour.time.split(' ')[1]}</p>
              <img src={hour.condition.icon} alt={hour.condition.text} width={isMobile ? '35' : '50'} />
              <p>{hour.condition.text}</p>
              <p>{parseInt(hour.temp_c)}°C</p>
            </div>
          ))}
        </div>
      )}

      {!isMobile && (
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor"
          className="bi bi-cloud-sun-fill" viewBox="0 0 16 16"
          style={{ position:'fixed', top:'27%', left:'10px', color:'white' }}>
          <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z"/>
          <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
        </svg>
      )}

      {data && (
        <div className="date-condition" style={mobileDateCondition}>
          <p>
            {new Date(data.location.localtime).toLocaleString('en-US', {
              weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true,
            })}
          </p>
        </div>
      )}

      <footer style={mobileFooter}>
        <p>@Weather 2025</p>
      </footer>
    </>
  )
}

export default App
