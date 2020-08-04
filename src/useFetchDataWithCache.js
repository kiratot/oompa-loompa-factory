import React, { useState, useEffect } from "react";
import { LocalStorage } from "ttl-localstorage";

export const useFetchPageWithCache = (page, URL, key) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        if (LocalStorage.keyExistsSync(`${key}-${page}`)) {
          const cachedData = LocalStorage.getSync(`${key}-${page}`);
          setResults((prev) => [...new Set([...prev, ...cachedData.results])]);
          setHasMore(cachedData.current < cachedData.total);
          console.log("CACHE ACCESS PAGE:", page);
        } else {
          console.log("FETCH ACCESS");
          //we fetch in case no cached data is found
          let res = await fetch(URL + page);
          res = await res.json();
          console.log(res);
          setHasMore(res.current < res.total);
          if (hasMore) {
            setResults((prev) => [...new Set([...prev, ...res.results])]);
            LocalStorage.putSync(`${key}-${page}`, res); //20sec
          }
        }
        setLoading(false);
      } catch (error) {
        setHasMore(false);
        setLoading(false);
        setError(error); //should change after
      }
    };
    getData();
  }, [page]);
  return { loading, error, hasMore, results };
};

export const useFetchIdWithCache = (id, URL, key) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        if (LocalStorage.keyExistsSync(`${key}-${id}`)) {
          const cachedData = LocalStorage.getSync(`${key}-${id}`);
          setResults(cachedData);
          console.log("CACHE ACCESS ID:", id);
        } else {
          //we fetch in case no cached data is found
          let res = await fetch(URL + id);
          res = await res.json();
          console.log(res);
          setResults(res);
          console.log("FETCHED ID:", id);
          LocalStorage.putSync(`${key}-${id}`, res); //20sec
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error); //should change after
      }
    };
    getData();
  }, [id]);
  return { loading, error, results };
};
