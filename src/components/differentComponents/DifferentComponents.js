import {
  Switch,
  // Route,
  Link,
  // BrowserRouter as Router,
  // useParams,
  // useRouteMatch,
} from "react-router-dom";

import { RouteWithSubRoutes } from "../../helpers/RouteHelper";

export const DifferentComponents = ({ routes }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-4">
          <div>routes</div>
          {routes.map((route, i) => {
            return (
              <div key={i}>
                <Link to={`${route.path}`}>{route.path.replace("/", "")}</Link>
              </div>
            );
          })}
        </div>
        <div className="col-12 col-sm-8">
          <div>components</div>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};
