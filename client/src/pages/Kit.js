import React, { Component } from "react";
import "../Kit.css";
//import InputGroup from 'react-bootstrap/InputGroup';
//import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Form from 'react-bootstrap/Form';
import KitList from '../components/KitList';
import kitAPI from '../utils/kitAPI';
import KitResults from '../components/KitResults';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Card, CardGroup } from "react-bootstrap";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from "axios";
import "../App.css";
import countiesData from "../assets/county_latlong.json";
import stateNames from "../utils/json/state-names.json";
import stateAbbr from "../utils/stateAbbr";


library.add(faTrash);

class Kit extends Component {
    constructor(props) {
        super(props);

        let initialState = stateNames.sort()[0];
        let counties = this.getCounties(initialState);

        this.state = {
            items: [],
            data: [],
            state: initialState,
            countyList: counties,
            selectedCounty: counties[0],
            currentItem: {
                text: '',
                key: ''
            },
            userID: 0
        }
        //Bind items to list
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
    }

    //Returns array with all county names in a given state
    getCounties = (state) => {

        let stateAb = stateAbbr.convertRegion(state, 2);

        let setOfCounties = new Set();
        for (let i = 0; i < countiesData.length; i++) {
            // console.log(countiesData[i].STATE);

            if (countiesData[i].STATE === stateAb && countiesData[i].COUNTYNAME !== "Unknown") {
                setOfCounties.add(countiesData[i].COUNTYNAME);
            }
        }
        return Array.from(setOfCounties).sort();
    }

    // Runs whenever there's a change in the state dropdown menu
    handleStateChange = e => {
        let counties = this.getCounties(e.target.value);

        this.setState({
            countyList: counties,
            state: e.target.value,
            selectedCounty: counties.sort()[0]
        }, function() {      
            console.log("callback function");
        });    
    }

    handleCountyChange = e => {
        console.log(e.target.value);
        this.setState({
            selectedCounty: e.target.value
        })
    }


