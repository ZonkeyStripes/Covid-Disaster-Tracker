import React, {useState} from 'react';
import './bootstrap.css';
import './style.css';
import CovidCharts from "./components/CovidCharts";
import statesData from "./us-state.json";
import countiesData from "./us-counties.json";
import stateNames from "./state-names.json";

function App() {
  const [selectedState, setSelectedState] = useState("Alaska")
  const [stateDataArr, setStateDataArr] = useState(statesData.filter(st => st.state === "Alaska"));
  
  const getCounties = (state) => {
    let setOfCounties = new Set();
    for (let i = 0; i < countiesData.length; i++){
      if (countiesData[i].state === state && countiesData[i].county !== "Unknown"){
        setOfCounties.add(countiesData[i].county);
      }
    }
    return Array.from(setOfCounties).sort();
  }

  const [countiesToShow, setCountiesToShow] = useState(getCounties(selectedState));
  const [selectedCounty, setSelectedCounty] = useState();
  const [countyDataArr, setCountyDataArr] = useState(countiesData.filter(i => i.state === selectedState && i.county === selectedCounty));
  
  const getUSaverage = () => {
    let flState = null;
    let totalCases = 0;
    let totalDeaths = 0;
    let casesByState =[];
    let deathsByState =[];

    for (let i = 0; i < stateNames.length; i++){
      flState = statesData.filter(st => st.state === stateNames[i]);
      totalCases += flState[flState.length-1].cases;
      totalDeaths += flState[flState.length-1].deaths;
      casesByState.push(flState[flState.length-1].cases);
      deathsByState.push(flState[flState.length-1].deaths);
      flState = null;
    }

    return {
      avgCases: Math.round(totalCases / 53),
      avgDeaths: Math.round(totalDeaths / 53),
      medianCases: casesByState[26],
      medianDeaths: deathsByState[26]
    };
  };

  const handleStateChange = e => {
    setSelectedState(e.target.value);
    setStateDataArr(statesData.filter(st => st.state === e.target.value))
    console.log(stateDataArr);

    setCountiesToShow(getCounties(e.target.value));
  }

  const handleCountyChange = e => {
    setSelectedCounty(e.target.value);
    setCountyDataArr(countiesData.filter(i => i.state === selectedState && i.county === selectedCounty));
    console.log(countyDataArr);
  }

  return (
    <div className="App">
      <div className="container">
        <label htmlFor="state">State</label>
        <select onChange={handleStateChange} class="form-control" id="stateSelect">
          {stateNames.map(name => (
            <option>{name}</option>
          ))}
        </select>
        <CovidCharts
          stateName={selectedState}
          mostRecentData={stateDataArr[stateDataArr.length-1]}
          averages = {getUSaverage()}
          counties = {countiesToShow}
        />
        <label htmlFor="state">County</label>
        <select onChange={handleCountyChange} class="form-control" id="stateSelect">
          {countiesToShow.map(county => (
            <option>{county}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;