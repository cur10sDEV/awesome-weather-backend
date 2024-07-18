export interface IGeocodeDTOItem {
  name: string;
  lat: string;
  lon: string;
  country: string;
  state: string;
}

export interface IGeocodeDTO {
  data: IGeocodeDTOItem[];
}
