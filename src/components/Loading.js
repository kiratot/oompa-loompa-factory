import React from "react";

const Loading = ({ center }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
  };
  return (
    <div class="lds-ellipsis" style={center ? style : null}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
