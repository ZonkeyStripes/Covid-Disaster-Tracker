import React, {useState} from 'react'
import CountyBarCharts from "./CountyBarCharts";
import CountyLineCharts from "./CountyLineCharts";
import $ from "jquery";

const CountyChartContainer = ({display, countyName, countyData, counties, stateName, stateAbbrev, mostRecentData, stateAvgs}) => {
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

  if (display === "cases"){
    barTitle = `${countyName} County Case Totals`;
    lineTitle = `${countyName} County Cases Over Time`;
  } else if (display === "deaths") {
    barTitle = `${countyName} County Death Totals`;
    lineTitle = `${countyName} County Deaths Over Time`;
  }

  if (countyData.length < 7){
    lineTitle = "";
  }

  if (stateName === "District of Columbia" || stateName === "Guam" || stateName === "Virgin Islands"){
    returnVal = <div className="col-12">
      <h3 className="text-center mt-3">County data unavailable for {stateName}</h3>
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
              display = {display}
              stateName = {stateName}
              stateAbbrev = {stateAbbrev}
              mostRecentData = {mostRecentData}
              counties = {counties}
              countyName = {countyName}
              countyData = {countyData}
              stateAvgs = {stateAvgs}
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
              display = {display}
              stateName = {stateName}
              stateAbbrev = {stateAbbrev}
              mostRecentData = {mostRecentData}
              counties = {counties}
              countyName = {countyName}
              countyData = {countyData}
              stateAvgs = {stateAvgs}
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