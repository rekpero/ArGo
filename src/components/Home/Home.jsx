/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import "./Home.scss";
import Header from "../Header";
import { Route, Redirect } from "react-router-dom";
import DisplaySites from "../DisplaySites";
import CreateSite from "../CreateSite";
import DeploySite from "../DeploySite";
import { StateContext } from "../../hooks";
import SiteView from "../SiteView";

function Home() {
  const { currentSiteDeployConfig } = useContext(StateContext);
  return (
    <div className="Home">
      <Header />
      <main className="app-main">
        <div className="home-container">
          <Route path="/site" exact render={() => <DisplaySites />} />
          <Route path="/site/view/:id" exact render={() => <SiteView />} />
          <Route path="/site/start" exact render={() => <CreateSite />} />
          <Route
            path="/site/deploy/:id"
            exact
            render={() => {
              return currentSiteDeployConfig ? (
                <DeploySite />
              ) : (
                <Redirect to="/site" />
              );
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
