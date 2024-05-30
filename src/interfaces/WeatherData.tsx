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
    error?: {
      code: number;
      // Inne pola błędu
    };
  };
}
