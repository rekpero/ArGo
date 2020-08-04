/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./Home.scss";
import Header from "../Header";
import { Route } from "react-router-dom";
import DisplaySites from "../DisplaySites";
import CreateSite from "../CreateSite";
import DeploySite from "../DeploySite";

function Home() {
  return (
    <div className="Home">
      <Header />
      <main className="app-main">
        <div className="home-container">
          <Route path="/site" exact render={() => <DisplaySites />} />
          <Route path="/site/start" exact render={() => <CreateSite />} />
          <Route path="/site/deploy/:id" exact render={() => <DeploySite />} />
        </div>
      </main>
    </div>
  );
}

export default Home;
