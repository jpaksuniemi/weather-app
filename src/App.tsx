import React, { useState } from "react"
import ZipForm from "./ZipForm";
import CityForm from "./CityForm";
import { Entry, ForecastDay, WeatherData } from "./interfaces";
import { WeatherForecast } from "./interfaces";
import { getForecastDayList } from "./forecastGrouper";

const BASE_IMAGE_URL = "https://openweathermap.org/img/wn/";

const CurrentWeather = ({data}: {data: WeatherData | string}) => {
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
      <li>Feels like: {data.main.feels_like.toFixed(1)} C</li>
    </ul>
  )
}

const ForecastList = ({data}: {data: WeatherForecast | string}) => {
  if (typeof data === "string") {
    return <p>No forecast data available</p>
  }

  const days: ForecastDay[] = getForecastDayList(data);
  console.log(days);
  

  return (
    <div style={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
      {days.map(day => (
        <div key={day.date}>
          <strong>{day.date}</strong>
          <ul style={{ listStyleType: "none", padding: 0}}>
            {day.entries.map((time: Entry) => (
              <ForecastEntry
                key={time.time}
                dateTime={time.time}
                temp={time.temp.toFixed(1)}
                main={time.icon}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const ForecastEntry = ({dateTime, temp, main}: {dateTime: string; temp: string; main: string}) => (
  <li>{dateTime} <strong>----</strong> {temp} C <img src={`${BASE_IMAGE_URL}${main}.png`}/></li> 
)

const App = () => {
  const [weather, setWeather] = useState<WeatherData | string>("");
  const [forecast, setForecast] = useState<WeatherForecast | string>("");
  const [showCityForm, setShowCityForm] = useState<boolean>(true);
  return (
    <div>
      <button onClick={() => setShowCityForm(!showCityForm)}>
        {(showCityForm) ? "Search by zip" : "Search by city"}
      </button>
      {(showCityForm) 
      ? <CityForm setWeather={setWeather} setForecast={setForecast} /> 
      : <ZipForm setWeather={setWeather}/>}
      <CurrentWeather data={weather} />
      <ForecastList data={forecast} />
    </div>
  )
}

export default App
