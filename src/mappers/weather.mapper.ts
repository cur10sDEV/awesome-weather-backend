import { IAqiDTO, IWeatherDTO } from "@/dtos/weather.dto";
import { AQILevels } from "@/types";

interface ICurrentWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number; // %
  dew_point: number;
  clouds: number; // %
  uvi: number;
  visibility: number; // metres
  wind_speed: number; // metres/sec but depends on units
  wind_deg: number; // deg
  weather: {
    id: string;
    main: string;
    description: string;
    icon: string;
  }[];
}

interface IHourlyWeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number; // %
  dew_point: number;
  clouds: number; // %
  uvi: number;
  visibility: number; // metres
  wind_speed: number; // metres/sec but depends on units
  wind_deg: number; // deg
  weather: {
    id: string;
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number; // Probability of precipitation
}

interface IDailyWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number; // %
  dew_point: number;
  clouds: number; // %
  uvi: number;
  wind_speed: number; // metres/sec but depends on units
  wind_deg: number; // deg
  weather: {
    id: string;
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number; // Probability of precipitation
}

interface IWeatherAlertData {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
}

interface IWeatherApiResponseData {
  lat: number;
  lon: number;
  current: ICurrentWeatherData;
  hourly: IHourlyWeatherData[];
  daily: IDailyWeatherData[];
  alerts: IWeatherAlertData[];
}

interface IAqiApiResponseData {
  coord: {
    lat: number;
    lon: number;
  };
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }[];
}

export class WeatherMapper {
  static toDTO(data: IWeatherApiResponseData): IWeatherDTO {
    return {
      data: {
        lat: data.lat,
        lon: data.lon,
        current: {
          dateTime: data.current.dt,
          temp: data.current.temp,
          feelsLike: data.current.feels_like,
          main: data.current.weather[0].main,
          description: data.current.weather[0].description,
          pressure: data.current.pressure,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_speed,
          pop: Number(data.daily[0].pop) * 100,
          uvi: data.current.uvi,
          sunrise: data.current.sunrise,
          sunset: data.current.sunset,
        },
        hourly: data.hourly.map((item) => ({
          dateTime: item.dt,
          temp: item.temp,
          pop: item.pop,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        })),
        daily: data.daily.map((item) => ({
          dateTime: item.dt,
          maxTemp: item.temp.max,
          minTemp: item.temp.min,
          pop: item.pop,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        })),
      },
    };
  }

  static toAqiDTO(data: IAqiApiResponseData): IAqiDTO {
    type keys = keyof typeof AQILevels;

    const level = data.list[0].main.aqi;
    let index: keys = 1;
    if (level >= 1 && level <= 5) {
      index = level as keys;
    }
    return {
      data: { level: AQILevels[index] },
    };
  }
}
