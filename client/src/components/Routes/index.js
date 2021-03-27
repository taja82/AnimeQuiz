import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Anime from "./Anime";
import Users from "./Users";
import NotFound from "./NotFound";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Container, Typography } from "@material-ui/core";

function App() {
  return (
    <Router>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            My Header
          </Typography>
        </Toolbar>
      </AppBar>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/anime">
          <button>Anime</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
      </header>
      <hr />
      <main>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/anime" component={Anime} />
            {<Route path="/users" component={Users} />}
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
