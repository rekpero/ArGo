/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./DisplaySites.scss";
import { useHistory } from "react-router-dom";

function DisplaySites() {
  const history = useHistory();
  return (
    <div className="DisplaySites">
      <div className="card-container">
        <div className="card-header">
          <h3 className="deployed-site-title">Deployed Sites</h3>
          <button
            type="button"
            className="deployed-site-button"
            onClick={(e) => history.push("/site/start")}
          >
            Add New Site
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplaySites;
