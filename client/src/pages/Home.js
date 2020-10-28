import React, { Component } from "react";
import "../App.css";
import MapContainer from "../components/MapContainer";
import ChartContainer from "../components/ChartContainer";
import Axios from "axios";
import monthAgo from "../utils/monthAgo";
import previousDate from "../utils/previousDate";


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countyData: [],
      stateData: [],
      nationalData: []
    };
  }


  componentDidMount() {
    Axios.get("/api/state_data/")
    .then(stateDataRes => {
      console.log(stateDataRes);
      let stateData = stateDataRes.data;

      Axios.get("/api/county_latest_date/")
      .then(countyDate => {
        let latestCountyDate = countyDate.data[0].date;

        Axios.get("/api/county_data/last_month/" + latestCountyDate)
        .then(results => {
          console.log(results);

          let countyData = results.data;

          Axios.get("/api/national_data/")
          .then(nationalResults => {
            let nationalData = nationalResults.data;
            console.log(nationalData);

            this.setState({
              countyData: countyData,
              stateData: stateData,
              nationalData: nationalData
            });
          })
        })
      })
    })
  }

  // get 30 days of county level data
  // getCountyData(latestDate) {

  //   let prevDate = latestDate;
  //   console.log(prevDate);
  //   let promises = [];
  //   for (let i = 0; i < 30; i++) {
  //        promises.push(Axios.get("/api/county_data/" + prevDate));
  //        prevDate = previousDate.previousDate(prevDate);
  //        console.log(prevDate);
  //   }
  //   return Promise.all(promises);
  // }



  render() {

    let renderCharts = <div className="container d-flex justify-content-center">
        <div className="spinner-border m-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>;
    if(this.state.countyData.length > 0) {
      renderCharts = <ChartContainer
        countyData={this.state.countyData}
        stateData={this.state.stateData}
        nationalData={this.state.nationalData}
      />;
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