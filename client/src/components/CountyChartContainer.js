import React, {useState} from 'react'
import CountyBarCharts from "./CountyBarCharts";
import CountyLineCharts from "./CountyLineCharts";
import $ from "jquery";

const CountyChartContainer = (props) => {
  let returnVal;

  const [showBarChart, setShowBarChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);

  let barTitle;
  let lineTitle;

  const toggleBarChartDisplay = () => {
    if (showBarChart){
      $("#county-bar-collapse-icon").css("transform", "rotate(90deg)");
      setShowBarChart(false);
      $("#county-bar-chart-container").hide();
    } else {
      $("#county-bar-collapse-icon").css("transform", "rotate(0deg)");
      setShowBarChart(true);
      $("#county-bar-chart-container").show();
    }
  }

  const toggleLineChartDisplay = () => {
    if (showLineChart){
      $("#county-line-collapse-icon").css("transform", "rotate(90deg)");
      setShowLineChart(false);
      $("#county-line-chart-container").hide();
    } else {
      $("#county-line-collapse-icon").css("transform", "rotate(0deg)");
      setShowLineChart(true);
      $("#county-line-chart-container").show();
    }
  }

  if (props.display === "cases"){
    barTitle = `${props.countyName} County Case Totals`;
    lineTitle = `${props.countyName} County Cases Over Time`;
  } else if (props.display === "deaths") {
    barTitle = `${props.countyName} County Death Totals`;
    lineTitle = `${props.countyName} County Deaths Over Time`;
  }

  if (props.countyData.length < 7){
    lineTitle = "";
  }

  if (props.stateName === "District of Columbia" || props.stateName === "Guam" || props.stateName === "Virgin Islands"){
    returnVal = <div className="col-12">
      <h3 className="text-center">County data unavailable for {props.stateName}</h3>
    </div>
  } else {
    returnVal = (
    <div className="row mt-3">
      <div className="col-md-6 top-chart-c">
        <div className="top-chart">
          <div className="chart-title-sect">
            <h5>{barTitle}</h5>
            <i onClick={toggleBarChartDisplay} id="county-bar-collapse-icon" class="fas fa-chevron-down chart-toggle-icon"/>
          </div>
          <div id="county-bar-chart-container">
            <CountyBarCharts
              display = {props.display}
              stateName = {props.stateName}
              stateAbbrev = {props.stateAbbrev}
              mostRecentData = {props.mostRecentData}
              counties = {props.counties}
              countyName = {props.countyName}
              countyData = {props.countyData}
              stateAvgs = {props.stateAvgs}
            />
          </div>
        </div>
      </div>
      <div className="col-md-6 top-chart-c">
        <div className="top-chart">
          <div className="chart-title-sect">
            <h5>{lineTitle}</h5>
            <i onClick={toggleLineChartDisplay} id="county-line-collapse-icon" class="fas fa-chevron-down chart-toggle-icon"/>
          </div>
          <div id="county-line-chart-container">
            <CountyLineCharts
              display = {props.display}
              stateName = {props.stateName}
              stateAbbrev = {props.stateAbbrev}
              mostRecentData = {props.mostRecentData}
              counties = {props.counties}
              countyName = {props.countyName}
              countyData = {props.countyData}
              stateAvgs = {props.stateAvgs}
            />
          </div>
        </div>
      </div>
    </div>
    )
  }
  return returnVal;
}

export default CountyChartContainer;