import weatherService from "./service/weatherService";
import { useState } from "react";

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

const CityForm = ({setWeather}: {setWeather: React.Dispatch<React.SetStateAction<WeatherData | string>>}) => {
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
      setWeather(weatherData);
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