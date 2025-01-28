export interface WeatherForecast {
    list: {
        dt: number,
        main: {
            temp: number,
            feels_like: number
        },
        weather: {
            main: string,
            description: string,
            icon: string,
        }[],
        dt_txt: string
    }[],
    city: {
        name: string
    }
}

export interface WeatherData {
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

