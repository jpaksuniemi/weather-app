import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "http://api.openweathermap.org/geo/1.0/zip?";

const getLocation = (zip: string, countryCode: string) => {
    const response = axios.get(`${BASE_URL}zip=${zip},${countryCode}&appid=${API_KEY}`);
    console.log("geocode response: ", response);
    return response.then(response => response.data);
}

export default { getLocation }