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
            }
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
        const newItem = this.state.currentItem;
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
    }
    deleteItem(key) {
        const filteredItems = this.state.items.filter(item =>
            item.key !== key);
            console.log(filteredItems)
        this.setState({
            items: filteredItems
        })
    }

    callkitAPI= () => {
        kitAPI.getDisaster(this.state.county, this.state.state).then(res => {
         this.setState({data: res.data.DisasterDeclarationsSummaries})
         console.log(res.data.DisasterDeclarationsSummaries)
        })
    }

    onInputChange= (e) => {
        const {name, value} = e.target;
        this.setState ({
            [name]: value
        })
    }
    // componentDidMount(){
    //     this.callkitAPI()
    // }

    render() {
        console.log(this.state)
        return (
            <>
            <input type= "text" name= "county" onChange= {this.onInputChange} value={this.state.county}/>
            <input type= "text" name= "state" onChange= {this.onInputChange} value={this.state.state}/>
            <button onClick= {this.callkitAPI}>Submit</button>
            <CardGroup>
                <Card border="secondary" style={{ width: '18rem', textAlign: 'center', fontWeight: 'bolder',  borderBottom: '1px solid #999' }}>
                    <Card.Header> Disaster Essentials </Card.Header>
                    <Card.Body>
                        <Card.Title style={{ weight: 'bold', color: 'rgb(67, 153, 67)' }}>Do You Have What You Need?</Card.Title>
                        <Card.Text>
                                <KitResults DisasterDeclarationsSummaries ={this.state.data}/>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <div className="listed">
                        <Card.Header style={{ textAlign: 'center', fontWeight: 'bolder', color: 'rgb(67, 153, 67)' }}>Create Your Disaster Kit </Card.Header>
                        <header>
                            <form id="to-do-form" onSubmit={this.addItem}>
                                <input type="text" placeholder="Enter Text" value={this.state.currentItem.text}
                                    onChange={this.handleInput} />
                                <button type="submit" style={{ backgroundcolor: '#333', border: '1px solid #f6f6f6', borderradius: '40px', outline: 'none'}}>Add</button>
                            </form>
                        </header>
                        <KitList items={this.state.items}
                            deleteItem={this.deleteItem}></KitList>
                    </div>
                </Card>
            </CardGroup>
            </>
        );
    }
}

export default Kit;

// class Kit extends Component {

//     render() {
//         return (
//             <div>

//                 <Form.Group size="lg">
//                     <InputGroup.Prepend>
//                         <InputGroup.Checkbox aria-label="Checkbox for following text input" />
//                     </InputGroup.Prepend>
//                     <Form.Control action variant="primary" placeholder="Recipient's username" />
//                     <InputGroup.Prepend>
//                         <InputGroup.Checkbox aria-label="Checkbox for following text input" />
//                     </InputGroup.Prepend>
//                     <Form.Control action variant="primary" placeholder="Recipient's username" />
//                     <InputGroup.Prepend>
//                         <InputGroup.Checkbox aria-label="Checkbox for following text input" />
//                     </InputGroup.Prepend>
//                     <Form.Control action variant="primary" placeholder="Recipient's username" />
//                     <InputGroup.Prepend>
//                         <InputGroup.Checkbox aria-label="Checkbox for following text input" />
//                     </InputGroup.Prepend>
//                     <Form.Control action variant="primary" placeholder="Recipient's username" />
//                 </Form.Group>


//             </div>
//         );
//     }
// }

// export default Kit;
