import React from "react";
import { Route } from "react-router-dom";
/*import List from "./List";
import View from "./View";*/
import Create from "./Create_fuc";
//import Edit from "./Edit";

function Country({ match }) {
  return (
    <>
      <h1>Anime</h1>
      {/*<Route exact path={match.path} component={List} />
      <Route path={`${match.path}/view/:num`} component={View} />*/}
      <Route exact path={`${match.path}/create`} component={Create} />
      {/*<Route exact path={`${match.path}/edit`} component={Edit}/>*/}
    </>
  );
}

export default Country;