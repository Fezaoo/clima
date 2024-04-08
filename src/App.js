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


function App() {
  const [input, setInput] = useState('')
  const [info, setInfo] = useState('')

  function convert (a) {
    return Math.floor(a - 273.15)
  }

  const search = async () => {

    if (input === '') {
      alert('Preencha algum cep')
      return
    }
    try {
      var response = await api.get(`weather?q=${input}&appid=8690c0d1a638967660a3539ad9d30d92`)
      console.log(response.data)
      setInfo(response.data)
      /*
      const location = document.getElementsByClassName("weatherLocation")
      const temperature = document.getElementsByClassName("wheaterTemperature")
      const humidity  = document.getElementsByClassName("weatherHumidity")
      const wind = document.getElementsByClassName("weatherWind")
      location.innerText = response.data.name
      */
      console.log(response.data.name)
    }
    catch {
      alert("Ops erro ao buscar")
      console.log(Error)
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
              className='searchInput' placeholder='London'></input>
            <button className='searchButton'
              onClick={search}>
              <FiSearch size={14} color='#909090' />
            </button>
          </div>
        </header>
        {Object.keys(info).length > 0 && (
          <main className='appDisplay'>
            <div className='weatherStatus'>
              <img src={cloud_icon} className='weatherStatusIcon' alt='Default'></img>
            </div>
            <div className='weatherTemperature'>
            {convert(info.main.temp)}°
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
                  <h3 className='weatherPercentage'>{Math.floor(info.wind.speed)} km/h</h3>
                  <p className='weatherAttributeSubtitle'>Wind Speed</p>
                </div>
              </div>
            </section>
          </main>
        )
        }

      </div>
    </div>
  );
}

export default App;
