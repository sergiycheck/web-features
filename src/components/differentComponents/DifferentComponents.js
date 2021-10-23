import {
  Switch,
  Route,
  Link,
  BrowserRouter as Router,
  // useParams,
  useRouteMatch,
} from "react-router-dom";

import Home from "./Home";
import Game from "./Game";
import BoilingContainer from "./Boiling";
import FilterableProducts from "./FilterableProducts";
import HooksExample from "./Hooks-Example.jsx";
import GoogleMap from "./GoogleMap.jsx";

const routesArr = [
  { route: "home", component: Home },
  { route: "Game", component: Game },
  { route: "BoilingContainer", component: BoilingContainer },
  { route: "FilterableProducts", component: FilterableProducts },
  { route: "HooksExample", component: HooksExample },
  { route: "GoogleMap", component: GoogleMap },
  
];

export const DifferentComponents = () => {
  const { path } = useRouteMatch();
  console.log("path", path);

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4">
            <div>routes</div>
            {routesArr.map((route, i) => {
              return (
                <div key={i}>
                  <Link to={`${path === "/" ? "" : path}/${route.route}`}>
                    {route.route}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="col-12 col-sm-8">
            <div>components</div>
            <Switch>
              {routesArr.map((route, i) => {
                return (
                  <Route
                    key={i}
                    exact
                    path={`${path === "/" ? "" : path}/${route.route}`}
                    component={route.component}
                  ></Route>
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};
