import React, { useState } from "react";

import axios from "axios";

function LoadHospitals() {
    
        const [hospital, setHospital] = useState([]);

        axios
            .get("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Urgent_Care_Facilities/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
            .then(res => {

                let info = res.data.features;
                setHospital(info);
            })
            .catch(err => {
                return err;
            });
        return (
            <div>
                <h2>
                    test hospital
                </h2>
                <ul>
                    {hospital.filter((elem) => {
                    return elem.attributes.COUNTY === "PIMA"
                    })
                    .map((elem, index) => {
                        return <div>
                            <li key={index}>Hospital name: {elem.attributes.NAME}<br />
                                Address: {elem.attributes.ADDRESS}<br />
                                Telephone: {elem.attributes.TELEPHONE}<br />
                                X: {elem.attributes.X}<br />
                                Y: {elem.attributes.Y}<br />
                            </li>
                            

                        </div>
                    }) }
                </ul>
            </div>

        )
}

export default LoadHospitals;