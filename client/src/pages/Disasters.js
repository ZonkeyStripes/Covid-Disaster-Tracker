import React, { Component } from "react";
import disasterAPI from "../utils/disasterAPI";
import stateAbbr from "../utils/stateAbbr";
import "../App.css";
import Axios from "axios";
import stateNames from "../utils/json/state-names.json";
import stateLatLong from "../assets/statelatlong.json";
import * as ReactBootStrap from "react-bootstrap";
import DisasterMap from "../components/DisasterMap";

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

        //this.highlightFeature.bind(this)

    }

    componentDidMount() {
        console.log('mounted');
        
        this.loadAllDisasters();

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

                // get latitude and longitude of state centers
                arrayOfLocations.forEach(el => {
                    let tempState = el[1];
                    console.log(tempState);
                })
    
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

            this.setState({locations: arrayOfLocations}, () => {
                console.log(this.state);
            });
        })
    }
    
    
    loadDisasters(state) {

        let stateAb = stateAbbr.convertRegion(state, 2);
        console.log(stateAb);

        disasterAPI.getDisastersbyState(stateAb)
            .then(res => {
                console.log(res.data.DisasterDeclarationsSummaries);
                return res.data.DisasterDeclarationsSummaries;
            })
            .catch(err => console.log(err));


    };

    loadAllDisasters() {

        // load all disasters in the last year
        disasterAPI.getDisasters()
        .then(res => {
            let all_disasters = res.data.DisasterDeclarationsSummaries;
            console.log(res.data.DisasterDeclarationsSummaries);

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

                this.state.locations.forEach(el => {
                    console.log(el[1]);
                    this.state.allStates.forEach(state => {
                        if(el[1] == state[0]) {
                            disastersByState.push(state[1]);
                            el.push(state[1]);
                        }
                    })
                    
                })

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
        return (
            <div>
                <h1>Disasters</h1>
                <h3>Disasters by State in the last Year</h3>

                {this.state.allStates.map((el, index) => (
                    <p key={index}>{el[0]}: {el[1].length} disaster declarations</p>
                ))}

                {this.state.locations.map((el, index) => (
                    <div>
                    <DisasterMap key={index} USstate={el[1]} lat={el[2]} long={el[3]} disasters={el[4]}/>
                    </div>
                ))}
                {/* <form onSubmit={this.handleSubmit}>
                    <label htmlFor="state">State</label>
                    <select onChange={this.handleStateChange} className="form-control" id="FTUstateSelect">
                    {stateNames.sort().map(name => (
                        <option>{name}</option>
                    ))}
                    </select>
                    <button type="submit" className="btn form-btn">Enter State</button>
                </form> */}
            </div>
    );
}


}

export default Disasters;