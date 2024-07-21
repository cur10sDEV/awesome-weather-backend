export interface IAqiDTO {
  data: { level: string };
}

export interface IWeatherDTO {
  data: {
    lat: number;
    lon: number;
    current: {
      dateTime: number;
      temp: number;
      feelsLike: number;
      main: string;
      description: string;
      pressure: number;
      humidity: number;
      windSpeed: number;
      pop: number;
      uvi: number;
      sunrise: number;
      sunset: number;
    };
    hourly: {
      dateTime: number;
      temp: number;
      pop: number;
      icon: string;
    }[];
    daily: {
      dateTime: number;
      maxTemp: number;
      minTemp: number;
      pop: number;
      icon: string;
    }[];
  };
}
