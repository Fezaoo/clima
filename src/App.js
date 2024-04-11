import './styles.css'
import api from './services/api'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import snow_icon from './Assets/snow.png'
import clear_icon from './Assets/clear.png'
import cloud_icon from './Assets/cloud.png'
import drizzle_icon from './Assets/drizzle.png'
import rain_icon from './Assets/rain.png'
import wind_icon from './Assets/wind.png'
import humidity_icon from './Assets/humidity.png'
import rainstorm_icon from './Assets/rainstorm.png'
import fog_icon from './Assets/fog.png'
import dust_icon from './Assets/dust.png'
import interrogation_icon from './Assets/weather-interrogation.png'



function App() {
  const [input, setInput] = useState('')
  const [info, setInfo] = useState('')
  const [weather_icon, setweather_icon] = useState(interrogation_icon)

  // Kelvin to Celsius
  function convert_temp (a) {
    return Math.floor(a - 273.15)
  }
  // MS / to KM/H 
  function convert_wind (a) {
    return Math.floor(a * 3.6)
  }

  const search = async () => {
    
    if (input === '') {
      alert('Search a valid location')
      return
    }
    // API request
    try {
      var response = await api.get(`weather?q=${input}&appid=8690c0d1a638967660a3539ad9d30d92`)
      console.log(response.data)
      setInfo(response.data)
      // Weather Status to show icon 
      const weather_status = response.data.weather[0].main
      if (weather_status === 'Clouds') {setweather_icon(cloud_icon)}
      else if (weather_status === 'Rain') {setweather_icon(rain_icon)}
      else if (weather_status === 'Drizzle') {setweather_icon(drizzle_icon)}
      else if (weather_status === 'Snow') {setweather_icon(snow_icon)}
      else if (weather_status === 'Clear') {setweather_icon(clear_icon)}
      // Compost Weather Status icons 
      else if ('Thunderstorm Squall'.includes(weather_status)) {setweather_icon(rainstorm_icon)}
      else if ('Haze Mist Fog Tornado'.includes(weather_status)) {setweather_icon(fog_icon)}
      else if ('Ash Smoke Dust Sand'.includes(weather_status)) {setweather_icon(dust_icon)}
      else {setweather_icon(interrogation_icon)}
    }
    catch (error) {
      alert("Ops error while searching")
      console.error('The following error ocurred: ', error)
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <header className='header'>
          <div className='searchHeader'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='searchInput' placeholder='London'
              onKeyDown={(e) => {if (e.key === 'Enter') {search()}}}
              ></input>
            <button className='searchButton'
              onClick={search}>
              <FiSearch size={14} color='#909090' />
            </button>
          </div>
        </header>
        {Object.keys(info).length > 0 && (
          <main className='appDisplay'>
            <div className='weatherStatus'>
              <img src={weather_icon} className='weatherStatusIcon' alt='Default'/>
            </div>
            <div className='weatherTemperature'>
            {convert_temp(info.main.temp)}°
            </div>
            <div className='weatherLocation'
            >
              {info.name}
            </div>
            <section className='weatherAttributes'>
              <div className='weatherAttributeContainer'>
                <img src={humidity_icon} className='weatherAttributeIcon' alt='humidity icon'/>
                <div className='weatherAttributeData'>  
                  <h3 className='weatherAttributePercentage'>{info.main.humidity} %</h3>
                  <p className='weatherAttributeSubtitle'>Humidity</p>
                </div>
              </div>
              <div className='weatherAttributeContainer'>
              <img src={wind_icon} className='weatherAttributeIcon' alt='Wind icon'/>
                <div className='weatherAttributeData'>
                  <h3 className='weatherPercentage'>{convert_wind(info.wind.speed)} km/h</h3>
                  <p className='weatherAttributeSubtitle'>Wind Speed</p>
                </div>
              </div>
            </section>
          </main>
        )
        }
      </div>
        <div className='footer'>
          <footer className='credits'>
            Icon Credits: 
            <a href="http://icons8.com/icons"> dust_icon </a>
            <a href="https://www.flaticon.com"> Other_icons </a>
            <a href="https://br.freepik.com/icone/nevoa_8675066#fromView=search&page=1&position=11&uuid=2d0cf332-bc5d-4b97-9e2e-e6f22971232a"> fog_icon </a>
            
          </footer>
        </div>
    </div>
  );
}

export default App;
