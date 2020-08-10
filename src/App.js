import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
import { Landing, Modal } from "./components";
import Home from "./components/Home/Home";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  // const location = useLocation();

  return (
    <div className="App">
      <Modal />
      <Route path="/" exact render={() => <Landing />} />
      <Route path="/site" exact render={() => <Home />} />
      <Route path="/site/view/:id" exact render={() => <Home />} />
      <Route path="/site/start" exact render={() => <Home />} />
      <Route path="/site/deploy/:id" exact render={() => <Home />} />
    </div>
  );
}

export default App;
