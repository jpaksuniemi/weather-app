import { Entry, ForecastDay, WeatherForecast } from "./interfaces";

function getForecastDayList(forecasts: WeatherForecast): Array<ForecastDay> {
    if (typeof forecasts === "string" || forecasts === null) {
        return [];
    }
    let days: ForecastDay[] = [];

    let index: number = 0;
    while (index < forecasts.list.length) {
        let entry = forecasts.list[index];
        let currDate: string = entry.dt_txt.split(" ")[0];
        let day: ForecastDay = {
            date: currDate,
            entries: [],
        };
        while (index < forecasts.list.length && forecasts.list[index].dt_txt.split(" ")[0] === currDate) {
            entry = forecasts.list[index];
            const dayEntry: Entry = {
                time: entry.dt_txt.split(" ")[1],
                temp: entry.main.temp,
                icon: entry.weather[0].icon
            };
            day.entries.push(dayEntry);
            index++;

            console.log(index, " ", forecasts.list.length);
        }
        days.push(day);
    }
    return days;
}

export {getForecastDayList}