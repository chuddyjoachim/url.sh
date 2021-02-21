import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import { useState } from "react";
import Link from "./components/link/";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:shorturl" component={Link} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
