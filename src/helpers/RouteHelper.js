import { Route } from "react-router-dom";

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        //path the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    ></Route>
  );
}
