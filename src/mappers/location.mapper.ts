import { IGeocodeDTO } from "@/dtos/location.dto";

interface IGeocodeApiResponseData {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export class LocationMapper {
  static toDTO(data: IGeocodeApiResponseData[]): IGeocodeDTO {
    const dataDto = data.map((item) => {
      return {
        name: item.name,
        lat: String(item.lat),
        lon: String(item.lon),
        country: item.country,
        state: item.state,
      };
    });

    return { data: dataDto };
  }
}
