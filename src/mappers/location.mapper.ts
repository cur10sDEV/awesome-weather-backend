import { GeocodeDTO } from "@/dtos/location.dto";

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
  static toDTO(data: IGeocodeApiResponseData[]): GeocodeDTO {
    const dataDto = data.map((item) => {
      return {
        name: item.name,
        lat: String(item.lat),
        long: String(item.lon),
        country: item.country,
        state: item.state,
      };
    });

    return { data: dataDto };
  }
}
