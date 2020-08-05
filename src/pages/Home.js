import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Heading from "../components/Heading";
import Grid from "../components/Grid";
import OompaLoompa from "../components/OompaLoompa";
import { useIO } from "../hooks/useIO";
import { useFetchPageWithCache } from "../hooks/useFetchDataWithCache";
import { LocalStorage } from "ttl-localstorage";

import Loading from "../components/Loading";
const Home = () => {
  const URL =
    "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=1";
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [filteredResults, setFilteredResults] = useState(null);
  const { results, error, loading, hasMore } = useFetchPageWithCache(
    page,
    URL,
    "cached-oompa"
  );
  const loadMoreRef = useIO(loading, hasMore, setPage);

  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);
    if (value === "" || value === null) setFilteredResults(null);
    else {
      // we filter only the cached data
      let p = 1;
      let allCachedResults = [];
      while (LocalStorage.keyExistsSync(`cached-oompa-${p}`)) {
        allCachedResults = [
          ...allCachedResults,
          ...LocalStorage.getSync(`cached-oompa-${p}`).results,
        ];
        p++;
      }
      console.log(allCachedResults);
      setFilteredResults(
        allCachedResults.filter(
          ({ profession, first_name, last_name }) =>
            profession.toLowerCase().includes(value.toLowerCase()) ||
            `${first_name.toLowerCase()} ${last_name.toLowerCase()}`.includes(
              value.toLowerCase()
            )
        )
      );
    }
  };
  return (
    <>
      <SearchBar onChange={handleInput} value={input} />
      <Heading />
      <Grid>
        {error && <h3>{error.message}</h3>}
        {loading && <Loading center={page === 1} />}
        {!loading &&
          !error &&
          filteredResults &&
          results &&
          filteredResults.map(
            ({ id, first_name, last_name, gender, profession, image }) => (
              <OompaLoompa
                id={id}
                key={id}
                firstName={first_name}
                lastName={last_name}
                gender={gender}
                profession={profession}
                image={image}
              />
            )
          )}
        {!error &&
          !filteredResults &&
          results.map(
            (
              { id, first_name, last_name, gender, profession, image },
              index
            ) => {
              // the last item of the array is our Intersection Observer
              return (
                <OompaLoompa
                  id={id}
                  key={id}
                  firstName={first_name}
                  lastName={last_name}
                  gender={gender}
                  profession={profession}
                  image={image}
                />
              );
            }
          )}
        {!filteredResults && (
          <h3 ref={loadMoreRef}>
            {" "}
            {loading ? page !== 1 && <Loading /> : "That's all folks."}
          </h3>
        )}
      </Grid>
    </>
  );
};

export default Home;
