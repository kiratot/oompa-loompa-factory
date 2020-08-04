import React from "react";

const Name = ({ firstName }) => {
  return (
    <div className="oompa-loompa-item">
      <h3 style={{ textAlign: "center" }}>{firstName}</h3>
    </div>
  );
};

export default Name;
