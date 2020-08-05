import { useState, useEffect } from "react";
import { LocalStorage, MemoryStorage } from "ttl-localstorage";
LocalStorage.synchronous = true; //for using synchronous mode instead of promises
MemoryStorage.synchronous = true;

export const useFetchPageWithCache = (page, URL, key, ttl = 24 * 60 * 60) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        if (LocalStorage.isLocalStorageAvailable()) {
          if (LocalStorage.keyExists(`${key}-${page}`)) {
            const cachedData = LocalStorage.get(`${key}-${page}`);
            setResults((prev) => [
              ...new Set([...prev, ...cachedData.results]),
            ]);
            setHasMore(cachedData.current < cachedData.total);
            console.log("CACHE ACCESS PAGE:", page);
          } else {
            console.log("FETCH ACCESS");
            //we fetch from server in case no cached data is found
            let res = await fetch(URL + page);
            res = await res.json();
            console.log(res);
            setHasMore(res.current < res.total);
            if (hasMore) {
              setResults((prev) => [...new Set([...prev, ...res.results])]);
              LocalStorage.put(`${key}-${page}`, res, ttl);
            }
          }
        } else {
          if (MemoryStorage.keyExists(`${key}-${page}`)) {
            const cachedData = MemoryStorage.get(`${key}-${page}`);
            setResults((prev) => [
              ...new Set([...prev, ...cachedData.results]),
            ]);
            setHasMore(cachedData.current < cachedData.total);
            console.log("CACHE ACCESS PAGE:", page);
          } else {
            console.log("FETCH ACCESS");
            //we fetch from server in case no cached data is found
            let res = await fetch(URL + page);
            res = await res.json();
            console.log(res);
            setHasMore(res.current < res.total);
            if (hasMore) {
              setResults((prev) => [...new Set([...prev, ...res.results])]);
              MemoryStorage.put(`${key}-${page}`, res, ttl);
            }
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
    //cleanUp the cached data in localStorage if needed
    return () => {
      if (LocalStorage.isLocalStorageAvailable())
        LocalStorage.runGarbageCollector();
      else MemoryStorage.runGarbageCollector();
    };
  }, [page, URL, hasMore, key, ttl]);
  return { loading, error, hasMore, results };
};

export const useFetchIdWithCache = (id, URL, key, ttl = 24 * 60 * 60) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  //same default ttl (24h)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        //we check first if the local storage is made available by the user, if not we use memory (a lootbag array)
        if (LocalStorage.isLocalStorageAvailable()) {
          if (LocalStorage.keyExists(`${key}-${id}`)) {
            const cachedData = LocalStorage.get(`${key}-${id}`);
            setResults(cachedData);
            console.log("CACHE ACCESS ID:", id);
          } else {
            //we fetch in case no cached data is found
            let res = await fetch(URL + id);
            res = await res.json();
            console.log(res);
            setResults(res);
            console.log("FETCHED ID:", id);
            LocalStorage.put(`${key}-${id}`, res, ttl);
          }
        } else {
          if (MemoryStorage.keyExists(`${key}-${id}`)) {
            const cachedData = MemoryStorage.get(`${key}-${id}`);
            setResults(cachedData);
            console.log("CACHE ACCESS ID:", id);
          } else {
            //we fetch in case no cached data is found
            let res = await fetch(URL + id);
            res = await res.json();
            console.log(res);
            setResults(res);
            console.log("FETCHED ID:", id);
            MemoryStorage.put(`${key}-${id}`, res, ttl);
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error); //should change after
      }
    };
    getData();
    //cleanUp the cached data in localStorage if needed
    return () => {
      if (LocalStorage.isLocalStorageAvailable())
        LocalStorage.runGarbageCollector();
      else MemoryStorage.runGarbageCollector();
    };
  }, [id, URL, key, ttl]);
  return { loading, error, results };
};
