export interface GeocodeDTOItem {
  name: string;
  lat: string;
  long: string;
  country: string;
  state: string;
}

export interface GeocodeDTO {
  data: GeocodeDTOItem[];
}
