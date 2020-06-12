import React, { Component } from "react";
import "../App.css";
import DashboardMap from "../components/DashboardMap";
import MiniMap from "../components/MiniMap";
import Axios from "axios";
// import countyData from '../assets/nytimescounties.json';
import * as ReactBootStrap from "react-bootstrap";
import Hospital from "../components/Hospital";
import * as Constants from "../constants";

//let todayDate = Constants.LASTUPDATED;
//let countyArray = [];

// console.log(countyData);

// for(let i = 0; i < countyData.length; i++) {
// 	if(countyData[i].date === todayDate) {
// 		countyArray.push(countyData[i]);
// 	}
// }

// console.log(countyArray);

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      effective_date: "",
      username: ""
    };

    // ES6 React.Component doesn't auto bind methods to itself
    // Need to bind them manually in constructor
    //this.changeView = this.changeView.bind(this);

  }

  componentDidMount() {
    console.log('mounted');

    // get user data - check if user is logged in
    Axios.get("/api/user_data")
    .then((data) => {
      console.log("user logged in")
      console.log(data);
      this.setState({username: data.data.email});

      Axios.get("/api/location/" + data.data.id)
      .then((all_locations) => {
          // update the state with all current locations belonging to user

          let arrayOfLocations = [];
          // for(let i = 0; i < all_locations.data.length; i++) {
              
          this.getCountyData(all_locations).then(results => {
            // array of results in order here
            console.log(results);

            let latestDate = results[0].data.date;

            for(let i = 0; i < results.length; i++) {
              let tempArray = [];
              tempArray.push(results[i].data.county);
              tempArray.push(results[i].data.state);
              tempArray.push(results[i].data.cases);
              tempArray.push(results[i].data.deaths);

              let tempStr = results[i].data.fips.toString();
              console.log(tempStr);
              console.log(tempStr.length);

              if(tempStr.length == 4) {
                console.log("tempStr = " + tempStr);
                tempStr = "0" + tempStr;
                console.log("now it's " + tempStr);
              } else {
                console.log("fips is 5 characters hopefully");
              }

              tempArray.push(tempStr);

              console.log(tempArray);
              arrayOfLocations.push(tempArray);
            }

            console.log(arrayOfLocations);

            Axios.get("/api/county_data/" + latestDate)
            .then(resultArray => {
              console.log(resultArray);
              
              this.setState({
                locations: arrayOfLocations,
                effective_date: latestDate
              });
            })



          }).catch(err => {
              console.log(err);
          });
      })
    });
  }

  getCountyData(all_locations) {
    let promises = [];
    for (let i = 0; i < all_locations.data.length; i++) {
         promises.push(Axios.get("/api/get_most_recent_data/" + all_locations.data[i].county + "/" + all_locations.data[i].state));
    }
    return Promise.all(promises);
}

  // handleClick(e) {
  //   e.preventDefault();
  //   Axios.post("/logout")
  //   .then(() => {
  //     console.log("logout route success");
  //     this.props.history.push("/");
  //   })
  //   .catch(() => {
  //     console.log("logout route failed, push to home");
  //     this.props.history.push("/");
  //   })
  // }


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
                    <li>{item[2].toLocaleString()} Cases</li>
                    <li>{item[3].toLocaleString()} Deaths</li>
                  </ul>
                  <Hospital fips={item[4]}/>
                </ReactBootStrap.Col>
                <ReactBootStrap.Col xs={12} md={6}>
                  <MiniMap fips={item[4]}/>
                </ReactBootStrap.Col>
              </ReactBootStrap.Row>              
            ))}
            </ReactBootStrap.Container>
            <DashboardMap date={this.state.effective_date}/>
        </div>
      );
    }
  }
  
  export default Dashboard;