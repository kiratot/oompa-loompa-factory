import React from "react";

const OompaLoompaDetail = ({
  id,
  first_name,
  last_name,
  gender,
  image,
  profession,
  description,
}) => {
  const gend = gender === "F" ? "Woman" : "Man";
  return (
    <div data-testid={`details-${id}`} className="description-container">
      <img src={image} alt={`${first_name} ${last_name}`} />
      <div className="description-typography">
        <h3>
          {first_name} {last_name}
        </h3>
        <span>{gend}</span>
        <span className="profession">{profession}</span>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default OompaLoompaDetail;
