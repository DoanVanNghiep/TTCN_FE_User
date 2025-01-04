import React from "react";

function Informations({ infors }) {
  return (
    <div>
      <div>
        <img src={infors.image} alt="" />
      </div>
      <div>
        <h2>{infors.title} </h2>
        <pre>{infors.content}</pre>
      </div>
    </div>
  );
}

export default Informations;
