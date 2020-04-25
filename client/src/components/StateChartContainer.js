import React, {useState} from 'react'
import StateBarCharts from "./StateBarCharts";
import StateLineCharts from "./StateLineCharts";
import $ from "jquery";

const StateChartContainer = (props) => {
  const [showBarChart, setShowBarChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);
  const [range, setRange] = useState("4 Weeks");

  let barTitle;
  let lineTitle;

  const toggleBarChartDisplay = () => {
    if (showBarChart){
      setShowBarChart(false);
      $("#state-bar-collapse-icon").css("transform", "rotate(90deg)");
      $("#state-bar-chart-container").hide();
    } else {
      setShowBarChart(true);
      $("#state-bar-collapse-icon").css("transform", "rotate(0deg)");
      $("#state-bar-chart-container").show();
    }
  }
  
  const toggleLineChartDisplay = () => {
    if (showLineChart){
      setShowLineChart(false);
      $("#state-line-collapse-icon").css("transform", "rotate(90deg)");
      $("#state-line-chart-container").hide();
      $("#range-container").hide();
    } else {
      setShowLineChart(true);
      $("#state-line-collapse-icon").css("transform", "rotate(0deg)");
      $("#state-line-chart-container").show();
      $("#range-container").show();
    }
  }

  const handleRangeChange = e => {    
    setRange(e.target.value);
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
            <div id="range-container">
              <p className="text-muted" id="range-title">Range:</p>
              <select id="range-dropdown" onChange={handleRangeChange} defaultValue="4 Weeks">
                <option value="1 Week">1 Week</option>
                <option value="4 Weeks">4 Weeks</option>
              </select>
            </div>
            <i onClick={toggleLineChartDisplay} id="state-line-collapse-icon" class="fas fa-chevron-down chart-toggle-icon"/>
          </div>
          <div id="state-line-chart-container">
            <StateLineCharts
              display = {props.display}
              range = {range}
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