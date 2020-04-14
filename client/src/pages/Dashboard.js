import React, { Component } from "react";
import "../App.css";
import DashboardMap from "../components/DashboardMap";
import ChartContainer from "../components/ChartContainer";


class Dashboard extends Component {

  render() {
      return (
        <div>
            <h1>Dashboard</h1>
            <h2>Your tracked locations (sample data for now, store in database)</h2>
            <h2><em>As of 4-12-2020:</em></h2>
            <h3>Pima County, Arizona</h3>
            <p><strong>Covid-19 Data</strong></p>
            <ul>
                <li>x Cases</li>
                <li>y Deaths</li>
            </ul>
            <h3>Maricopa County, Arizona</h3>
            <p><strong>Covid-19 Data</strong></p>
            <ul>
                <li>x Cases</li>
                <li>y Deaths</li>
            </ul>
            <h3>Los Angeles County, California</h3>
            <p><strong>Covid-19 Data</strong></p>
            <ul>
                <li>x Cases</li>
                <li>y Deaths</li>
            </ul>
            <DashboardMap />
        </div>
      );
    }
  }
  
  export default Dashboard;