    handleInput(e) {

        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now()
            }
        })
    }

    addItem(e) {
        e.preventDefault();
        let newItem = this.state.currentItem;
        console.log(newItem);
        console.log(this.state.userID);

        // if user is logged in, add to database
        if (this.state.userID !== 0) {
            Axios.post("/api/add_dkitem", {
                text: newItem.text,
                uid: this.state.userID
            })
                .then((data) => {
                    console.log(data.data.id);
                    newItem.key = data.data.id;
                    console.log(newItem);

                    if (newItem.text !== "") {
                        //Destructure Additions & Add them to List
                        const newItems = [...this.state.items, newItem];
                        console.log(newItems);
                        this.setState({
                            items: newItems,
                            currentItem: {
                                text: '',
                                key: ''
                            }
                        })
                    }
                })
        } else {
            // otherwise just add to state
            if (newItem.text !== "") {
                //Desctructure Additions & Add them to List
                const newItems = [...this.state.items, newItem];
                console.log(newItems);
                this.setState({
                    items: newItems,
                    currentItem: {
                        text: '',
                        key: ''
                    }
                })
            }
        }
    }

    deleteItem(key) {
        Axios.delete("/api/delete_dkitem/" + key)
            .then((deleted_item) => {
                console.log("successfully deleted item");
                const filteredItems = this.state.items.filter(item =>
                    item.key !== key);
                console.log(filteredItems)
                this.setState({
                    items: filteredItems
                })
            })
    }

    callkitAPI = () => {
        let stateAb = stateAbbr.convertRegion(this.state.state, 2);
        console.log(stateAb);
        kitAPI.getDisaster(this.state.selectedCounty, stateAb).then(res => {
            this.setState({ data: res.data.DisasterDeclarationsSummaries })
            console.log(res.data.DisasterDeclarationsSummaries)
        })
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    addDisasterTypeItems = (e) => {
        console.log(e.target);
    }


    callbackFunction(childData) {
        console.log(childData);

        if (this.state.userID !== 0) {
            Axios.post("/api/add_multiple_dkitems", {
                list: childData,
                uid: this.state.userID
            })
                .then((data) => {
                    console.log(data.data);

                    let objList = [];
                    data.data.forEach(el => {

                        let newObj = {
                            text: el.item,
                            key: el.id
                        }
                        objList.push(newObj);
                    })

                    console.log(objList);

                    //Destructure Additions & Add them to List
                    const newItems = [...this.state.items, ...objList];
                    console.log(newItems);
                    this.setState({
                        items: newItems
                    })
                })
        } else {
            // otherwise just add to state
            if (childData.length > 0) {

                let objList = [];
                childData.forEach(el => {
                    let keySalt = Math.floor(Math.random() * 10000);
                    console.log(keySalt);
                    console.log(typeof(keySalt));
                    let newObj = {
                        text: el,
                        key: Date.now() + keySalt
                    }
                    objList.push(newObj);
                })

                console.log(objList);

                //Destructure Additions & Add them to List
                const newItems = [...this.state.items, ...objList];
                console.log(newItems);
                this.setState({
                    items: newItems
                })
            }
        }


    }



    // load item list from the database for initial render
    componentDidMount() {
        Axios.get("/api/user_data")
            .then((data) => {
                console.log("user logged in")
                console.log(data);

                Axios.get("/api/disasterkit/" + data.data.id)
                    .then((all_items) => {
                        console.log(all_items.data);
                        let item_array = [];

                        all_items.data.forEach(item => {
                            let temp_item = {};
                            temp_item.text = item.item;
                            temp_item.key = item.id;
                            item_array.push(temp_item);
                        })
                        console.log(item_array);

                        this.setState({ items: item_array, userID: data.data.id });
                    });
            })
            .catch((err) => {
                // user is not logged in
                this.setState({
                    items: [
                        {
                            text: "Water (3 days supply)",
                            key: -1
                        },
                        {
                            text: "Food (3 day supply)",
                            key: -2
                        },
                        {
                            text: "Battery-powered or hand crank radio",
                            key: -3
                        },
                        {
                            text: "Flashlight",
                            key: -4
                        },
                        {
                            text: "First aid kit",
                            key: -5
                        },
                        {
                            text: "Extra batteries",
                            key: -6
                        },
                        {
                            text: "Whistle (to signal for help)",
                            key: -7
                        },
                        {
                            text: "Dust mask",
                            key: -8
                        },
                        {
                            text: "Plastic sheeting and duct tape",
                            key: -9
                        },
                        {
                            text: "Moist towelettes",
                            key: -10
                        },
                        {
                            text: "Wrench or pliers",
                            key: -11
                        },
                        {
                            text: "Manual can opener",
                            key: -12
                        },
                        {
                            text: "Local maps",
                            key: -13
                        },
                        {
                            text: "Cell phone with chargers",
                            key: -14
                        }
                    ]
                })

            })
    }

    render() {
        console.log(this.state)
        return (
            <div className = "container lift">
            < Card style={{ backgroundColor: 'white', marginRight: '7px' }}>
                <CardGroup >
                    <Card id="essentials" style={{ border: 'none' }}>
                        <div className="survivor">
                            <Card.Header style={{ textAlign: 'center', fontWeight: 'bolder', color: '#f6f6f6', background: '#333', fontSize: '17px' }}> Recent Disasters </Card.Header>

                                <header className="mx-auto kitcard">
                                <div className="row">
                                    <div className="col-10 offset-1">


                                <label htmlFor="state">State</label>
                                <select onChange={this.handleStateChange} className="form-control mx-auto" id="FTUstateSelect">
                                {stateNames.sort().map((name, index) => (
                                    <option key={index}>{name}</option>
                                ))}
                                </select>
                                <label className="mt-2" htmlFor="county">County</label>
                                <select onChange={this.handleCountyChange} className="form-control mx-auto" id="FTUcountySelect">
                                {this.state.countyList.sort().map(county => (
                                    <option>{county}</option>
                                    ))}
                                </select>
                                    <div className="whatever"> 
                                    <button onClick={this.callkitAPI} style={{ margin: '5px', backgroundcolor: '#333', border: '1px solid #f6f6f6', borderradius: '40px', outline: 'none' }}>Submit</button>
                                    </div>

                                    </div>
                                </div>
                                </header>
                                <Card.Text>
                                    <KitResults id="fema" DisasterDeclarationsSummaries={this.state.data} parentCallback = {this.callbackFunction}/>
                                </Card.Text>
                        </div>
                    </Card>

                    
                    <Card style={{ marginLeft: '7px', border: 'none' }}>
                        <div className="listed">
                            <Card.Header style={{ textAlign: 'center', fontWeight: 'bolder', color: '#f6f6f6', background: '#333' }}>Create Your Disaster Kit </Card.Header>
                            <header>
                                <form id="to-do-form" onSubmit={this.addItem}>
                                    <div className="test">

                                <div className="whatever">

                                    <input type="text" placeholder="Enter Item" value={this.state.currentItem.text}
                                        onChange={this.handleInput} />
                                        
                                        </div>
                                        <div className="whatever">
                                    <button type="submit" style={{ backgroundcolor: '#333', border: '1px solid #f6f6f6', borderradius: '40px', outline: 'none' }}>Add</button>
                                    </div>
                                        </div>
                                </form>
                            </header>
                            <KitList items={this.state.items}
                                deleteItem={this.deleteItem}></KitList>
                        </div>
                    </Card>
                </CardGroup>
            </Card>
            </div>
        );
    }
}

export default Kit;