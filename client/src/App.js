import React, { Component } from "react";
import { BrowserRouter, HashRouter, Switch, Route} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/dashboard"} component={Dashboard} />
          <Route exact path={'/'} component={Home} />
        {/* <Route >
          <About />
        </Route> */}
        </Switch>
      </HashRouter>
    );
  }
}


export default App;
