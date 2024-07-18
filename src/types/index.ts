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
  metric = "metric",
  standard = "standard",
  imperial = "imperial",
}

export const AQILevels = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};
