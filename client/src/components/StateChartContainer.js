import React from 'react'
import StateBarCharts from "./StateBarCharts";
import StateLineCharts from "./StateLineCharts";

const StateChartContainer = (props) => {
  let barTitle;
  let lineTitle;

  if (props.display === "cases"){
    barTitle = "Case"
    lineTitle = "Cases"
  } else {
    barTitle = "Death"
    lineTitle = "Deaths"
  }
  return (
    <div className="row mt-3">
      <div className="col-6 top-chart-c">
        <div className="top-chart">
          <h5>{props.stateName} {barTitle} Totals</h5>
          <StateBarCharts
            display = {props.display}
            stateName = {props.stateName}
            stateAbbrev = {props.stateAbbrev}
            mostRecentData = {props.mostRecentData}
            nationalAvgs = {props.nationalAvgs}
            />
        </div>
      </div>
      <div className="col-6 top-chart-c">
        <div className="top-chart">
          <h5>{props.stateName} {lineTitle} Over Time</h5>
          <StateLineCharts
            display = {props.display}
            stateName = {props.stateName}
            stateData = {props.stateData}
            mostRecentData = {props.mostRecentData}
            nationalAvgs = {props.nationalAvgs}
            nationalData = {props.nationalData}
          />
        </div>
      </div>
    </div>
  )
}

export default StateChartContainer;