import React, {useState, useContext, useEffect} from 'react';
import {Context} from "../utils/stateContext";
import CountyChartContainer from "./CountyChartContainer";
import StateChartContainer from "./StateChartContainer";

import nationalData from "../utils/json/us.json";
import statesData from "../utils/json/us-states.json";
import countiesData from "../utils/json/us-counties.json";
import stateNames from "../utils/json/state-names-&-abbrevs.json";
import $ from "jquery";

function ChartContainer(props) {

  const getCounties = (state) => {
    let setOfCounties = new Set(); //Using a set to ensure that duplicate counties aren't added
    for (let i = 0; i < countiesData.length; i++){
      if (countiesData[i].state === state && countiesData[i].county !== "Unknown"){
        setOfCounties.add(countiesData[i].county);
      }
    }
    return Array.from(setOfCounties).sort();
  }

  const [display, setDisplay] = useState("cases")
  const [selectedState, setSelectedState] = useState(stateNames[0].state)
  // const [selectedState, setSelectedState] = useState(props.rdStateName);
  const [selectedStateAb, setSelectedStateAb] = useState(stateNames[0].code)
  const [stateDataObj, setStateDataObj] = useState(statesData.filter(st => st.state === stateNames[0].state));
  const [countiesToShow, setCountiesToShow] = useState(getCounties(selectedState));
  const [selectedCounty, setSelectedCounty] = useState(countiesToShow[0]);
  const [countyData, setCountyData] = useState(countiesData.filter(i => i.state === selectedState && i.county === selectedCounty));

  useEffect(() => {
    
    console.log("ASDFADSGDF");
    console.log(props.rdStateName.stateName);
    thing();
  });

  const thing = () => {
    if (props.rdStateName.ur === false){
      handleButtonStateChange(props.rdStateName.stateName);
    }
  }

  const [myState, myDispatch] = useContext(Context);
  
  //Returns array all county names in a given state
  
  
  console.log("SELECTED: " + selectedState)

  // Calculates the per-state average and median of COVID-19 data in the US
  const getNationalAvg = () => {
    let totalCases = nationalData[nationalData.length-1].cases;
    let totalDeaths = nationalData[nationalData.length-1].deaths;
    let casesByStateDateOne = [];
    let casesByStateDateTwo = [];
    let casesByStateDateThree = [];
    let casesByStateDateFour = [];
    let deathsByStateDateOne = [];
    let deathsByStateDateTwo = [];
    let deathsByStateDateThree = [];
    let deathsByStateDateFour = [];
    let loopState;

    for (let i = 0; i < stateNames.length; i++){
      loopState = statesData.filter(st => st.state === stateNames[i].state);

      casesByStateDateOne.push(loopState[loopState.length-22].cases);
      casesByStateDateTwo.push(loopState[loopState.length-15].cases);
      casesByStateDateThree.push(loopState[loopState.length-8].cases);
      casesByStateDateFour.push(loopState[loopState.length-1].cases);

      deathsByStateDateOne.push(loopState[loopState.length-22].deaths);
      deathsByStateDateTwo.push(loopState[loopState.length-15].deaths);
      deathsByStateDateThree.push(loopState[loopState.length-8].deaths);
      deathsByStateDateFour.push(loopState[loopState.length-1].deaths);
    }

    // Sorting arrays
    casesByStateDateOne.sort(function(a, b){return a - b});
    casesByStateDateTwo.sort(function(a, b){return a - b});
    casesByStateDateThree.sort(function(a, b){return a - b});
    casesByStateDateFour.sort(function(a, b){return a - b});

    deathsByStateDateOne.sort(function(a, b){return a - b});
    deathsByStateDateTwo.sort(function(a, b){return a - b});
    deathsByStateDateThree.sort(function(a, b){return a - b});
    deathsByStateDateFour.sort(function(a, b){return a - b});

    return {
      // Using 53 instead of 50 to account for Guam, DC, & Virgin Islands
      avgCases: Math.round(totalCases / 53), 
      avgDeaths: Math.round(totalDeaths / 53),
      dateAvgs: {
        cases: {
          one: Math.round(nationalData[nationalData.length-22].cases / 53),
          two: Math.round(nationalData[nationalData.length-15].cases / 53),
          three: Math.round(nationalData[nationalData.length-8].cases / 53),
          four: Math.round(nationalData[nationalData.length-1].cases / 53)
        },
        deaths: {
          one: Math.round(nationalData[nationalData.length-22].deaths / 53),
          two: Math.round(nationalData[nationalData.length-15].deaths / 53),
          three: Math.round(nationalData[nationalData.length-8].deaths / 53),
          four: Math.round(nationalData[nationalData.length-1].deaths / 53)
        }
      },
      medianCases: casesByStateDateFour[26],
      medianDeaths: deathsByStateDateFour[26],
      dateMedians: {
        cases: {
          one: casesByStateDateOne[26],
          two: casesByStateDateTwo[26],
          three: casesByStateDateThree[26],
          four: casesByStateDateFour[26]
        },
        deaths: {
          one: deathsByStateDateOne[26],
          two: deathsByStateDateTwo[26],
          three: deathsByStateDateThree[26],
          four: deathsByStateDateFour[26]
        }
      }
    };
  };

  // Calculates the per-county average and median of COVID-19 data in a given state
  const getStateAvg = () => {
    let loopCounty;
    let loopCountyCheck;
    let totalCases = 0;
    let totalDeaths = 0;
    let casesByCounty = [];
    let deathsByCounty = [];
    let casesByCountyWithNames = [];
    let deathsByCountyWithNames = [];

    let casesByCountyDateOne = [];
    let casesByCountyDateTwo = [];
    let casesByCountyDateThree = [];
    let casesByCountyDateFive = [];
    let casesByCountyDateSix = [];
    let casesByCountyDateSeven = [];
    let casesByCountyDateFour = [];

    let deathsByCountyDateOne = [];
    let deathsByCountyDateTwo = [];
    let deathsByCountyDateThree = [];
    let deathsByCountyDateFour = [];
    let deathsByCountyDateFive = [];
    let deathsByCountyDateSix = [];
    let deathsByCountyDateSeven = [];

    let stateWideCasesDateOne = 0;
    let stateWideCasesDateTwo = 0;
    let stateWideCasesDateThree = 0;
    let stateWideCasesDateFour = 0;
    let stateWideCasesDateFive = 0;
    let stateWideCasesDateSix = 0;
    let stateWideCasesDateSeven = 0;

    let stateWideDeathsDateOne = 0;
    let stateWideDeathsDateTwo = 0;
    let stateWideDeathsDateThree = 0;
    let stateWideDeathsDateFour = 0;
    let stateWideDeathsDateFive = 0;
    let stateWideDeathsDateSix = 0;
    let stateWideDeathsDateSeven = 0;

    let mdnCases;
    let mdnDeaths;

    let mdnCasesDateOne;
    let mdnCasesDateTwo;
    let mdnCasesDateThree;
    let mdnCasesDateFour;
    let mdnCasesDateFive;
    let mdnCasesDateSix;
    let mdnCasesDateSeven;

    let mdnDeathsDateOne;
    let mdnDeathsDateTwo;
    let mdnDeathsDateThree;
    let mdnDeathsDateFour;
    let mdnDeathsDateFive;
    let mdnDeathsDateSix;
    let mdnDeathsDateSeven;

    for (let i = 0; i < countiesToShow.length; i++){
      // loopCounty = countiesData.filter(item => item.county === countiesToShow[i]);
      // loopCountyCheck = loopCounty.filter(item => item.state === selectedState);
      loopCountyCheck = countiesData.filter(item => item.state === selectedState && item.county === countiesToShow[i]);
      totalCases += loopCountyCheck[loopCountyCheck.length-1].cases;
      totalDeaths += loopCountyCheck[loopCountyCheck.length-1].deaths;

      let d1cases;
      let d2cases;
      let d3cases;
      let d4cases;
      let d5cases;
      let d6cases;
      let d7cases;

      let d1deaths;
      let d2deaths;
      let d3deaths;
      let d4deaths;
      let d5deaths;
      let d6deaths;
      let d7deaths;

      if (loopCountyCheck.length >= 7){
        d1cases = loopCountyCheck[loopCountyCheck.length-7].cases;
        d2cases = loopCountyCheck[loopCountyCheck.length-6].cases;
        d3cases = loopCountyCheck[loopCountyCheck.length-5].cases;
        d4cases = loopCountyCheck[loopCountyCheck.length-4].cases;
        d5cases = loopCountyCheck[loopCountyCheck.length-3].cases;
        d6cases = loopCountyCheck[loopCountyCheck.length-2].cases;
        d7cases = loopCountyCheck[loopCountyCheck.length-1].cases;
  
        d1deaths = loopCountyCheck[loopCountyCheck.length-7].deaths;
        d2deaths = loopCountyCheck[loopCountyCheck.length-6].deaths;
        d3deaths = loopCountyCheck[loopCountyCheck.length-5].deaths;
        d4deaths = loopCountyCheck[loopCountyCheck.length-4].deaths;
        d5deaths = loopCountyCheck[loopCountyCheck.length-3].deaths;
        d6deaths = loopCountyCheck[loopCountyCheck.length-2].deaths;
        d7deaths = loopCountyCheck[loopCountyCheck.length-1].deaths;
      }
      if (loopCountyCheck.length === 6){
        d1cases = 0;
        d2cases = loopCountyCheck[loopCountyCheck.length-6].cases;
        d3cases = loopCountyCheck[loopCountyCheck.length-5].cases;
        d4cases = loopCountyCheck[loopCountyCheck.length-4].cases;
        d5cases = loopCountyCheck[loopCountyCheck.length-3].cases;
        d6cases = loopCountyCheck[loopCountyCheck.length-2].cases;
        d7cases = loopCountyCheck[loopCountyCheck.length-1].cases;

        d1deaths = 0;
        d2deaths = loopCountyCheck[loopCountyCheck.length-6].deaths;
        d3deaths = loopCountyCheck[loopCountyCheck.length-5].deaths;
        d4deaths = loopCountyCheck[loopCountyCheck.length-4].deaths;
        d5deaths = loopCountyCheck[loopCountyCheck.length-3].deaths;
        d6deaths = loopCountyCheck[loopCountyCheck.length-2].deaths;
        d7deaths = loopCountyCheck[loopCountyCheck.length-1].deaths;
      } else if (loopCountyCheck.length === 5){
        d1cases = 0;
        d2cases = 0;
        d3cases = loopCountyCheck[loopCountyCheck.length-5].cases;
        d4cases = loopCountyCheck[loopCountyCheck.length-4].cases;
        d5cases = loopCountyCheck[loopCountyCheck.length-3].cases;
        d6cases = loopCountyCheck[loopCountyCheck.length-2].cases;
        d7cases = loopCountyCheck[loopCountyCheck.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = loopCountyCheck[loopCountyCheck.length-5].deaths;
        d4deaths = loopCountyCheck[loopCountyCheck.length-4].deaths;
        d5deaths = loopCountyCheck[loopCountyCheck.length-3].deaths;
        d6deaths = loopCountyCheck[loopCountyCheck.length-2].deaths;
        d7deaths = loopCountyCheck[loopCountyCheck.length-1].deaths;
        
      } else if (loopCountyCheck.length === 4){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = loopCountyCheck[loopCountyCheck.length-4].cases;
        d5cases = loopCountyCheck[loopCountyCheck.length-3].cases;
        d6cases = loopCountyCheck[loopCountyCheck.length-2].cases;
        d7cases = loopCountyCheck[loopCountyCheck.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = loopCountyCheck[loopCountyCheck.length-4].deaths;
        d5deaths = loopCountyCheck[loopCountyCheck.length-3].deaths;
        d6deaths = loopCountyCheck[loopCountyCheck.length-2].deaths;
        d7deaths = loopCountyCheck[loopCountyCheck.length-1].deaths;
        
      } else if (loopCountyCheck.length === 3){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = 0;
        d5cases = loopCountyCheck[loopCountyCheck.length-3].cases;
        d6cases = loopCountyCheck[loopCountyCheck.length-2].cases;
        d7cases = loopCountyCheck[loopCountyCheck.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = 0;
        d5deaths = loopCountyCheck[loopCountyCheck.length-3].deaths;
        d6deaths = loopCountyCheck[loopCountyCheck.length-2].deaths;
        d7deaths = loopCountyCheck[loopCountyCheck.length-1].deaths;
        
      } else if (loopCountyCheck.length === 2){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = 0;
        d5cases = 0;
        d6cases = loopCountyCheck[loopCountyCheck.length-2].cases;
        d7cases = loopCountyCheck[loopCountyCheck.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = 0;
        d5deaths = 0;
        d6deaths = loopCountyCheck[loopCountyCheck.length-2].deaths;
        d7deaths = loopCountyCheck[loopCountyCheck.length-1].deaths;
        
      } else if (loopCountyCheck.length === 1){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = 0;
        d5cases = 0;
        d6cases = 0;
        d7cases = loopCountyCheck[loopCountyCheck.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = 0;
        d5deaths = 0;
        d6deaths = 0;
        d7deaths = loopCountyCheck[loopCountyCheck.length-1].deaths;
      }
      stateWideCasesDateOne += d1cases;
      stateWideCasesDateTwo += d2cases;
      stateWideCasesDateThree += d3cases;
      stateWideCasesDateFour += d4cases;
      stateWideCasesDateFive += d5cases;
      stateWideCasesDateSix += d6cases;
      stateWideCasesDateSeven += d7cases;

      stateWideDeathsDateOne += d1deaths;
      stateWideDeathsDateTwo += d2deaths;
      stateWideDeathsDateThree += d3deaths;
      stateWideDeathsDateFour += d4deaths;
      stateWideDeathsDateFive += d5deaths;
      stateWideDeathsDateSix += d6deaths;
      stateWideDeathsDateSeven += d7deaths;

      // FOR MEDIAN PURPOSES
      casesByCountyDateOne.push(d1cases);
      casesByCountyDateTwo.push(d2cases);
      casesByCountyDateThree.push(d3cases);
      casesByCountyDateFour.push(d4cases);
      casesByCountyDateFive.push(d5cases);
      casesByCountyDateSix.push(d6cases);
      casesByCountyDateSeven.push(d7cases);

      deathsByCountyDateOne.push(d1deaths);
      deathsByCountyDateTwo.push(d2deaths);
      deathsByCountyDateThree.push(d3deaths);
      deathsByCountyDateFour.push(d4deaths);
      deathsByCountyDateFive.push(d5deaths);
      deathsByCountyDateSix.push(d6deaths);
      deathsByCountyDateSeven.push(d7deaths);

      casesByCounty.push(loopCountyCheck[loopCountyCheck.length-1].cases);
      deathsByCounty.push(loopCountyCheck[loopCountyCheck.length-1].deaths);
      casesByCountyWithNames.push({
        state: loopCountyCheck[loopCountyCheck.length-1].state,
        county: loopCountyCheck[loopCountyCheck.length-1].county,
        cases: loopCountyCheck[loopCountyCheck.length-1].cases
      });
      deathsByCountyWithNames.push({
        county: loopCountyCheck[loopCountyCheck.length-1].county,
        deaths: loopCountyCheck[loopCountyCheck.length-1].deaths
      });
    }

    // Sorting arrays
    casesByCountyDateOne.sort(function(a, b){return a - b});
    casesByCountyDateTwo.sort(function(a, b){return a - b});
    casesByCountyDateThree.sort(function(a, b){return a - b});
    casesByCountyDateFour.sort(function(a, b){return a - b});
    casesByCountyDateFive.sort(function(a, b){return a - b});
    casesByCountyDateSix.sort(function(a, b){return a - b});
    casesByCountyDateSeven.sort(function(a, b){return a - b});

    deathsByCountyDateOne.sort(function(a, b){return a - b});
    deathsByCountyDateTwo.sort(function(a, b){return a - b});
    deathsByCountyDateThree.sort(function(a, b){return a - b});
    deathsByCountyDateFour.sort(function(a, b){return a - b});
    deathsByCountyDateFive.sort(function(a, b){return a - b});
    deathsByCountyDateSix.sort(function(a, b){return a - b});
    deathsByCountyDateSeven.sort(function(a, b){return a - b});

    casesByCounty.sort(function(a, b){return a-b});
    deathsByCounty.sort(function(a, b){return a-b});

    casesByCountyWithNames.sort((a, b) => (a.cases < b.cases) ? 1 : (a.cases === b.cases) ? ((a.state > b.state) ? 1 : -1) : -1 );

    deathsByCountyWithNames.sort((a, b) => (a.deaths < b.deaths) ? 1 : (a.deaths === b.deaths) ? ((a.state > b.state) ? 1 : -1) : -1 );

    // Calculating median cases and deaths
    if (countiesToShow.length % 2){ // Calculating per-county state median if # of counties is odd
      mdnCases = casesByCounty[Math.round(casesByCounty.length / 2)-1];
      mdnDeaths = deathsByCounty[Math.round(deathsByCounty.length / 2)-1];

      mdnCasesDateOne = casesByCountyDateOne[Math.round(casesByCountyDateOne.length / 2)-1];
      mdnCasesDateTwo = casesByCountyDateTwo[Math.round(casesByCountyDateTwo.length / 2)-1];
      mdnCasesDateThree = casesByCountyDateThree[Math.round(casesByCountyDateThree.length / 2)-1];
      mdnCasesDateFour = casesByCountyDateFour[Math.round(casesByCountyDateFour.length / 2)-1];
      mdnCasesDateFive = casesByCountyDateFive[Math.round(casesByCountyDateFive.length / 2)-1];
      mdnCasesDateSix = casesByCountyDateSix[Math.round(casesByCountyDateSix.length / 2)-1];
      mdnCasesDateSeven = casesByCountyDateSeven[Math.round(casesByCountyDateSeven.length / 2)-1];

      mdnDeathsDateOne = deathsByCountyDateOne[Math.round(deathsByCountyDateOne.length / 2)-1];
      mdnDeathsDateTwo = deathsByCountyDateTwo[Math.round(deathsByCountyDateTwo.length / 2)-1];
      mdnDeathsDateThree = deathsByCountyDateThree[Math.round(deathsByCountyDateThree.length / 2)-1];
      mdnDeathsDateFour = deathsByCountyDateFour[Math.round(deathsByCountyDateFour.length / 2)-1];
      mdnDeathsDateFive = deathsByCountyDateFive[Math.round(deathsByCountyDateFive.length / 2)-1];
      mdnDeathsDateSix = deathsByCountyDateSix[Math.round(deathsByCountyDateSix.length / 2)-1];
      mdnDeathsDateSeven = deathsByCountyDateSeven[Math.round(deathsByCountyDateSeven.length / 2)-1];
    } else { // Calculating per-county state median if # of counties is even
      mdnCases = (casesByCounty[(casesByCounty.length / 2)-1] + casesByCounty[casesByCounty.length / 2]) / 2;
      mdnDeaths = (deathsByCounty[(deathsByCounty.length / 2)-1] + deathsByCounty[deathsByCounty.length / 2]) / 2;

      mdnCasesDateOne = (casesByCountyDateOne[(casesByCountyDateOne.length / 2)-1] + casesByCountyDateOne[casesByCountyDateOne.length / 2]) / 2;

      mdnCasesDateTwo = (casesByCountyDateTwo[(casesByCountyDateTwo.length / 2)-1] + casesByCountyDateTwo[casesByCountyDateTwo.length / 2]) / 2;

      mdnCasesDateThree = (casesByCountyDateThree[(casesByCountyDateThree.length / 2)-1] + casesByCountyDateThree[casesByCountyDateThree.length / 2]) / 2;

      mdnCasesDateFour = (casesByCountyDateFour[(casesByCountyDateFour.length / 2)-1] + casesByCountyDateFour[casesByCountyDateFour.length / 2]) / 2;

      mdnCasesDateFive = (casesByCountyDateFive[(casesByCountyDateFive.length / 2)-1] + casesByCountyDateFive[casesByCountyDateFive.length / 2]) / 2;

      mdnCasesDateSix = (casesByCountyDateSix[(casesByCountyDateSix.length / 2)-1] + casesByCountyDateSix[casesByCountyDateSix.length / 2]) / 2;

      mdnCasesDateSeven = (casesByCountyDateSeven[(casesByCountyDateSeven.length / 2)-1] + casesByCountyDateSeven[casesByCountyDateSeven.length / 2]) / 2;

      mdnDeathsDateOne = (deathsByCountyDateOne[(deathsByCountyDateOne.length / 2)-1] + deathsByCountyDateOne[deathsByCountyDateOne.length / 2]) / 2;

      mdnDeathsDateTwo = (deathsByCountyDateTwo[(deathsByCountyDateTwo.length / 2)-1] + deathsByCountyDateTwo[deathsByCountyDateTwo.length / 2]) / 2;

      mdnDeathsDateThree = (deathsByCountyDateThree[(deathsByCountyDateThree.length / 2)-1] + deathsByCountyDateThree[deathsByCountyDateThree.length / 2]) / 2;

      mdnDeathsDateFour = (deathsByCountyDateFour[(deathsByCountyDateFour.length / 2)-1] + deathsByCountyDateFour[deathsByCountyDateFour.length / 2]) / 2;

      mdnDeathsDateFive = (deathsByCountyDateFive[(deathsByCountyDateFive.length / 2)-1] + deathsByCountyDateFive[deathsByCountyDateFive.length / 2]) / 2;

      mdnDeathsDateSix = (deathsByCountyDateSix[(deathsByCountyDateSix.length / 2)-1] + deathsByCountyDateSix[deathsByCountyDateSix.length / 2]) / 2;

      mdnDeathsDateSeven = (deathsByCountyDateSeven[(deathsByCountyDateSeven.length / 2)-1] + deathsByCountyDateSeven[deathsByCountyDateSeven.length / 2]) / 2;
    }

    return {
      casesByCountyWithNames,
      deathsByCountyWithNames,
      avgCases: Math.round(totalCases / countiesToShow.length),
      avgDeaths: Math.round(totalDeaths / countiesToShow.length),
      dateAvgs: {
        cases: [
          Math.round(stateWideCasesDateOne / countiesToShow.length),
          Math.round(stateWideCasesDateTwo / countiesToShow.length),
          Math.round(stateWideCasesDateThree / countiesToShow.length),
          Math.round(stateWideCasesDateFour / countiesToShow.length),
          Math.round(stateWideCasesDateFive / countiesToShow.length),
          Math.round(stateWideCasesDateSix / countiesToShow.length),
          Math.round(stateWideCasesDateSeven / countiesToShow.length)
        ],
        deaths: [
          Math.round(stateWideDeathsDateOne / countiesToShow.length),
          Math.round(stateWideDeathsDateTwo / countiesToShow.length),
          Math.round(stateWideDeathsDateThree / countiesToShow.length),
          Math.round(stateWideDeathsDateFour / countiesToShow.length),
          Math.round(stateWideDeathsDateFive / countiesToShow.length),
          Math.round(stateWideDeathsDateSix / countiesToShow.length),
          Math.round(stateWideDeathsDateSeven / countiesToShow.length)
        ]
      },
      medianCases: mdnCases,
      medianDeaths: mdnDeaths,
      dateMedians: {
        cases: [
          mdnCasesDateOne,
          mdnCasesDateTwo,
          mdnCasesDateThree,
          mdnCasesDateFour,
          mdnCasesDateFive,
          mdnCasesDateSix,
          mdnCasesDateSeven
        ],
        deaths: [
          mdnDeathsDateOne,
          mdnDeathsDateTwo,
          mdnDeathsDateThree,
          mdnDeathsDateFour,
          mdnDeathsDateFive,
          mdnDeathsDateSix,
          mdnDeathsDateSeven
        ]
      }
    };
  };

  // Runs whenever there's a change in the state dropdown menu
  const handleStateChange = e => {
    let indexToRender = countiesToShow.indexOf(selectedCounty);

    let counties = getCounties(e.target.value);
    setSelectedState(e.target.value);
    for (let i = 0; i < stateNames.length; i++){
      if (stateNames[i].state === e.target.value){
        setSelectedStateAb(stateNames[i].code);
      }
    }
    setStateDataObj(statesData.filter(st => st.state === e.target.value))
    setCountiesToShow(counties);
    if (indexToRender === -1 || indexToRender > counties.length-1){
      indexToRender = 0;
    }
    setSelectedCounty(counties[indexToRender]);
    setCountyData(countiesData.filter(i => i.state === e.target.value && i.county === counties[indexToRender]));

    myDispatch({
      type: "get_state_data",
      payload: {
        stateName: e.target.value,
        ur: false
        // stateAbbrev: selectedStateAb,
        // stateData: statesData.filter(st => st.state === e.target.value),
        // counties: counties,
        // countyName: counties[indexToRender],
        // countyData: countiesData.filter(i => i.state === e.target.value && i.county === counties[indexToRender])
      }
    })
  }
  
  // Runs whenever there's a change in the county dropdown menu
  const handleCountyChange = e => {
    setSelectedCounty(e.target.value);
    setCountyData(countiesData.filter(i => i.state === selectedState && i.county === e.target.value));
    
    myDispatch({
      type: "get_county_data",
      payload: {
        countyName: e.target.value,
        countyData: countiesData.filter(i => i.state === selectedState && i.county === e.target.value)
      }
    })
  }



  const handleButtonStateChange = (staate) => {
    let indexToRender = countiesToShow.indexOf(selectedCounty);

    let counties = getCounties(staate);
    setSelectedState(staate);
    for (let i = 0; i < stateNames.length; i++){
      if (stateNames[i].state === staate){
        setSelectedStateAb(stateNames[i].code);
      }
    }
    setStateDataObj(statesData.filter(st => st.state === staate))
    setCountiesToShow(counties);
    if (indexToRender === -1 || indexToRender > counties.length-1){
      indexToRender = 0;
    }
    setSelectedCounty(counties[indexToRender]);
    setCountyData(countiesData.filter(i => i.state === staate && i.county === counties[indexToRender]));

    myDispatch({
      type: "get_state_data",
      payload: {
        stateName: staate,
        ur: false
      }
    })
  }

  
  const displayDeaths = () => {
    if (display === "cases"){
      setDisplay("deaths");
      $("#btn-cases").toggleClass("btn-chart");
      $("#btn-cases").toggleClass("btn-chart-outline");
      $("#btn-deaths").toggleClass("btn-chart");
      $("#btn-deaths").toggleClass("btn-chart-outline");
    }
  }

  const displayCases = () => {
    if (display === "deaths"){
      setDisplay("cases");
      $("#btn-cases").toggleClass("btn-chart");
      $("#btn-cases").toggleClass("btn-chart-outline");
      $("#btn-deaths").toggleClass("btn-chart");
      $("#btn-deaths").toggleClass("btn-chart-outline");
    }
  }

  return (
    <div id="chart-stuff" className="mt-5">
      <div className="container">
        <div id="chart-stuff-top">
          <div className="row" id="chart-sect-header">
            <div className="col-4 p-0">
              <h3>COVID-19 State Summary</h3>
            </div>
            <div className="col-4">
              <div className="input-group" id="table-btn-container">
                <div className="input-group-prepend">
                  <button id="btn-cases" onClick={displayCases} className="btn btn-chart">Cases</button>
                </div>
                <div className="input-group-append">
                  <button id="btn-deaths" onClick={displayDeaths} className="btn btn-chart-outline">Deaths</button>
                </div>
              </div>
            </div>
            <div className="col-4">
              {/* <label htmlFor="state">State</label> */}
              <div className="row">
                <div className="col-6">
                  <select onChange={handleStateChange} class="form-control" id="stateSelect">
                    {stateNames.map(name => (
                      <option>{name.state}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <select onChange={handleCountyChange} class="form-control" id="countySelect">
                  {countiesToShow.map(county => (
                      <option>{county}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <StateChartContainer
            display = {display}
            stateName = {selectedState}
            stateAbbrev = {selectedStateAb}
            stateData = {stateDataObj}
            mostRecentData = {stateDataObj[stateDataObj.length-1]}
            nationalAvgs = {getNationalAvg()}
            nationalData = {nationalData}
          />
        </div>
        <div id="chart-stuff-bottom">
          <CountyChartContainer
            display = {display}
            stateName = {selectedState}
            stateAbbrev = {selectedStateAb}
            mostRecentData = {stateDataObj[stateDataObj.length-1]}
            counties = {countiesToShow}
            countyName = {selectedCounty}
            countyData = {countyData}
            stateAvgs = {getStateAvg()}
            display = {display}
          />
        </div>
      </div>
    </div>
  );
}

export default ChartContainer;