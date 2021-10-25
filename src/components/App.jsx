import React from "react";
import "./App.scss";

import {
  BrowserRouter as Router,
  Switch,
  // Route,
  Link,
} from "react-router-dom";

import { DifferentComponents } from "./differentComponents/DifferentComponents.js";

import { ContextContainer } from "./advancedComponents/ContextContainer.jsx";
import Home from "./differentComponents/Home";
import Game from "./differentComponents/Game";
import BoilingContainer from "./differentComponents/Boiling";
import FilterableProducts from "./differentComponents/FilterableProducts";
import HooksExample from "./differentComponents/Hooks-Example";
import GoogleMap from "./differentComponents/GoogleMap";
import { AppContextBad } from "./advancedComponents/context/ContextComponentBad";
import { AppContextGood } from "./advancedComponents/context/ContextComponentGood";
import { MyComponent } from "./advancedComponents/code-splitting/MyConponent";
import { MyComponentWithRouting } from "./advancedComponents/code-splitting/MyComponentWithRouting";
import { ExampleBoundary } from "./advancedComponents/error-boundaries/ErrorBoundaryDemo";
import { CounterWithMemo } from "./advancedComponents/hooksApi/useMemoHookExample";
import { CounterUseState } from "./advancedComponents/hooksApi/CounterUseState";
import { CounterWithUseReducer } from "./advancedComponents/hooksApi/CounterWithUseReducer";
import { HocComponents } from "./advancedComponents/HOC/ProductCard";

import { RouteWithSubRoutes } from "../helpers/RouteHelper";

const routes = [
  {
    path: "/advancedComponents",
    component: ContextContainer,
    routes: [
      { path: `/advancedComponents/contextBad`, component: AppContextBad },
      { path: "/advancedComponents/contextGood", component: AppContextGood },
      { path: "/advancedComponents/codeSplitting", component: MyComponent },
      {
        path: "/advancedComponents/codeSplittingRouting",
        component: MyComponentWithRouting,
      },
      {
        path: "/advancedComponents/errorBoundaries",
        component: ExampleBoundary,
      },
      {
        path: "/advancedComponents/CounterWithMemo",
        component: CounterWithMemo,
      },
      {
        path: "/advancedComponents/CounterUseState",
        component: CounterUseState,
      },
      {
        path: "/advancedComponents/CounterWithUseReducer",
        component: CounterWithUseReducer,
      },
      { path: "/advancedComponents/HocComponents", component: HocComponents },
    ],
  },
  {
    path: "/",
    component: DifferentComponents,
    routes: [
      { path: "/home", component: Home },
      { path: "/Game", component: Game },
      { path: "/BoilingContainer", component: BoilingContainer },
      { path: "/FilterableProducts", component: FilterableProducts },
      { path: "/HooksExample", component: HooksExample },
      { path: "/GoogleMap", component: GoogleMap },
    ],
  },
];

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
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
