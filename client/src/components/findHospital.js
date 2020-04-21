import React, { useState, useEffect } from "react";

import axios from "axios";

function FindHospitals(props) {

    console.log("hello");

        const [hospital, setHospital] = useState([]);

        useEffect(() => {
            axios
            .get("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Urgent_Care_Facilities/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
            .then(res => {
                let info = res.data.features;
                setHospital(info);
            })
            .catch(err => {
                return err;
            });
        },            
        []);


        return (
            <div>
                <h4>
                    test hospital
                </h4>
                <ul>
                    {hospital.filter((elem) => {
                    return elem.attributes.COUNTY === "PIMA"
                    })
                    .map((elem, index) => {
                        return <div>
                            <li key={index}>Hospital name: {elem.attributes.NAME}<br />
                                Address: {elem.attributes.ADDRESS}<br />
                                Telephone: {elem.attributes.TELEPHONE}<br />
                                Fips Code: {elem.attributes.FIPS}
                                {/* X: {elem.attributes.X}<br /> */}
                                {/* Y: {elem.attributes.Y}<br /> */}
                            </li>
                        </div>
                    }) }
                </ul>
            </div>

        )
}

export default FindHospitals;