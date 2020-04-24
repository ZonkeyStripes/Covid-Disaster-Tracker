import React, {useState} from 'react'
import StateBarCharts from "./StateBarCharts";
import StateLineCharts from "./StateLineCharts";
import $ from "jquery";

const StateChartContainer = (props) => {
  const [showBarChart, setShowBarChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);

  let barTitle;
  let lineTitle;

  const toggleBarChartDisplay = () => {
    if (showBarChart){
      $("#state-bar-collapse-icon").css("transform", "rotate(90deg)");
      setShowBarChart(false);
      $("#state-bar-chart-container").hide();
    } else {
      $("#state-bar-collapse-icon").css("transform", "rotate(0deg)");
      setShowBarChart(true);
      $("#state-bar-chart-container").show();
    }
  }
  
  const toggleLineChartDisplay = () => {
    if (showLineChart){
      $("#state-line-collapse-icon").css("transform", "rotate(90deg)");
      setShowLineChart(false);
      $("#state-line-chart-container").hide();
    } else {
      $("#state-line-collapse-icon").css("transform", "rotate(0deg)");
      setShowLineChart(true);
      $("#state-line-chart-container").show();
    }
  }

  if (props.display === "cases"){
    barTitle = "Case"
    lineTitle = "Cases"
  } else {
    barTitle = "Death"
    lineTitle = "Deaths"
  }
  return (
    <div className="row mt-3">
      <div className="col-md-6 top-chart-c">
        <div className="top-chart">
          <div className="chart-title-sect">
            <h5>{props.stateName} {barTitle} Totals</h5>
            <i onClick={toggleBarChartDisplay} id="state-bar-collapse-icon" class="fas fa-chevron-down chart-toggle-icon"/>
          </div>
          <div id="state-bar-chart-container">
            <StateBarCharts
              display = {props.display}
              stateName = {props.stateName}
              stateAbbrev = {props.stateAbbrev}
              mostRecentData = {props.mostRecentData}
              nationalAvgs = {props.nationalAvgs}
              />
          </div>
        </div>
      </div>
      <div className="col-md-6 top-chart-c">
        <div className="top-chart">
          <div className="chart-title-sect">
            <h5>{props.stateName} {lineTitle} Over Time</h5>
            <input type="range" min="1" max="3" defaultValue="2"/>
            <i onClick={toggleLineChartDisplay} id="state-line-collapse-icon" class="fas fa-chevron-down chart-toggle-icon"/>
          </div>
          <div id="state-line-chart-container">
            <StateLineCharts
              display = {props.display}
              stateName = {props.stateName}
              stateAbbrev = {props.stateAbbrev}
              stateData = {props.stateData}
              mostRecentData = {props.mostRecentData}
              nationalAvgs = {props.nationalAvgs}
              nationalData = {props.nationalData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StateChartContainer;