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

const ZipForm = ({setWeather}: {setWeather: React.Dispatch<React.SetStateAction<WeatherData | string>>}) => {
    const [zipcode, setZipcode] = useState<string>("");
    const [statecode, setStatecode] = useState<string>("fi");
    
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
          Zip<input type="text" value={zipcode} onChange={handleZipChange} />
          <br />
          Statecode<input type="text" value={statecode} onChange={handleStatecodeChange} />
          <br />
          <button type="submit">Query</button>
        </form>
    )
}

export default ZipForm;