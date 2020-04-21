import React, { Component } from "react";
import "../App.css";
import DashboardMap from "../components/DashboardMap";
import MiniMap from "../components/MiniMap";
import Axios from "axios";
import countyData from '../assets/nytimescounties.json';
import * as ReactBootStrap from "react-bootstrap";
import FindHospital from "../components/FindHospital";

let todayDate = "4/12/2020";
let countyArray = [];

for(let i = 0; i < countyData.length; i++) {
	if(countyData[i].date === todayDate) {
		countyArray.push(countyData[i]);
	}
}

console.log("countyArray in Dashboard:");
console.log(countyArray);

class Dashboard extends Component {

  constructor(props) {
    super(props);

    //this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      locations: [],
      effective_date: "4-12-2020"
    };
  }

  componentDidMount() {
    console.log('mounted');
    Axios.get("/api/user_data")
    .then((data) => {
        console.log("user logged in")
        console.log(data);

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

            for(let i = 0; i < countyArray.length; i++) {
              let tempCounty = countyArray[i].county;
              let tempState = countyArray[i].state;

              for(let k = 0; k < arrayOfLocations.length; k++) {
                // console.log(k);
                // console.log(arrayOfLocations[k][0]);
                if(tempCounty == arrayOfLocations[k][0]) {
                  // console.log("county match");
                  if(tempState == arrayOfLocations[k][1]) {
                    // console.log("and state match");
                    arrayOfLocations[k].push(countyArray[i].cases);
                    arrayOfLocations[k].push(countyArray[i].deaths);
                    

                    let tempStr = countyArray[i].fips.toString();
                    console.log(tempStr);
                    console.log(tempStr.length);

                    if(tempStr.length == 4) {
                      console.log("tempStr = " + tempStr);
                      tempStr = "0" + tempStr;
                      console.log("now it's " + tempStr);
                      
                      arrayOfLocations[k].push(tempStr);
                    } else {
                      console.log("fips is 5 characters hopefully");
                      arrayOfLocations[k].push(tempStr);
                    }
                  }
                }
              }
            }

            console.log(arrayOfLocations);

            this.setState({locations: arrayOfLocations});
        })
    });
  }

  render() {
      return (
        <div>
          {/* <p>{this.state.username} (Logout)</p> */}
            <h1>Dashboard</h1>
            <h2>Your tracked locations</h2>
            <h2><em>As of {this.state.effective_date}:</em></h2>
            <ReactBootStrap.Container>
            {this.state.locations.map((item, index) => (
              <ReactBootStrap.Row key={index}>
                <ReactBootStrap.Col xs={12} md={6}>
                  <h3>{item[0]} County, {item[1]}</h3>
                  <p><strong>Covid-19 Data</strong></p>
                  <ul>
                    <li>{item[2]} Cases</li>
                    <li>{item[3]} Deaths</li>
                  </ul>
                  <FindHospital fips={item[4]}/>
                </ReactBootStrap.Col>
                <ReactBootStrap.Col xs={12} md={6}>
                  <MiniMap fips={item[4]}/>
                </ReactBootStrap.Col>
              </ReactBootStrap.Row>              
            ))}
            </ReactBootStrap.Container>
            <DashboardMap />
        </div>
      );
    }
  }
  
  export default Dashboard;