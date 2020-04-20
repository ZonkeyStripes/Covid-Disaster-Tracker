import React from 'react'
import CountyBarCharts from "./CountyBarCharts";
import CountyPieChart from "./CountyPieChart";
import CountyDoughnutChart from "./CountyDoughnutChart";
import CountyLineCharts from "./CountyLineCharts";

const CountyChartContainer = (props) => {
  let returnVal;

  let barTitle;
  let lineTitle;

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
      <div className="col-6 top-chart-c">
        <div className="top-chart">
          <h5>{barTitle}</h5>
          {/* <h5>{props.countyName} County {barTitle} Totals</h5> */}
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
      <div className="col-6 top-chart-c">
        <div className="top-chart">
          <h5>{lineTitle}</h5>
          {/* <h5>{props.countyName} County {lineTitle} Over Time</h5> */}
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
    )
  }
  return returnVal;
}

export default CountyChartContainer;