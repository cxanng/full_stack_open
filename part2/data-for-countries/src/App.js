import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ text, value, changeHandler }) => (
  <>
    {text}<input value={value} onChange={changeHandler} />
  </>
)

const Country = ({country, showHandler}) => 
  <div key={country.alpha2Code} >{country.name} 
    <button onClick={showHandler} name={country.name}>Show</button>
  </div>

const Weather = ({weather, country}) => (
  <>
    <div><strong>Temperature:</strong>{weather.temperature} Celcius</div>
    <img src={weather.weather_icon} alt={`weather at ${country.capital}`} />
    <div><strong>Wind:</strong>{`${weather.wind_speed} mph direction ${weather.wind_dir}`}</div>
  </>
  )

const SingleCountry = ({country}) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => setWeather(response.data.current))
    .catch(error => console.error(error))
  }, [])
  return (
  <>
    <h1>{country.name}</h1>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
    <h1>Languages</h1>
    <ul>
      {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt={`${country.name}'s flag`} width={300} height={200}></img>
    <h1>Weather in {country.capital}</h1>
    <Weather weather={weather} country={country} />
  </>
)}

const CountryDisplay = ({ countries, showButtonHandler }) => {
  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />
  } else if (countries.length > 1 && countries.length < 11) {
    return countries.map(country => <Country country={country} 
      key={country.name} 
      showHandler={() => showButtonHandler(country.name)} />)
  } else if (countries.length <1) {
    return <div>No result</div>
  }
  return <div>To many results</div>
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ target, setTarget ] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
    .catch(error => console.log(error))
  }, [])

  return (
    <>
    <Filter text='Find countries' value={target} changeHandler={(event) => setTarget(event.target.value)} />
    {target !== ''
     ? <CountryDisplay countries={countries.filter(country => country.name.toLowerCase().includes(target.toLowerCase()))} 
        showButtonHandler={setTarget}/>
     : <></>
    }
    </>
  )
}

export default App;
