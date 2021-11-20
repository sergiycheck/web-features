import {
  Switch,
  // Route,
  Link,
  // BrowserRouter as Router,
  // useParams,
  useRouteMatch,
} from "react-router-dom";

import { RouteWithSubRoutes } from "../../helpers/RouteHelper";

export const ContextContainer = ({ routes }) => {
  const { path } = useRouteMatch();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {routes.map((route, i) => {
          return (
            <div key={i}>
              <Link to={`${route.path}`}>
                {route.path.replace(path, "").replace("/", "")}
              </Link>
            </div>
          );
        })}
      </nav>

      <div>
        <Switch>
          {routes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </div>
    </div>
  );
};
