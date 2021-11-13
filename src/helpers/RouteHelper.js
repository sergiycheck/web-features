import { Route } from "react-router-dom";

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      //props = {match, location, history }
      render={(props) => {
        //path the sub-routes down to keep nesting
        return (
          <route.component {...props} {...route?.props} routes={route.routes} />
        );
      }}
    ></Route>
  );
}
