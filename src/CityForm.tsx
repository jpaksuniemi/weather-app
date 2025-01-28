import weatherService from "./service/weatherService";
import React, { useState } from "react";
import { WeatherData } from "./interfaces";
import { WeatherForecast } from "./interfaces";

const CityForm = ({setWeather, setForecast}: {
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | string>>; 
  setForecast: React.Dispatch<React.SetStateAction<WeatherForecast | string>>;
}) => {
    const [city, setCity] = useState<string>("");
    const [statecode, setStatecode] = useState<string>("fi");
    
    const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCity(event.target.value);
    }
  
    const handleStatecodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStatecode(event.target.value);
    }
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("form submitted");
      const weatherData = await weatherService.getWeatherByCity(city, statecode);
      const forecastData = await weatherService.getForecastByCity(city, statecode);
      setWeather(weatherData);
      setForecast(forecastData);
    }
  
    return (
        <form onSubmit={handleSubmit}>
          City<input type="text" value={city} onChange={handleZipChange} />
          <br />
          Statecode<input type="text" value={statecode} onChange={handleStatecodeChange} />
          <br />
          <button type="submit">Query</button>
        </form>
    )
}

export default CityForm;