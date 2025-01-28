import React, { useState } from "react"
import ZipForm from "./ZipForm";
import CityForm from "./CityForm";

const BASE_IMAGE_URL = "https://openweathermap.org/img/wn/";

interface WeatherData {
    weather: {
      id: number,
      main: string,
      description: string,
      icon: string
    }[],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    }
    name: string
}

const WeatherData = ({weather: data}: {weather: WeatherData | string}) => {
  if (typeof data === "string") {
    return <p>No weather data available</p>
  }

  const imageIcon = data.weather[0].icon;

  return (
    <ul>
      <img 
        src={`${BASE_IMAGE_URL}${imageIcon}@2x.png`} 
        alt={data.weather[0].main}
      />
      <li>Location: {data.name}</li>
      <li>Temperature: {data.main.temp.toFixed(1)} C</li>
      <li>Feels like: {data.main.feels_like.toFixed(1)}</li>
    </ul>
  )
}

const App = () => {
  const [weather, setWeather] = useState<WeatherData | string>("");
  const [showCityForm, setShowCityForm] = useState<boolean>(true);
  return (
    <div>
      <button onClick={() => setShowCityForm(!showCityForm)}>
        {(showCityForm) ? "Search by zip" : "Search by city"}
      </button>
      {(showCityForm) 
      ? <CityForm setWeather={setWeather}/> 
      : <ZipForm setWeather={setWeather}/>}
      <WeatherData weather={weather} />
    </div>
  )
}

export default App
