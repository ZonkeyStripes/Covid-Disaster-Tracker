import React, {useState} from 'react';
import CountyChartContainer from "./CountyChartContainer";
import StateChartContainer from "./StateChartContainer";

import nationalData from "../utils/json/us.json";
import statesData from "../assets/nytimesstate.json";
import countiesData from "../assets/nytimescounties.json";
import stateNames from "../utils/json/state-names-&-abbrevs.json";
import $ from "jquery";

function ChartContainer() {

  //Returns array all county names in a given state
  const getCounties = (state) => {
    let setOfCounties = new Set(); //Using a set to ensure that duplicate counties aren't added
    for (let i = 0; i < countiesData.length; i++){
      if (countiesData[i].state === state && countiesData[i].county !== "Unknown"){
        setOfCounties.add(countiesData[i].county);
      }
    }
    return Array.from(setOfCounties).sort();
  }
  
  const [selectedState, setSelectedState] = useState(stateNames[0].state)
  const [selectedStateAb, setSelectedStateAb] = useState(stateNames[0].code)
  const [selectedStatePop, setSelectedStatePop] = useState(stateNames[0].population)
  const [stateDataObj, setStateDataObj] = useState(statesData.filter(st => st.state === stateNames[0].state));
  const [countiesToShow, setCountiesToShow] = useState(getCounties(selectedState));
  const [selectedCounty, setSelectedCounty] = useState(countiesToShow[0]);
  const [countyData, setCountyData] = useState(countiesData.filter(i => i.state === selectedState && i.county === selectedCounty));
  const [display, setDisplay] = useState("cases");
  const [chartLabel, setChartLabel] = useState("Cases");
  const [ddOptionVal, setDdOptionVal] = useState("Per Thousand Residents");
  const [ddOptionText, setDdOptionText] = useState("Per 1000 Residents");
  
  // Calculates the per-state average and median of COVID-19 data in the US
  const getNationalAvg = () => {
    let totalCases = nationalData[nationalData.length-1].cases;
    let totalDeaths = nationalData[nationalData.length-1].deaths;
    let casesByStateRecent = [];
    let deathsByStateRecent = [];

    let range4CasesByStateDateOne = [];
    let range4CasesByStateDateTwo = [];
    let range4CasesByStateDateThree = [];
    let range4CasesByStateDateFour = [];
    let range4CasesByStateDateFive = [];
    let range4DeathsByStateDateOne = [];
    let range4DeathsByStateDateTwo = [];
    let range4DeathsByStateDateThree = [];
    let range4DeathsByStateDateFour = [];
    let range4DeathsByStateDateFive = [];

    let range2CasesByStateDateOne = [];
    let range2CasesByStateDateTwo = [];
    let range2CasesByStateDateThree = [];
    let range2CasesByStateDateFour = [];
    let range2CasesByStateDateFive = [];
    let range2CasesByStateDateSix = [];
    let range2CasesByStateDateSeven = [];
    let range2CasesByStateDateEight = [];
    let range2DeathsByStateDateOne = [];
    let range2DeathsByStateDateTwo = [];
    let range2DeathsByStateDateThree = [];
    let range2DeathsByStateDateFour = [];
    let range2DeathsByStateDateFive = [];
    let range2DeathsByStateDateSix = [];
    let range2DeathsByStateDateSeven = [];
    let range2DeathsByStateDateEight = [];

    let range1CasesByStateDateOne = [];
    let range1CasesByStateDateTwo = [];
    let range1CasesByStateDateThree = [];
    let range1CasesByStateDateFour = [];
    let range1CasesByStateDateFive = [];
    let range1CasesByStateDateSix = [];
    let range1CasesByStateDateSeven = [];
    let range1CasesByStateDateEight = [];
    let range1DeathsByStateDateOne = [];
    let range1DeathsByStateDateTwo = [];
    let range1DeathsByStateDateThree = [];
    let range1DeathsByStateDateFour = [];
    let range1DeathsByStateDateFive = [];
    let range1DeathsByStateDateSix = [];
    let range1DeathsByStateDateSeven = [];
    let range1DeathsByStateDateEight = [];

    let loopState;

    for (let i = 0; i < stateNames.length; i++){
      loopState = statesData.filter(st => st.state === stateNames[i].state);

      casesByStateRecent.push(loopState[loopState.length-1].cases);
      deathsByStateRecent.push(loopState[loopState.length-1].deaths);

      range4CasesByStateDateOne.push(loopState[loopState.length-29].cases);
      range4CasesByStateDateTwo.push(loopState[loopState.length-22].cases);
      range4CasesByStateDateThree.push(loopState[loopState.length-15].cases);
      range4CasesByStateDateFour.push(loopState[loopState.length-8].cases);
      range4CasesByStateDateFive.push(loopState[loopState.length-1].cases);

      range4DeathsByStateDateOne.push(loopState[loopState.length-29].deaths);
      range4DeathsByStateDateTwo.push(loopState[loopState.length-22].deaths);
      range4DeathsByStateDateThree.push(loopState[loopState.length-15].deaths);
      range4DeathsByStateDateFour.push(loopState[loopState.length-8].deaths);
      range4DeathsByStateDateFive.push(loopState[loopState.length-1].deaths);

      range1CasesByStateDateOne.push(loopState[loopState.length-8].cases)
      range1CasesByStateDateTwo.push(loopState[loopState.length-7].cases)
      range1CasesByStateDateThree.push(loopState[loopState.length-6].cases)
      range1CasesByStateDateFour.push(loopState[loopState.length-5].cases)
      range1CasesByStateDateFive.push(loopState[loopState.length-4].cases)
      range1CasesByStateDateSix.push(loopState[loopState.length-3].cases)
      range1CasesByStateDateSeven.push(loopState[loopState.length-2].cases)
      range1CasesByStateDateEight.push(loopState[loopState.length-1].cases)

      range1DeathsByStateDateOne.push(loopState[loopState.length-8].deaths)
      range1DeathsByStateDateTwo.push(loopState[loopState.length-7].deaths)
      range1DeathsByStateDateThree.push(loopState[loopState.length-6].deaths)
      range1DeathsByStateDateFour.push(loopState[loopState.length-5].deaths)
      range1DeathsByStateDateFive.push(loopState[loopState.length-4].deaths)
      range1DeathsByStateDateSix.push(loopState[loopState.length-3].deaths)
      range1DeathsByStateDateSeven.push(loopState[loopState.length-2].deaths)
      range1DeathsByStateDateEight.push(loopState[loopState.length-1].deaths)

      range2CasesByStateDateOne.push(loopState[loopState.length-15].cases)
      range2CasesByStateDateTwo.push(loopState[loopState.length-13].cases)
      range2CasesByStateDateThree.push(loopState[loopState.length-11].cases)
      range2CasesByStateDateFour.push(loopState[loopState.length-9].cases)
      range2CasesByStateDateFive.push(loopState[loopState.length-7].cases)
      range2CasesByStateDateSix.push(loopState[loopState.length-5].cases)
      range2CasesByStateDateSeven.push(loopState[loopState.length-3].cases)
      range2CasesByStateDateEight.push(loopState[loopState.length-1].cases)

      range2DeathsByStateDateOne.push(loopState[loopState.length-15].deaths)
      range2DeathsByStateDateTwo.push(loopState[loopState.length-13].deaths)
      range2DeathsByStateDateThree.push(loopState[loopState.length-11].deaths)
      range2DeathsByStateDateFour.push(loopState[loopState.length-9].deaths)
      range2DeathsByStateDateFive.push(loopState[loopState.length-7].deaths)
      range2DeathsByStateDateSix.push(loopState[loopState.length-5].deaths)
      range2DeathsByStateDateSeven.push(loopState[loopState.length-3].deaths)
      range2DeathsByStateDateEight.push(loopState[loopState.length-1].deaths)
      
    }

    // Sorting arrays
    casesByStateRecent.sort(function(a, b){return a - b});
    deathsByStateRecent.sort(function(a, b){return a - b});

    range4CasesByStateDateOne.sort(function(a, b){return a - b});
    range4CasesByStateDateTwo.sort(function(a, b){return a - b});
    range4CasesByStateDateThree.sort(function(a, b){return a - b});
    range4CasesByStateDateFour.sort(function(a, b){return a - b});
    range4CasesByStateDateFive.sort(function(a, b){return a - b});

    range4DeathsByStateDateOne.sort(function(a, b){return a - b});
    range4DeathsByStateDateTwo.sort(function(a, b){return a - b});
    range4DeathsByStateDateThree.sort(function(a, b){return a - b});
    range4DeathsByStateDateFour.sort(function(a, b){return a - b});
    range4DeathsByStateDateFive.sort(function(a, b){return a - b});

    range2CasesByStateDateOne.sort(function(a, b){return a - b});
    range2CasesByStateDateTwo.sort(function(a, b){return a - b});
    range2CasesByStateDateThree.sort(function(a, b){return a - b});
    range2CasesByStateDateFour.sort(function(a, b){return a - b});
    range2CasesByStateDateFive.sort(function(a, b){return a - b});
    range2CasesByStateDateSix.sort(function(a, b){return a - b});
    range2CasesByStateDateSeven.sort(function(a, b){return a - b});
    range2CasesByStateDateEight.sort(function(a, b){return a - b});

    range2DeathsByStateDateOne.sort(function(a, b){return a - b});
    range2DeathsByStateDateTwo.sort(function(a, b){return a - b});
    range2DeathsByStateDateThree.sort(function(a, b){return a - b});
    range2DeathsByStateDateFour.sort(function(a, b){return a - b});
    range2DeathsByStateDateFive.sort(function(a, b){return a - b});
    range2DeathsByStateDateSix.sort(function(a, b){return a - b});
    range2DeathsByStateDateSeven.sort(function(a, b){return a - b});
    range2DeathsByStateDateEight.sort(function(a, b){return a - b});

    range1CasesByStateDateOne.sort(function(a, b){return a - b});
    range1CasesByStateDateTwo.sort(function(a, b){return a - b});
    range1CasesByStateDateThree.sort(function(a, b){return a - b});
    range1CasesByStateDateFour.sort(function(a, b){return a - b});
    range1CasesByStateDateFive.sort(function(a, b){return a - b});
    range1CasesByStateDateSix.sort(function(a, b){return a - b});
    range1CasesByStateDateSeven.sort(function(a, b){return a - b});
    range1CasesByStateDateEight.sort(function(a, b){return a - b});

    range1DeathsByStateDateOne.sort(function(a, b){return a - b});
    range1DeathsByStateDateTwo.sort(function(a, b){return a - b});
    range1DeathsByStateDateThree.sort(function(a, b){return a - b});
    range1DeathsByStateDateFour.sort(function(a, b){return a - b});
    range1DeathsByStateDateFive.sort(function(a, b){return a - b});
    range1DeathsByStateDateSix.sort(function(a, b){return a - b});
    range1DeathsByStateDateSeven.sort(function(a, b){return a - b});
    range1DeathsByStateDateEight.sort(function(a, b){return a - b});

    return {
      // Using 53 instead of 50 to account for Guam, DC, & Virgin Islands
      avgCases: Math.round(totalCases / 53), 
      avgDeaths: Math.round(totalDeaths / 53),
      dateAvgs: {
        fourWeekRange: {
          cases: [
            Math.round(nationalData[nationalData.length-29].cases / 53),
            Math.round(nationalData[nationalData.length-22].cases / 53),
            Math.round(nationalData[nationalData.length-15].cases / 53),
            Math.round(nationalData[nationalData.length-8].cases / 53),
            Math.round(nationalData[nationalData.length-1].cases / 53)
          ],
          deaths: [
            Math.round(nationalData[nationalData.length-29].deaths / 53),
            Math.round(nationalData[nationalData.length-22].deaths / 53),
            Math.round(nationalData[nationalData.length-15].deaths / 53),
            Math.round(nationalData[nationalData.length-8].deaths / 53),
            Math.round(nationalData[nationalData.length-1].deaths / 53)
          ]
        },
        twoWeekRange: {
          cases: [
            Math.round(nationalData[nationalData.length-15].cases / 53),
            Math.round(nationalData[nationalData.length-13].cases / 53),
            Math.round(nationalData[nationalData.length-11].cases / 53),
            Math.round(nationalData[nationalData.length-9].cases / 53),
            Math.round(nationalData[nationalData.length-7].cases / 53),
            Math.round(nationalData[nationalData.length-5].cases / 53),
            Math.round(nationalData[nationalData.length-3].cases / 53),
            Math.round(nationalData[nationalData.length-1].cases / 53)
          ],
          deaths: [
            Math.round(nationalData[nationalData.length-15].deaths / 53),
            Math.round(nationalData[nationalData.length-13].deaths / 53),
            Math.round(nationalData[nationalData.length-11].deaths / 53),
            Math.round(nationalData[nationalData.length-9].deaths / 53),
            Math.round(nationalData[nationalData.length-7].deaths / 53),
            Math.round(nationalData[nationalData.length-5].deaths / 53),
            Math.round(nationalData[nationalData.length-3].deaths / 53),
            Math.round(nationalData[nationalData.length-1].deaths / 53)
          ]
        },
        oneWeekRange: {
          cases: [
            Math.round(nationalData[nationalData.length-8].cases / 53),
            Math.round(nationalData[nationalData.length-7].cases / 53),
            Math.round(nationalData[nationalData.length-6].cases / 53),
            Math.round(nationalData[nationalData.length-5].cases / 53),
            Math.round(nationalData[nationalData.length-4].cases / 53),
            Math.round(nationalData[nationalData.length-3].cases / 53),
            Math.round(nationalData[nationalData.length-2].cases / 53),
            Math.round(nationalData[nationalData.length-1].cases / 53)
          ],
          deaths: [
            Math.round(nationalData[nationalData.length-8].deaths / 53),
            Math.round(nationalData[nationalData.length-7].deaths / 53),
            Math.round(nationalData[nationalData.length-6].deaths / 53),
            Math.round(nationalData[nationalData.length-5].deaths / 53),
            Math.round(nationalData[nationalData.length-4].deaths / 53),
            Math.round(nationalData[nationalData.length-3].deaths / 53),
            Math.round(nationalData[nationalData.length-2].deaths / 53),
            Math.round(nationalData[nationalData.length-1].deaths / 53)
          ]
        }
      },
      medianCases: casesByStateRecent[26],
      medianDeaths: deathsByStateRecent[26],
      dateMedians: {
        fourWeekRange: {
          cases: [
            range4CasesByStateDateOne[26],
            range4CasesByStateDateTwo[26],
            range4CasesByStateDateThree[26],
            range4CasesByStateDateFour[26],
            range4CasesByStateDateFive[26]
          ],
          deaths: [
            range4DeathsByStateDateOne[26],
            range4DeathsByStateDateTwo[26],
            range4DeathsByStateDateThree[26],
            range4DeathsByStateDateFour[26],
            range4DeathsByStateDateFive[26]
          ]
        },
        twoWeekRange: {
          cases: [
            range2CasesByStateDateOne[26],
            range2CasesByStateDateTwo[26],
            range2CasesByStateDateThree[26],
            range2CasesByStateDateFour[26],
            range2CasesByStateDateFive[26],
            range2CasesByStateDateSix[26],
            range2CasesByStateDateSeven[26],
            range2CasesByStateDateEight[26]
          ],
          deaths: [
            range2DeathsByStateDateOne[26],
            range2DeathsByStateDateTwo[26],
            range2DeathsByStateDateThree[26],
            range2DeathsByStateDateFour[26],
            range2DeathsByStateDateFive[26],
            range2DeathsByStateDateSix[26],
            range2DeathsByStateDateSeven[26],
            range2DeathsByStateDateEight[26]
          ]
        },
        oneWeekRange: {
          cases: [
            range1CasesByStateDateOne[26],
            range1CasesByStateDateTwo[26],
            range1CasesByStateDateThree[26],
            range1CasesByStateDateFour[26],
            range1CasesByStateDateFive[26],
            range1CasesByStateDateSix[26],
            range1CasesByStateDateSeven[26],
            range1CasesByStateDateEight[26]
          ],
          deaths: [
            range1DeathsByStateDateOne[26],
            range1DeathsByStateDateTwo[26],
            range1DeathsByStateDateThree[26],
            range1DeathsByStateDateFour[26],
            range1DeathsByStateDateFive[26],
            range1DeathsByStateDateSix[26],
            range1DeathsByStateDateSeven[26],
            range1DeathsByStateDateEight[26]
          ]
        }
      }
    };
  };

  // Calculates the per-county average and median of COVID-19 data in a given state
  const getStateAvg = () => {
    let loopCounty;
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
      loopCounty = countiesData.filter(item => item.state === selectedState && item.county === countiesToShow[i]);
      totalCases += loopCounty[loopCounty.length-1].cases;
      totalDeaths += loopCounty[loopCounty.length-1].deaths;

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

      if (loopCounty.length >= 7){
        d1cases = loopCounty[loopCounty.length-7].cases;
        d2cases = loopCounty[loopCounty.length-6].cases;
        d3cases = loopCounty[loopCounty.length-5].cases;
        d4cases = loopCounty[loopCounty.length-4].cases;
        d5cases = loopCounty[loopCounty.length-3].cases;
        d6cases = loopCounty[loopCounty.length-2].cases;
        d7cases = loopCounty[loopCounty.length-1].cases;
  
        d1deaths = loopCounty[loopCounty.length-7].deaths;
        d2deaths = loopCounty[loopCounty.length-6].deaths;
        d3deaths = loopCounty[loopCounty.length-5].deaths;
        d4deaths = loopCounty[loopCounty.length-4].deaths;
        d5deaths = loopCounty[loopCounty.length-3].deaths;
        d6deaths = loopCounty[loopCounty.length-2].deaths;
        d7deaths = loopCounty[loopCounty.length-1].deaths;
      }
      if (loopCounty.length === 6){
        d1cases = 0;
        d2cases = loopCounty[loopCounty.length-6].cases;
        d3cases = loopCounty[loopCounty.length-5].cases;
        d4cases = loopCounty[loopCounty.length-4].cases;
        d5cases = loopCounty[loopCounty.length-3].cases;
        d6cases = loopCounty[loopCounty.length-2].cases;
        d7cases = loopCounty[loopCounty.length-1].cases;

        d1deaths = 0;
        d2deaths = loopCounty[loopCounty.length-6].deaths;
        d3deaths = loopCounty[loopCounty.length-5].deaths;
        d4deaths = loopCounty[loopCounty.length-4].deaths;
        d5deaths = loopCounty[loopCounty.length-3].deaths;
        d6deaths = loopCounty[loopCounty.length-2].deaths;
        d7deaths = loopCounty[loopCounty.length-1].deaths;
      } else if (loopCounty.length === 5){
        d1cases = 0;
        d2cases = 0;
        d3cases = loopCounty[loopCounty.length-5].cases;
        d4cases = loopCounty[loopCounty.length-4].cases;
        d5cases = loopCounty[loopCounty.length-3].cases;
        d6cases = loopCounty[loopCounty.length-2].cases;
        d7cases = loopCounty[loopCounty.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = loopCounty[loopCounty.length-5].deaths;
        d4deaths = loopCounty[loopCounty.length-4].deaths;
        d5deaths = loopCounty[loopCounty.length-3].deaths;
        d6deaths = loopCounty[loopCounty.length-2].deaths;
        d7deaths = loopCounty[loopCounty.length-1].deaths;
        
      } else if (loopCounty.length === 4){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = loopCounty[loopCounty.length-4].cases;
        d5cases = loopCounty[loopCounty.length-3].cases;
        d6cases = loopCounty[loopCounty.length-2].cases;
        d7cases = loopCounty[loopCounty.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = loopCounty[loopCounty.length-4].deaths;
        d5deaths = loopCounty[loopCounty.length-3].deaths;
        d6deaths = loopCounty[loopCounty.length-2].deaths;
        d7deaths = loopCounty[loopCounty.length-1].deaths;
        
      } else if (loopCounty.length === 3){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = 0;
        d5cases = loopCounty[loopCounty.length-3].cases;
        d6cases = loopCounty[loopCounty.length-2].cases;
        d7cases = loopCounty[loopCounty.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = 0;
        d5deaths = loopCounty[loopCounty.length-3].deaths;
        d6deaths = loopCounty[loopCounty.length-2].deaths;
        d7deaths = loopCounty[loopCounty.length-1].deaths;
        
      } else if (loopCounty.length === 2){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = 0;
        d5cases = 0;
        d6cases = loopCounty[loopCounty.length-2].cases;
        d7cases = loopCounty[loopCounty.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = 0;
        d5deaths = 0;
        d6deaths = loopCounty[loopCounty.length-2].deaths;
        d7deaths = loopCounty[loopCounty.length-1].deaths;
        
      } else if (loopCounty.length === 1){
        d1cases = 0;
        d2cases = 0;
        d3cases = 0;
        d4cases = 0;
        d5cases = 0;
        d6cases = 0;
        d7cases = loopCounty[loopCounty.length-1].cases;

        d1deaths = 0;
        d2deaths = 0;
        d3deaths = 0;
        d4deaths = 0;
        d5deaths = 0;
        d6deaths = 0;
        d7deaths = loopCounty[loopCounty.length-1].deaths;
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

      casesByCounty.push(loopCounty[loopCounty.length-1].cases);
      deathsByCounty.push(loopCounty[loopCounty.length-1].deaths);
      casesByCountyWithNames.push({
        state: loopCounty[loopCounty.length-1].state,
        county: loopCounty[loopCounty.length-1].county,
        cases: loopCounty[loopCounty.length-1].cases
      });
      deathsByCountyWithNames.push({
        county: loopCounty[loopCounty.length-1].county,
        deaths: loopCounty[loopCounty.length-1].deaths
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
    // Ensuring we grab data from whichever county will initially showup in the county dropdown menu when the user changes the state
    let indexToRender = countiesToShow.indexOf(selectedCounty);

    let counties = getCounties(e.target.value);
    setSelectedState(e.target.value);
    for (let i = 0; i < stateNames.length; i++){
      if (stateNames[i].state === e.target.value){
        setSelectedStateAb(stateNames[i].code);
        setSelectedStatePop(stateNames[i].population);
      }
    }
    setStateDataObj(statesData.filter(st => st.state === e.target.value))
    setCountiesToShow(counties);
    if (indexToRender === -1 || indexToRender > counties.length-1){
      indexToRender = 0;
    }
    setSelectedCounty(counties[indexToRender]);
    setCountyData(countiesData.filter(i => i.state === e.target.value && i.county === counties[indexToRender]));
  }
  
  // Runs whenever there's a change in the county dropdown menu
  const handleCountyChange = e => {
    setSelectedCounty(e.target.value);
    setCountyData(countiesData.filter(i => i.state === selectedState && i.county === e.target.value));
  }

  const displayDeaths = () => {
    if (display === "cases"){
      setDisplay("deaths");
      setChartLabel("Deaths");
      setDdOptionVal("Per Hundred Thousand Residents");
      setDdOptionText("Per 100,000 Residents");
      $("#btn-cases").toggleClass("btn-chart");
      $("#btn-cases").toggleClass("btn-chart-outline");
      $("#btn-deaths").toggleClass("btn-chart");
      $("#btn-deaths").toggleClass("btn-chart-outline");
    }
  }
  
  const displayCases = () => {
    if (display === "deaths"){
      setDisplay("cases");
      setChartLabel("Cases");
      setDdOptionVal("Per Thousand Residents");
      setDdOptionText("Per 1000 Residents");
      $("#btn-cases").toggleClass("btn-chart");
      $("#btn-cases").toggleClass("btn-chart-outline");
      $("#btn-deaths").toggleClass("btn-chart");
      $("#btn-deaths").toggleClass("btn-chart-outline");
    }
  }

  return (
    <div id="chart-stuff" className="mt-5">
      <div className="container">
          <div className="row" id="chart-sect-header">
            <div className="col-md-4 p-0">
              <h3 id="ss-header-text">COVID-19 State Summary</h3>
            </div>
            <div className="col-md-4">
              <div className="input-group" id="table-btn-container">
                <div className="input-group-prepend">
                  <button id="btn-cases" onClick={displayCases} className="btn btn-chart">Cases</button>
                </div>
                <div className="input-group-append">
                  <button id="btn-deaths" onClick={displayDeaths} className="btn btn-chart-outline">Deaths</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-6">
                  <p className="text-muted dd-label">
                    State
                  </p>
                  <select className="form-control" onChange={handleStateChange} id="stateSelect">
                    {stateNames.map(name => (
                      <option>{name.state}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <p className="text-muted dd-label">
                    County
                  </p>
                  <select className="form-control" onChange={handleCountyChange} id="countySelect">
                  {countiesToShow.map(county => (
                    <option>{county}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        <div id="chart-stuff-top">
          <StateChartContainer
            display = {display}
            chartLabel = {chartLabel}
            ddOptionVal={ddOptionVal}
            ddOptionText={ddOptionText}
            stateName = {selectedState}
            stateAbbrev = {selectedStateAb}
            statePopulation = {selectedStatePop}
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
          />
        </div>
      </div>
    </div>
  );
}

export default ChartContainer;