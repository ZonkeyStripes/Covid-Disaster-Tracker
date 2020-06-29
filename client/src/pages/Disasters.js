import React, { Component } from "react";
import disasterAPI from "../utils/disasterAPI";
import stateAbbr from "../utils/stateAbbr";
import * as ReactBootStrap from "react-bootstrap";
import Axios from "axios";
import stateNames from "../utils/json/state-names.json";
import stateLatLong from "../assets/statelatlong.json";
import DisasterMap from "../components/DisasterMap";
import DisasterList from "../components/DisasterList";
import "../App.css";

let objCollection = {};
let tester = [];

class Disasters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            disasterList: [],
            disastersByState: [],
            state: "",
            allStates: []
        };

        // ES6 React.Component doesn't auto bind methods to itself
        // Need to bind them manually in constructor
        this.loadDisasters = this.loadDisasters.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {    
        // check if user is logged in
        Axios.get("/api/user_data")
        .then((data) => {
            // if they are
            console.log("user logged in")
            console.log(data);
    
            // get their stored locations from the database
            Axios.get("/api/location/" + data.data.id)
            .then((all_locations) => {
                // update the component's state with all current locations belonging to user
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

                // get latitude and longitude of state centers
                for(let i = 0; i < arrayOfLocations.length; i++) {
                    let tempState = arrayOfLocations[i][1];
                    // console.log(tempState);
                    stateLatLong.forEach(state => {
                        // console.log(state);
                        if(state.State == tempState) {
                            console.log("adding coords for " + state.State);
                            arrayOfLocations[i].push(state.Latitude);
                            arrayOfLocations[i].push(state.Longitude);
                        }
                    })
                }
                console.log(arrayOfLocations);
                this.loadAllDisasters();

                // set state
                this.setState({locations: arrayOfLocations});
            })
        })
        .catch((err) => {
            console.log("User is not logged in, display default states");
            // console.log(err);

            let arrayOfLocations = [["Los Angeles", "California", 36.116203, -119.681564],
                ["Pima", "Arizona", 33.729759, -111.431221],
                ["Orange", "Florida", 27.766279, -81.686783]
            ];

            Axios.get("https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=declarationDate%20gt%20%272019-06-01T04:00:00.000z%27%20&$top=1000")
            .then(result => {
                console.log(result);
                Axios.get("https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=declarationDate%20gt%20%272019-06-01T04:00:00.000z%27%20&$skip=1000")
                .then(secondRes => {
                    console.log(secondRes);
                    this.loadAllDisasters();

                    this.setState({locations: arrayOfLocations}, () => {
                        console.log(this.state);
                    });
                })
            })
        })
    }
    
    
    loadDisasters(state) {

        let stateAb = stateAbbr.convertRegion(state, 2);
        console.log(stateAb);

        // disasterAPI.getDisastersbyState(stateAb)
        Axios.get("/api/all_disasters_non_coivd/" + stateAb)
            .then(res => {
                console.log(res.data);
                return res.data;
            })
            .catch(err => console.log(err));


    };

    loadAllDisasters() {

        // load all disasters in the last year
        // Axios.get("https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=declarationDate%20gt%20%272019-06-25T04:00:00.000z%27and incidentType ne 'Biological'&$top=1000")
        // .then(res => {
        //     let all_disasters = res.data.DisasterDeclarationsSummaries;
        //     console.log(res.data.DisasterDeclarationsSummaries); 

        Axios.get("/api/all_disasters_non_coivd")
        .then(res => {

            let all_disasters = res.data;
            console.log(res.data);

            // separate out into lists of declarations by state
            stateNames.forEach(el => {
                let stateAb = stateAbbr.convertRegion(el, 2);
                const list = all_disasters.filter((obj) => obj.state === stateAb);
                objCollection[stateAb] = list;
            })

            console.log(objCollection);

            tester = Object.entries(objCollection);
            console.log(tester);

            // convert states back to full names from abbreviations
            tester.forEach(el => {
                if(el[0] !== undefined) {
                    el[0] = stateAbbr.convertRegion(el[0], 1);
                }
            })

            // filter out states with no declarations in the time period
            let finalDisasterArray = tester.filter(function(el) {
                return el[0] != undefined && el[1].length != 0;
            });

            this.setState({allStates: finalDisasterArray}, () => {

                // get the lists of disasters for each state
                console.log(this.state.locations);

                let disastersByState = [];

                console.log(this.state.locations);
                this.state.locations.forEach(el => {
                    console.log(el[1]);
                    this.state.allStates.forEach(state => {
                        if(el[1] == state[0]) {
                            disastersByState.push(state[1]);
                            el.push(state[1]);
                        }
                    })
                })
                console.log(this.state.locations);

                console.log(disastersByState);
                this.setState({disastersByState: disastersByState});
            });

        })
    }


    categorizeDisasters() {
        let typeList = [];
        console.log(this.state.disasterList);
        this.state.disasterList.forEach(element => {
            console.log(element.incidentType);
            if(typeList.indexOf(element.incidentType) == -1) {
                typeList.push(element.incidentType);
            }
        });
        
        console.log(typeList);

        return typeList;
    }

    handleStateChange(event) {
        console.log(event.target.value);
        this.setState({state: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.loadDisasters(this.state.state);
    }

    render() {

        
        let resultToRender;
        if(this.state.allStates.length > 0) {
            // console.log("****")
            // console.log(this.state.allStates.length);
            let temp = this.state.allStates.map((st) => {
                let res = {};
                //res.question = <div>{st[0]} {"\u2014"} {st[1].length} disasters declared</div>;
                res.question = <div className="dd">{st[0]}: {st[1].length} disasters declared</div>;
                res.answer = st[1].map((dis) => {
                    return <div>{dis.declaredCountyArea}: {dis.incidentType}<br />
                    {dis.title}<br />
                    {dis.declarationDate.substring(0,10)}<br /><br />
                    </div>
                } )
                res.open = false;

                return res;
            });
            console.log(temp);

            resultToRender = <div className="col-6 faqs">
            <h2 className="text-center">Disasters (Non-COVID) by State in 2020</h2>
            <hr></hr>
            <div className="stuff">
                <DisasterList stateDisasters={temp}/>
            </div>
        </div>;
        } else {
            resultToRender = <div className="container d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>;
        }

        return (
            <div className="container">
                {/* <h1>Disasters</h1> */}
                {resultToRender}
                {this.state.locations.map((el, index) => (
                    <div className="mb-4 px-3">
                    <DisasterMap key={index} USstate={el[1]} lat={el[2]} long={el[3]} disasters={el[4]}/>
                    </div>
                ))}
            </div>
    );
}


}

export default Disasters;