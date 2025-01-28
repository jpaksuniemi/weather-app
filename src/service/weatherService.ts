import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

const getWeather = (latitude: string, longitude: string) => {
    const response = axios.get(`${BASE_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log("Weather response ", response);
    return response.then(response => response.data);
}

export default { getWeather }