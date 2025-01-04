import React from "react";
import Informations from "./Informations";

function InformationList({ infor }) {
  return (
    <div>
      <ul>
        {infor.map((infors) => {
          <li key={infors.id}>
            <Informations infors={infors} />
          </li>;
        })}
      </ul>
    </div>
  );
}

export default InformationList;
