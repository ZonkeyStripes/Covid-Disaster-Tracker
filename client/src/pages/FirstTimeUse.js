import React, { useState } from "react";
import "../App.css";
import statesData from "../utils/json/us-state.json";
import countiesData from "../utils/json/us-counties.json";
import stateNames from "../utils/json/state-names.json";
import Axios from "axios";


function FirstTimeUse() {

    
    
    //Returns array with all county names in a given state
    const getCounties = (state) => {
        let setOfCounties = new Set();
        for (let i = 0; i < countiesData.length; i++){
            if (countiesData[i].state === state && countiesData[i].county !== "Unknown"){
            setOfCounties.add(countiesData[i].county);
            }
        }
        return Array.from(setOfCounties).sort();
    }


    const [selectedState, setSelectedState] = useState(stateNames.sort()[0])
    //const [stateDataObj, setStateDataObj] = useState(statesData.filter(st => st.state === stateNames.sort()[0]));
    const [countiesToShow, setCountiesToShow] = useState(getCounties(selectedState));
    const [selectedCounty, setSelectedCounty] = useState(countiesToShow[0]);
    //const [countyData, setCountyData] = useState(countiesData.filter(i => i.state === selectedState && i.county === selectedCounty));
  
    // Runs whenever there's a change in the state dropdown menu
    const handleStateChange = e => {
        let counties = getCounties(e.target.value);
        setSelectedState(e.target.value);
        //setStateDataObj(statesData.filter(st => st.state === e.target.value))
        setCountiesToShow(counties);
        setSelectedCounty(counties[0]);
        //setCountyData(countiesData.filter(i => i.state === e.target.value && i.county === counties[0]));
    }

    // Runs whenever there's a change in the county dropdown menu
    const handleCountyChange = e => {
        setSelectedCounty(e.target.value);
        //setCountyData(countiesData.filter(i => i.state === selectedState && i.county === e.target.value));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedState);
        console.log(selectedCounty);

        Axios.get("/api/user_data")
        .then((data) => {
            console.log("*****")
            console.log(data.data);

            let locationObj = {};
            locationObj.state = selectedState;
            locationObj.county = selectedCounty;
            locationObj.uid = data.data.id;
            Axios.post("/api/add_location", locationObj)
        })
        .catch(function(err) {
            // User is not logged in, handle this somehow here
            // Redirect to Login?  Error message?
            console.log("Error");
            console.log(err);
        });
        
    }

    return (
        <div>
            <h1>Welcome to Disaster Tracker</h1>
            <h4>Enter your location and locations that you want to watch</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="state">State</label>
                <select onChange={handleStateChange} className="form-control" id="FTUstateSelect">
                {stateNames.sort().map(name => (
                    <option>{name}</option>
                ))}
                </select>
                <label htmlFor="county">County</label>
                <select onChange={handleCountyChange} className="form-control" id="FTUcountySelect">
                {countiesToShow.map(county => (
                    <option>{county}</option>
                    ))}
                </select>
                <button type="submit" className="btn form-btn">Enter Location</button>
            </form>
        </div>
      );
  }
  
  export default FirstTimeUse;