import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
//import UserDetail from "./UserDetail"

function Users({ match }) {
  console.log(match.path);
  return (
    <>
      <h1>Users</h1>
      <Route exact path={match.path} component={Home} />
      {/*<Route path={`${match.path}/:id`} component={UserDetail} />*/}
    </>
  );
}

export default Users;