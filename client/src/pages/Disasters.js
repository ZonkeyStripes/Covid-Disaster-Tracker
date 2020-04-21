import React, { Component } from "react";
import disasterAPI from "../utils/disasterAPI";
import "../App.css";
import Axios from "axios";

class Disasters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disasterList: []
        };

        // ES6 React.Component doesn't auto bind methods to itself
        // Need to bind them manually in constructor
        this.loadDisasters = this.loadDisasters.bind(this);

        //this.highlightFeature.bind(this)

    }

    componentDidMount() {
        console.log('mounted');
        
        this.loadDisasters();

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
    
                this.setState({locations: arrayOfLocations});
            })
        })
        .catch(function(err) {
            console.log("User is not logged in, display default states");
            console.log(err);
        })
    }
    
    
    loadDisasters() {

        disasterAPI.getDisastersbyState("CA")
            .then(res => {
                console.log(res.data.DisasterDeclarationsSummaries);
                this.setState({
                    disasterList: res.data.DisasterDeclarationsSummaries
                }, function () {
                    console.log(this.categorizeDisasters());
                })
            })
            .catch(err => console.log(err));
    };

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

    render() {
        return (
            <div>
                <h1>Disasters</h1>
            </div>
        // <div className="row">

        //     <div className="col-6 container newslist">
        //         <h2 className="newshead">COVID-19 in the United States</h2>
        //         <hr></hr>
        //         <ul>
        //             {/* loops thru articles, displays on page */}
        //             {articles.map(article => {
        //                 return (

        //                     <li>
        //                         <strong>{article.title}</strong>
        //                         <br></br>
        //                         {article.description}
        //                         <br></br>
        //                         <a href={article.url}> {article.url} </a>
        //                         <hr></hr>
        //                     </li>
        //                 );
        //             })}
        //         </ul>
        //             <p>Sourced from:</p>
        //             <br></br>
        //             <p>https://newsapi.org/</p>
        //     </div>
        //     <div className="col-6 faqs">
        //         <h2 className="faqhead">Frequently Asked Questions</h2>
        //         <hr></hr>
        //         <div className="stuff">
        //                 <Questions />
        //         </div>
        //         <br />
        //         <Symptoms />
        //         <p> See more FAQS at the CDC website here:<br></br>
        //             <a href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html">
        //                 https://www.cdc.gov/coronavirus/2019-ncov/faq.html</a>
        //         </p>
        //     </div>
        //     <div className="row">
        //     <Extras />
        //     </div>
        // </div>
    );
}


}

export default Disasters;