import React, { useEffect, useState, useRef, useCallback } from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Heading from "./components/Heading";
import Grid from "./components/Grid";
import OompaLoompa from "./components/OompaLoompa";
import Footer from "./components/Footer";
import { useFetchData } from "./useFetchDataWithCache";
import Name from "./components/Name";
import { useIO } from "./hooks/useIO";

const App = () => {
  // const URL = "https://swapi.dev/api/planets/?page=";
  const URL =
    "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=";
  const [page, setPage] = useState(1);

  const { results, error, loading, hasMore } = useFetchData(page, URL);
  const loadMoreRef = useIO(loading, hasMore, setPage);

  console.log(results);
  return (
    <Layout>
      <Header />
      <SearchBar />
      <Heading />
      <Grid>
        {page === 1 && loading ? (
          <h2>LOADING...</h2>
        ) : error ? (
          <h2>{error.message}</h2>
        ) : (
          results.map(({ first_name, id }) => (
            <Name key={id} firstName={first_name} />
          ))
        )}
        <h3 style={{ textAlign: "center" }} ref={loadMoreRef}>
          {loading ? "LOADING" : null}
        </h3>
      </Grid>
      <Footer />
    </Layout>
  );
};

export default App;
