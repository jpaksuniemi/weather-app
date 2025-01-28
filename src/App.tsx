import React, { useState } from "react"
import weatherService from "./service/weatherService";

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
      <img src={`${BASE_IMAGE_URL}${imageIcon}@2x.png`} alt={data.weather[0].main}/>
      <li>Location: {data.name}</li>
      <li>Temperature: {data.main.temp.toFixed(1)} C</li>
      <li>Feels like: {data.main.feels_like.toFixed(1)}</li>
    </ul>
  )
}

const ZipForm = ({setWeather}: {setWeather: React.Dispatch<React.SetStateAction<WeatherData | string>>}) => {
  const [zipcode, setZipcode] = useState<string>("");
  const [statecode, setStatecode] = useState<string>("");
  
  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  }

  const handleStatecodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatecode(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submitted");
    const weatherData = await weatherService.getWeatherByZip(zipcode, statecode);
    setWeather(weatherData);
  }

  return (
      <form onSubmit={handleSubmit}>
        zip<input type="text" value={zipcode} onChange={handleZipChange} />
        <br />
        statecode<input type="text" value={statecode} onChange={handleStatecodeChange} />
        <br />
        <button type="submit">Query</button>
      </form>
  )
}

const App = () => {
  const [weather, setWeather] = useState<WeatherData | string>("");

  return (
    <div>
      <ZipForm setWeather={setWeather} />
      <WeatherData weather={weather} />
    </div>
  )
}

export default App
