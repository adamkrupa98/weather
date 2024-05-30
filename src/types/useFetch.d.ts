export {};

declare module "../hooks/useFetch" {
  export interface WeatherData {
    data: any;
    isLoading: boolean;
    error: any;
  }
}
