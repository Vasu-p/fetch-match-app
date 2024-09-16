import React, { useCallback, useMemo, useState } from "react";
import { axiosInstance } from "src/axios";

const PAGE_SIZE = 25;

const zipLocationMap = new Map();

export function useInfinitePaginatedDogData(filters, sort) {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [from, setFrom] = useState(0);
  const hasMore = useMemo(() => {
    return dogs.length < total;
  }, [total, dogs]);

  React.useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/dogs/search", {
        params: { ...filters, size: PAGE_SIZE, from: 0, sort: sort },
      })
      .then((res) => {
        setFrom(PAGE_SIZE);
        setTotal(res.data.total);
        return res.data.resultIds;
      })
      .then((resultIds) => axiosInstance.post("/dogs", resultIds))
      .then((res) => fetchMissingZipCodes(res.data))
      .then((data) => addLocationToDogsData(data))
      .then((data) => {
        setDogs(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters, sort]);

  const loadMore = useCallback(() => {
    axiosInstance
      .get("/dogs/search", {
        params: { ...filters, size: PAGE_SIZE, from: from, sort: sort },
      })
      .then((res) => {
        setFrom((prev) => prev + 25);
        return res.data.resultIds;
      })
      .then((resultIds) => axiosInstance.post("/dogs", resultIds))
      .then((res) => fetchMissingZipCodes(res.data))
      .then((data) => addLocationToDogsData(data))
      .then((data) => {
        setDogs((prev) => [...prev, ...data]);
      })
      .catch((error) => {
        setError(error);
      });
  }, [filters, sort, from]);

  const fetchMissingZipCodes = useCallback((dogs) => {
    const missingZipCodes = dogs
      .map((dog) => dog.zip_code)
      .filter((zip) => !zipLocationMap.has(zip));
    if (missingZipCodes.length === 0) return dogs;
    return axiosInstance.post("/locations", missingZipCodes).then((res) => {
      res.data.forEach((location) => {
        if (location) {
          zipLocationMap.set(
            location.zip_code,
            `${location.city}, ${location.state}`
          );
        }
      });
      return dogs;
    });
  }, []);

  const addLocationToDogsData = useCallback((data) => {
    return data.map((data) => ({
      ...data,
      location: zipLocationMap.get(data.zip_code) || "Unknown",
    }));
  }, []);

  return { dogs, loading, error, total, hasMore, loadMore };
}
