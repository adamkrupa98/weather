import { useEffect, useState } from "react";

const useFetch = (cityName: string | null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const apiKey = "b14969124d2147cba6c124736242602";
    let url = "";
    if (cityName) {
      url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=6&aqi=no&alerts=no`;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          setIsLoading(false);
          setData(responseJson);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
          console.error("Fetch error: ", error.message);
        });
    }
  }, [cityName]);
  return { data, isLoading, error };
};

export default useFetch;