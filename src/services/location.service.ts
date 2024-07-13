import { appConfig } from "@/configs";
import logger from "@/configs/logger";
import { LocationMapper } from "@/mappers/location.mapper";

export class LocationService {
  private static BASE_URL = "http://api.openweathermap.org/geo/1.0/direct";

  private static formUrl(
    cityName: string,
    stateCode?: string,
    countryCode?: string,
    limit: number = 5,
    apiKey: string = appConfig.openWeatherApiKey
  ) {
    let url = `${this.BASE_URL}?q=${cityName}`;

    if (stateCode) {
      url += `,${stateCode}`;
    }

    if (countryCode) {
      url += `,${countryCode}`;
    }

    url += `&limit=${limit}&appid=${apiKey}`;

    return url;
  }

  static async geocode(cityName: string, stateCode?: string, countryCode?: string) {
    try {
      const url = this.formUrl(cityName, stateCode, countryCode);

      const res = await fetch(url);
      const data = await res.json();

      const geocodeDto = LocationMapper.toDTO(data);

      return geocodeDto;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
