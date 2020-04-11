import React, { Component } from "react";

class DataTable extends Component {
    constructor(props, context) {
        super(props);
    console.log("props in DataTable = ");
    console.log(props);
    }

    render () {
    return(
        <div>
            <table>
                <thead>
                    <tr>
                    <th>State</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.data.map((el, index) => {
                    return <tr key={index}>
                        <td>{el.state}</td>
                        <td>{el.cases}</td>
                        <td>{el.deaths}</td>
                        </tr>;
                })}
                </tbody>
            </table>
        </div>
        )
    }
}

export default DataTable;