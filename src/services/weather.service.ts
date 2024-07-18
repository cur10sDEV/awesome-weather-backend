import { appConfig } from "@/configs";
import logger from "@/configs/logger";
import { WeatherMapper } from "@/mappers/weather.mapper";
import { Units } from "@/types";

export class WeatherService {
  private static BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

  private static formUrl(
    lat: string,
    lon: string,
    units: Units = Units.metric,
    lang?: string,
    apiKey: string = appConfig.openWeatherApiKey
  ) {
    let url = `${this.BASE_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    if (lang) {
      url += `&lang=${lang}`;
    }

    return url;
  }

  static async getWeatherData(lat: string, lon: string, units: Units = Units.metric, lang?: string) {
    try {
      const url = this.formUrl(lat, lon, units, lang);

      const res = await fetch(url);
      const weather = await res.json();

      const weatherDto = WeatherMapper.toDTO(weather);

      return weatherDto;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  private static AQI_BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution";

  static async getAQI(lat: string, lon: string) {
    try {
      const url = `${this.AQI_BASE_URL}?lat=${lat}&lon=${lon}&appid=${appConfig.openWeatherApiKey}`;

      const res = await fetch(url);
      const aqi = await res.json();

      const aqiDto = WeatherMapper.toAqiDTO(aqi);

      return aqiDto;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
