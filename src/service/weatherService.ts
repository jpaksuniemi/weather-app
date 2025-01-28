import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?"
const BASE_GEOCODE_URL = "http://api.openweathermap.org/geo/1.0/zip?";

interface Location {
  country: string,
  lat: string,
  lon: string,
  name: string,
  zip: string
}

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

async function getLocation(zip: string, countryCode: string): Promise<Location | null> {
    try {
        const response = await axios.get(`${BASE_GEOCODE_URL}zip=${zip},${countryCode}&appid=${API_KEY}`);
        console.log("geocode response: ", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching location data ", error);
        return null;
    }
}

const getWeatherByZip = async (zip: string, countryCode: string): Promise<WeatherData | string> => {
    const location = await getLocation(zip, countryCode)
    if (location && location.lat && location.lon) {
        try {
            const response = await axios.get(`${BASE_WEATHER_URL}lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`);
            console.log("Weather response ", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching weather data ", error);
            return "Error fetching weather data";
        }
    } else {
        return "Location data not available";
    }
    
}

const getWeatherByCity = async (city: string, countryCode: string): Promise<WeatherData | string> => {
    try {
        const response = await axios.get(`${BASE_WEATHER_URL}q=${city},${countryCode}&units=metric&appid=${API_KEY}`);
        console.log("Weather response ", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data ", error);
        return "Error fetching weather data";
    }
}

export default { getWeatherByZip, getWeatherByCity }