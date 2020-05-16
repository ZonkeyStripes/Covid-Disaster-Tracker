import React, { useState, useEffect } from "react";
import "../App.css";
import statesData from "../assets/nytimesstate.json";
import countiesData from "../assets/nytimescounties.json";
import stateNames from "../utils/json/state-names.json";
import Axios from "axios";

let user_id;

function FirstTimeUse(props) {
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
    const [countiesToShow, setCountiesToShow] = useState(getCounties(selectedState));
    const [selectedCounty, setSelectedCounty] = useState(countiesToShow[0]);
    const [userLocations, setUserLocations] = useState([]);

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
        e.preventDefault();
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

            user_id = data.data.id;
            console.log(user_id);

            let locationObj = {};
            locationObj.state = selectedState;
            locationObj.county = selectedCounty;
            locationObj.uid = data.data.id;
            Axios.post("/api/add_location", locationObj)
            .then((add_response) => {
                console.log(add_response);
                console.log(locationObj.uid);

                Axios.get("/api/location/" + locationObj.uid)
                .then((all_locations) => {
                    // update the state with all current locations belonging to user
                    console.log("*** LAST RETURN");
                    console.log(all_locations.data);
                    let arrayOfLocations = [];
                    for(let i = 0; i < all_locations.data.length; i++) {
                        let tempArray = [];
                        tempArray.push(all_locations.data[i].county);
                        tempArray.push(all_locations.data[i].state);
                        console.log(tempArray);
                        arrayOfLocations.push(tempArray);
                    }

                    console.log(arrayOfLocations);
                    setUserLocations(arrayOfLocations);
                })
            })
        })
        .catch(function(err) {
            // User is not logged in, handle this somehow here
            // Redirect to Login?  Error message?
            console.log("Error");
            console.log(err);
        });
    }

    const redirectToDashboard = () => {
        console.log(user_id);
        
        Axios.put("/api/set_user_ftu", {uid: user_id, value: false})
        .then((res) => {
            console.log("set the ftu to false");
            props.history.push("/dashboard");
        });
    }

    // fire once to load location data
    useEffect(() => {
        console.log('mounted');
        Axios.get("/api/user_data")
        .then((data) => {
            console.log("is user logged in?")
            console.log(data);
            user_id = data.data.id;

            Axios.get("/api/location/" + data.data.id)
            .then((all_locations) => {
                // update the state with all current locations belonging to user
                console.log(all_locations.data);
                let arrayOfLocations = [];
                for(let i = 0; i < all_locations.data.length; i++) {
                    let tempArray = [];
                    tempArray.push(all_locations.data[i].county);
                    tempArray.push(all_locations.data[i].state);
                    console.log(tempArray);
                    arrayOfLocations.push(tempArray);
                }

                // set state
                console.log(arrayOfLocations);
                setUserLocations(arrayOfLocations);
            })
        });
    }, []);

    return (
        <div id="ftu-body" className="container">
          <div className="row mt-4">
            <div className="col-md-5 md-5 text-center mx-auto">
              <div className="card su-card">
                <div className="card-body ftu-card-body">
                  <h3 className="pb-2">
                    Welcome to Disaster Tracker
                  </h3>
                  <h6>Please enter up to three counties to follow</h6>
                    {/* <form onSubmit={handleSubmit}> */}
                      <label htmlFor="state">State</label>
                      <select onChange={handleStateChange} className="form-control mx-auto" id="FTUstateSelect">
                      {stateNames.sort().map(name => (
                        <option>{name}</option>
                      ))}
                      </select>
                      <label className="mt-2" htmlFor="county">County</label>
                      <select onChange={handleCountyChange} className="form-control mx-auto" id="FTUcountySelect">
                      {countiesToShow.map(county => (
                        <option>{county}</option>
                        ))}
                      </select>
                      <button onClick={handleSubmit} type="submit" className="btn form-btn-outline mr-1 my-3">Enter Location</button>
                      <button className="btn form-btn my-3 ml-1" onClick={redirectToDashboard}>Finish</button>
                        {userLocations.map((item, index) => (
                          <div className="alert alert-success mx-auto" key={index}>
                            Added: {item[0]} County, {item[1]} <i class="fas fa-check-circle"/>
                          </div>
                          // <li key={index}>{item[0]} County, {item[1]}</li>
                          //<li key={index}>{item}</li>
                          ))}
                    {/* </form> */}
                    {/* <button className="btn form-btn" onClick={redirectToDashboard}>Finish</button> */}
                </div>
              </div>
            </div>
          </div>
            {/* <h1>Welcome to Disaster Tracker</h1>
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
                <button className="btn form-btn" onClick={redirectToDashboard}>Finish</button>
                <ul>
                    {userLocations.map((item, index) => (
                        <li key={index}>{item[0]} County, {item[1]}</li>
                        //<li key={index}>{item}</li>
                    ))}
                </ul> */}
        </div>
      );
  }
  
  export default FirstTimeUse;