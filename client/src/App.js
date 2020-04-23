import React, { Component } from "react";
import { BrowserRouter, HashRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import News from "./pages/News";
import Kit from "./pages/Kit";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import FirstTimeUse from "./pages/FirstTimeUse";
import Disasters from "./pages/Disasters";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header/>
        <Switch>
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/news"} component={News} />
          <Route exact path={"/kit"} component={Kit} />
          <PrivateRoute exact path={"/dashboard"} component={Dashboard} />
          <PrivateRoute exact path={"/ftu"} component={FirstTimeUse} />
          <Route exact path={"/disasters"} component={Disasters} />
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
