import React, { useCallback, useMemo, useState } from "react";
import { axiosInstance } from "src/axios";

const PAGE_SIZE = 25;

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
      .then((res) => {
        setDogs(res.data);
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
      .then((res) => {
        setDogs((prev) => [...prev, ...res.data]);
      })
      .catch((error) => {
        setError(error);
      });
  }, [filters, sort, from]);

  return { dogs, loading, error, total, hasMore, loadMore };
}
