import React, { Component } from "react";
import "../App.css";
import MapContainer from "../components/MapContainer";
import ChartContainer from "../components/ChartContainer";
import Axios from "axios";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countyData: [],
      stateData: []
    };
  }


  // componentDidMount() {
  //   Axios.get("/api/state_latest_date/")
  //   .then(dateRes => {
  //     console.log(dateRes);
  //     let latestDate = dateRes.data[0].date;

  //     // get state data from latest day stored in DB
  //     Axios.get("/api/state_data/" + latestDate)
  //     .then(stateDataRes => {
  //       console.log(stateDataRes);
  //       let stateData = stateDataRes.data;

  //       Axios.get("/api/county_latest_date/")
  //       .then(countyDate => {
  //         let latestCountyDate = countyDate.data[0].date;

  //         Axios.get("/api/county_data/" + latestCountyDate)
  //         .then(countyDataRes => {
  //           let countyData = countyDataRes.data;

  //           this.setState({
  //             countyData: countyData,
  //             stateData: stateData
  //           });
  //         })
  //       })
  //     })
  //   })
  // }


  componentDidMount() {
    Axios.get("/api/state_data/")
    .then(stateDataRes => {
      console.log(stateDataRes);
      let stateData = stateDataRes.data;

      Axios.get("/api/county_data/")
      .then(countyDataRes => {
        let countyData = countyDataRes.data;
        console.log(countyData);

        this.setState({
          countyData: countyData,
          stateData: stateData
        });
      })
    })
  }


  render() {

    let renderCharts = "";
    if(this.state.countyData.length > 0) {
      renderCharts = <ChartContainer countyData={this.state.countyData} stateData={this.state.stateData}/>;
    }

      return (
        <div>
          <div className="container">
            <MapContainer />
          </div>
          {renderCharts}
        </div>
      );
    }
  }
  
  export default Home;