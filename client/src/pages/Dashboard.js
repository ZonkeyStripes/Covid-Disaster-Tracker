import React, { Component } from "react";
import "../App.css";
import DashboardMap from "../components/DashboardMap";
import ChartContainer from "../components/ChartContainer";


class Dashboard extends Component {

  render() {
      return (
        <div>
            <h1>This is the dashboard</h1>
            <DashboardMap />
            <ChartContainer />
        </div>
      );
    }
  }
  
  export default Dashboard;