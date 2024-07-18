declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export interface ICoordinates {
  lat: string;
  lon: string;
}

export enum Units {
  "metric",
  "standard",
  "imperial",
}

export enum AQILevels {
  "Good" = 1,
  "Fair" = 2,
  "Moderate" = 3,
  "Poor" = 4,
  "Very Poor" = 5,
}
