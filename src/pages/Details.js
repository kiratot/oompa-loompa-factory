import React from "react";
import { useParams } from "react-router-dom";
import { useFetchIdWithCache } from "../hooks/useFetchDataWithCache";
import OompaLoompaDetail from "../components/OompaLoompaDetail";
import Loading from "../components/Loading";

const Description = () => {
  const { id } = useParams();
  const URL =
    "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/";
  const { results, error, loading } = useFetchIdWithCache(
    id,
    URL,
    "oompa-details-id"
  );
  const {
    first_name,
    last_name,
    gender,
    profession,
    image,
    description,
  } = results;

  return (
    <>
      {error && <h3>{error.msg}</h3>}
      {loading && <Loading center />}
      {!loading && !error && (
        <OompaLoompaDetail
          id={id}
          first_name={first_name}
          last_name={last_name}
          gender={gender}
          profession={profession}
          image={image}
          description={description}
        />
      )}
    </>
  );
};

export default Description;
