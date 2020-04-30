import React, {useState} from 'react'
import StateBarCharts from "./StateBarCharts";
import StateLineCharts from "./StateLineCharts";
import $ from "jquery";

const StateChartContainer = (props) => {
  
  const [showBarChart, setShowBarChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);
  const [range, setRange] = useState("4 Weeks");
  const [viewBy, setViewBy] = useState("Totals");
  let perData = [
    (props.mostRecentData.cases/props.statePopulation) * 1000,
    (props.nationalData[props.nationalData.length-1].cases/328239523) * 1000
  ];

  let barTitle;
  let lineTitle;

  const toggleBarChartDisplay = () => {
    if (showBarChart){
      setShowBarChart(false);
      $("#state-bar-collapse-icon").css("transform", "rotate(90deg)");
      $("#state-bar-chart-container").hide();
      $("#view-by-container").hide();
    } else {
      setShowBarChart(true);
      $("#state-bar-collapse-icon").css("transform", "rotate(0deg)");
      $("#state-bar-chart-container").show();
      $("#view-by-container").show();
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

  const handleViewByChange = e => {    
    setViewBy(e.target.value);
    if (e.target.value === "Per Hundred Thousand Residents"){
      perData = [
        (props.mostRecentData.deaths/props.statePopulation) * 100000,
        (props.nationalData[props.nationalData.length-1].deaths/328239523) * 100000
      ];
    } else {
      perData = [
        (props.mostRecentData.cases/props.statePopulation) * 1000,
        (props.nationalData[props.nationalData.length-1].cases/328239523) * 1000
      ];
    }
  }

  if (props.display === "cases"){
    if (viewBy === "Per Hundred Thousand Residents"){
      setViewBy("Per Thousand Residents");
    }
    perData = [
      (props.mostRecentData.cases/props.statePopulation) * 1000,
      (props.nationalData[props.nationalData.length-1].cases/328239523) * 1000
    ]
    barTitle = "Case"
    lineTitle = "Cases"
  } else {
    if (viewBy === "Per Thousand Residents"){
      setViewBy("Per Hundred Thousand Residents");
    }
    perData = [
      (props.mostRecentData.deaths/props.statePopulation) * 100000,
      (props.nationalData[props.nationalData.length-1].deaths/328239523) * 100000
    ];
    barTitle = "Death"
    lineTitle = "Deaths"
  }
  return (
    <div className="row mt-3">
      <div className="col-md-6 top-chart-c">
        <div className="top-chart">
          <div className="chart-title-sect">
            <h5>{barTitle} Totals</h5>
            <div id="view-by-container">
              <p className="text-muted" id="view-by-title">View:</p>
              <select id="view-by-dropdown" onChange={handleViewByChange} defaultValue="Totals">
                <option value="Totals">Totals</option>
                <option value={props.ddOptionVal}>{props.ddOptionText}</option>
              </select>
            </div>
            <i onClick={toggleBarChartDisplay} id="state-bar-collapse-icon" class="fas fa-chevron-down chart-toggle-icon"/>
          </div>
          <div id="state-bar-chart-container">
            <StateBarCharts
              display = {props.display}
              viewBy = {viewBy}
              stateName = {props.stateName}
              stateAbbrev = {props.stateAbbrev}
              statePopulation = {props.statePopulation}
              mostRecentData = {props.mostRecentData}
              nationalAvgs = {props.nationalAvgs}
              perData = {perData}
              ntlCasesPerThousand = {
                (props.nationalData[props.nationalData.length-1].cases/328239523) * 1000
              }
              ntlDeathsPerHundredK = {
                (props.nationalData[props.nationalData.length-1].deaths/328239523) * 100000
              }
              stateCasesPerThousand = {
                (props.mostRecentData.cases/props.statePopulation) * 1000
              }
              stateDeathsPerHundredK = {
                (props.mostRecentData.deaths/props.statePopulation) * 100000
              }
            />
          </div>
        </div>
      </div>
      <div className="col-md-6 top-chart-c">
        <div className="top-chart">
          <div className="chart-title-sect">
            <h5>{lineTitle} Over Time</h5>
            <div id="range-container">
              <p className="text-muted" id="range-title">Range:</p>
              <select id="range-dropdown" onChange={handleRangeChange} defaultValue="4 Weeks">
                <option value="1 Week">1 Week</option>
                <option value="2 Weeks">2 Weeks</option>
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
              statePopulation = {props.statePopulation}
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