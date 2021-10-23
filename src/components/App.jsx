import React from "react";
import "./App.scss";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";

import {DifferentComponents} from './differentComponents/DifferentComponents.js';

import {ContextContainer} from './advancedComponents/ContextContainer.jsx';

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <nav
          style={{
            position: "fixed",
            width: "100%",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <ul>
            <li>
              <Link to="/">DifferentComponents</Link>
            </li>

            <li>
              <Link to="/advancedComponents">advancedComponents</Link>
            </li>

          </ul>
        </nav>

        <div className="container mt-5">
          <Switch>

            <Route exact path="/advancedComponents">
              <ContextContainer></ContextContainer>
            </Route>

            <Route exact path="/">
              <DifferentComponents />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
