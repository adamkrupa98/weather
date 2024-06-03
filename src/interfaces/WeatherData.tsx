export {};

export default interface WeatherData {
  data: {
    current: {
      condition: {
        icon: string;
      };
      temp_c: number;
      wind_degree: number;
      wind_kph: number;
      precip_mm: number;
      humidity: number;
      pressure_mb: number;
    };
    forecast: {
      forecastday: {
        hour: {
          time: string;
          condition: {
            icon: string;
          };
          temp_c: string;
        }[];
        date: string;
        day: {
          condition: {
            icon: string;
          };
          avgtemp_c: string;
        };
        astro: {
          sunrise: string;
          sunset: string;
        };
      }[];
    };
    error: any;
  } | null;
}
