import axios from "axios";

const API_KEY = `&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;
const BASE_URL = "http://api.openweathermap.org/geo/1.0/zip?zip="

const getLocation = (zip: string, countryCode: string) => {
    const response = axios.get(`${BASE_URL}${zip},${countryCode}${API_KEY}`);
    console.log(response);
    return response.then(response => response.data);
}

export default { getLocation }