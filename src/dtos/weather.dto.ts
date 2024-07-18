export interface IAqiDTO {
  data: { level: string };
}

export interface IWeatherDTO {
  data: {
    lat: number;
    lon: number;
    current: {
      dateTime: number;
      temp: Number;
      feelsLike: Number;
      main: string;
      description: string;
      pressure: Number;
      humidity: Number;
      windSpeed: Number;
      pop: Number;
      uvi: Number;
      sunrise: number;
      sunset: number;
    };
    hourly: {
      dateTime: number;
      temp: Number;
      pop: Number;
      icon: string;
    }[];
    daily: {
      dateTime: number;
      maxTemp: Number;
      minTemp: Number;
      pop: Number;
      icon: string;
    }[];
  };
}
