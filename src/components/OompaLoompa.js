import React from "react";
import { Link } from "react-router-dom";

const OompaLoompa = ({
  id,
  firstName,
  lastName,
  gender,
  profession,
  image,
}) => {
  const gend = gender === "F" ? "Woman" : "Man";

  return (
    <Link to={`/ol/${id}`}>
      <div data-testid="oompaloompa" className="oompa-loompa-item">
        <img src={image} alt={`${firstName} ${lastName}`} />
        <h3>
          {firstName} {lastName}
        </h3>
        <span>{gend}</span>
        <span className="profession">{profession}</span>
      </div>
    </Link>
  );
};

export default OompaLoompa;
