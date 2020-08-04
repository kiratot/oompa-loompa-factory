import React, { useEffect } from "react";
import Grid from "../components/Grid";
import { useParams } from "react-router-dom";
import {
  useFetchDataWithCache,
  useFetchIdWithCache,
} from "../useFetchDataWithCache";

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
  const gend = gender === "F" ? "Woman" : "Man";
  return (
    <Grid>
      {error && <h3>{error.msg}</h3>}
      {loading && <h3>Loading...</h3>}
      {!loading && !error && (
        <div className="description-container">
          <img src={image} alt={`${first_name} ${last_name}`} />
          <div className="description-typography">
            <h3>
              {first_name} {last_name} {id}
            </h3>
            <span>{gend}</span>
            <span className="profession">{profession}</span>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      )}
    </Grid>
  );
};

export default Description;
