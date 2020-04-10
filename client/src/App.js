import React, { Component } from "react";
import { BrowserRouter, HashRouter, Switch, Route} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.82,-98.57];
const zoomLevel = 4;


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/login"} component={Login} />
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
