import {
  Switch,
  Route,
  Link,
  BrowserRouter as Router,
  // useParams,
  useRouteMatch,
} from "react-router-dom";

import { AppContextBad } from "./context/ContextComponentBad.jsx";
import { AppContextGood } from "./context/ContextComponentGood.jsx";

import { MyComponent } from "./code-splitting/MyConponent";
import { MyComponentWithRouting } from "./code-splitting/MyComponentWithRouting";

import { ExampleBoundary } from "./error-boundaries/ErrorBoundaryDemo";
import {CounterWithMemo} from './hooksApi/useMemoHookExample.jsx';
import {
  CounterUseState
} from './hooksApi/CounterUseState.jsx';

import {
  CounterWithUseReducer
} from './hooksApi/CounterWithUseReducer'

import {
  ProductsListWithSearch
} from './HOC/ProductCard.js';

const routesArr = [
  { route: "contextBad", component: AppContextBad },
  { route: "contextGood", component: AppContextGood },
  { route: "codeSplitting", component: MyComponent },
  { route: "codeSplittingRouting", component: MyComponentWithRouting },
  { route: "errorBoundaries", component: ExampleBoundary },
  { route: "CounterWithMemo", component: CounterWithMemo },
  { route: "CounterUseState", component: CounterUseState },
  { route: "CounterWithUseReducer", component: CounterWithUseReducer },
  { route: "ProductsListWithSearch", component: ProductsListWithSearch },
];

export const ContextContainer = () => {
  const { path } = useRouteMatch();

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {routesArr.map((route, i) => {
            return (
              <div key={i}>
                <Link to={`${path === "/" ? "" : path}/${route.route}`}>
                  {route.route}
                </Link>
              </div>
            );
          })}
        </nav>

        <div>
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
    </Router>
  );
};
