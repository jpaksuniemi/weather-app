import React, { useState } from "react"
import weatherService from "./service/weatherService";

interface Weather {
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

const WeatherData = ({weather}: {weather: Weather | string}) => {
  if (typeof weather === "string") {
    return <p>No weather data available</p>
  }

  return (
    <ul>
      <li>Location: {weather.name}</li>
      <li>Temperature: {weather.main.temp}</li>
    </ul>
  )
}

const App = () => {
  const [zipcode, setZipcode] = useState<string>("");
  const [statecode, setStatecode] = useState<string>("");
  const [weather, setWeather] = useState<Weather | string>("");

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  }

  const handleStatecodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatecode(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submitted");
    const weatherData = await weatherService.getWeather(zipcode, statecode);
    setWeather(weatherData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        zip<input type="text" value={zipcode} onChange={handleZipChange} />
        <br />
        statecode<input type="text" value={statecode} onChange={handleStatecodeChange} />
        <br />
        <button type="submit">Query</button>
      </form>

      <WeatherData weather={weather} />
    </div>
  )
}

export default App
