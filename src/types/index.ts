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
  long: string;
}
