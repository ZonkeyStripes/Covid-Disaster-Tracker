import React, { Component, setState } from 'react';

class DeltaTable extends Component {

    constructor(props) {
        super(props);

        props.deltaArray.sort((a, b) => (a.deltaCases < b.deltaCases) ? 1 : (a.deltaCases === b.deltaCases) ? ((a.state > b.state) ? 1 : -1) : -1 );

        this.state = {
            deltaArray: props.deltaArray
        }
    }

    render() {

        let tableBody = "";
        if(this.props.displayed === "cases") {
            tableBody = this.props.deltaArray.map((el, index) => (
                <tr key={index}>
                <th scope="row">{el.state}</th>
                <td>{el.cases1}</td>
                <td>{el.cases2}</td>
                <td>+{el.deltaCases}</td>
                </tr>
                ))
        } else {
            tableBody = this.props.deltaArray.map((el, index) => (
                <tr key={index}>
                <th scope="row">{el.state}</th>
                <td>{el.deaths1}</td>
                <td>{el.deaths2}</td>
                <td>+{el.deltaDeaths}</td>
                </tr>
                ))
        }

        let displayType = "";
        if(this.props.displayed === "cases") {
            displayType = "Cases";
        } else
        {
            displayType = "Deaths";
        }


        return (
            <div>
                <p className="text-center table-top-text mt-2">Total {this.props.displayed}</p>
                <h2 className="text-center">{this.props.total.toLocaleString()}</h2>
                <table class="table">
                    <tbody>
                        <tr>
                            <th scope="col">State</th>
                            <th scope="col">{displayType}<br />
                            {this.props.fromDate}</th>
                            <th scope="col">{displayType}<br />
                            {this.props.toDate}</th>
                            <th scope="col">New {displayType}</th>
                        </tr>
                        {tableBody}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default DeltaTable;