import React, { useState } from "react";
import { axiosInstance } from "src/axios";

export function useFetchBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    axiosInstance
      .get("/dogs/breeds")
      .then((res) => {
        console.log("res data", res.data);
        setBreeds(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  return { breeds, loading, error };
}
