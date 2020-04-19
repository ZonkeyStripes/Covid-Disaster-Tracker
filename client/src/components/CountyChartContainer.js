import React from 'react'
import CountyBarCharts from "./CountyBarCharts";
import CountyPieChart from "./CountyPieChart";
import CountyDoughnutChart from "./CountyDoughnutChart";

const CountyChartContainer = (props) => {
  let returnVal;
  if (props.stateName === "District of Columbia" || props.stateName === "Guam" || props.stateName === "Virgin Islands"){
    returnVal = <div className="col-12">
      <h3 className="text-center">County data unavailable for {props.stateName}</h3>
    </div>
  } else {
    returnVal = (
    <div className="row mt-3">
      <div className="col-6">
        <CountyBarCharts
          display = {props.display}
          stateName = {props.stateName}
          mostRecentData = {props.mostRecentData}
          counties = {props.counties}
          countyName = {props.countyName}
          countyData = {props.countyData}
          stateAvgs = {props.stateAvgs}
        />
      </div>
      <div className="col-3">
        <CountyPieChart
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
      <div className="col-3">
        <CountyDoughnutChart
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
    )
  }
  return returnVal;
}

export default CountyChartContainer;