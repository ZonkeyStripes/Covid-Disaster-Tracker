import React, { Component } from "react";
import "../Kit.css";
//import InputGroup from 'react-bootstrap/InputGroup';
//import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Form from 'react-bootstrap/Form';
import KitList from '../utils/kitList';
import kitAPI from '../utils/kitAPI';
import KitResults from '../utils/kitResults';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Card, CardGroup } from "react-bootstrap";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from "axios";
library.add(faTrash);

class Kit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            data: [],
            county: "",
            state: "",
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
        
        Axios.post("/api/add_dkitem", {
            text: newItem.text,
            uid: this.state.userID
        })
        .then((data) => {
            console.log(data.data.id);
            newItem.key = data.data.id;
            console.log(newItem);
            
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
        })
        

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
        kitAPI.getDisaster(this.state.county, this.state.state).then(res => {
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

    // load item list from the database for initial render
    componentDidMount(){
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

                this.setState({items: item_array, userID: data.data.id});
            });
        });
    }

    render() {
        console.log(this.state)
        return (
            < Card style={{backgroundColor: 'white', marginLeft: '10px'}}>
                <Card.Header id="jumbo" style={{ textAlign: 'center', fontWeight: 'bolder', color: 'white', fontSize: '30px',  border: '10px solid green', margin: '65px', backgroundColor: '#3a57af;' }}> Do You Have What You Need? </Card.Header>
                <CardGroup >
                    <Card style={{border: '7px solid green'}}> 
                    <div className="survivor">
                    <Card.Header style={{ textAlign: 'center', fontWeight: 'bolder', color: 'white', fontSize: '17px'}}> Disaster Essentials </Card.Header>
                            <header> 
                            <input type="text" placeholder="Enter County" name="county" onChange={this.onInputChange} value={this.state.county} />
                            <input type="text" placeholder="Enter State" name="state" onChange={this.onInputChange} value={this.state.state} />
                            <button onClick={this.callkitAPI} style={{ backgroundcolor: '#333', border: '1px solid #f6f6f6', borderradius: '40px', outline: 'none' }}>Submit</button>
                           </header>
                           <Card.Text>
                                <KitResults id="fema" DisasterDeclarationsSummaries={this.state.data} />
                            </Card.Text>
                            </div>
                    </Card>
                    <Card style={{border: '7px solid green'}}>
                        <div className="listed">
                            <Card.Header style={{ textAlign: 'center', fontWeight: 'bolder', color: 'white' }}>Create Your Disaster Kit </Card.Header>
                            <header>
                                <form id="to-do-form" onSubmit={this.addItem}>
                                    <input type="text" placeholder="Enter Text" value={this.state.currentItem.text}
                                        onChange={this.handleInput} />
                                    <button type="submit" style={{ backgroundcolor: '#333', border: '1px solid #f6f6f6', borderradius: '40px', outline: 'none' }}>Add</button>
                                </form>
                            </header>
                            <KitList items={this.state.items}
                                deleteItem={this.deleteItem}></KitList>
                        </div>
                    </Card>
                </CardGroup>
            </Card>
        );
    }
}

export default Kit;