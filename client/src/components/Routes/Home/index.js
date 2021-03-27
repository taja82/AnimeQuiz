import React from "react";
import { Route } from "react-router-dom";
import aHome from "./Home";
//import UserDetail from "./UserDetail"

function index({ match }) {
  return (
    <>
      <h1>Home</h1>
      <Route exact path={match.path} component={aHome} />
      {/*<Route path={`${match.path}/:id`} component={UserDetail} />*/}
    </>
  );
}

export default index;