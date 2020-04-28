import React, { Component } from "react";
import "../App.css";
import DashboardMap from "../components/DashboardMap";
import MiniMap from "../components/MiniMap";
import Axios from "axios";
import countyData from '../assets/nytimescounties.json';
import * as ReactBootStrap from "react-bootstrap";
import Hospital from "../components/Hospital";

let todayDate = "2020-04-26";
let countyArray = [];

// console.log(countyData);

for(let i = 0; i < countyData.length; i++) {
	if(countyData[i].date === todayDate) {
		countyArray.push(countyData[i]);
	}
}

// console.log(countyArray);

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      locations: [],
      effective_date: "04-26-2020",
      username: ""
    };
  }

  componentDidMount() {
    console.log('mounted');
    Axios.get("/api/user_data")
    .then((data) => {
        console.log("user logged in")
        console.log(data);
        this.setState({username: data.data.email});

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

  handleClick(e) {
    console.log("logging out perhaps?");
    e.preventDefault();
    Axios.post("/logout")
    .then(() => {
      console.log("logout route success");
      this.props.history.push("/");
    })
    .catch(() => {
      console.log("logout route failed, push to home");
      this.props.history.push("/");
    })
  }


  render() {
      return (
        <div className="container">
          {/* <p>{this.state.username}<span onClick={this.handleClick}>(Logout)</span></p> */}
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
                  <Hospital fips={item[4]}/>
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