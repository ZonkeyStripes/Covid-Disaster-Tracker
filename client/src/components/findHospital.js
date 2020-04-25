import React, { useState, useEffect } from "react";
import axios from "axios";
import HospitalAPI from "../utils/HospitalsAPI";

function FindHospitals(props) {

    // console.log(props.fips);

        const [hospital, setHospital] = useState([]);

        useEffect(() => {
            HospitalAPI.getHospitalsByFIPS(props.fips)
            .then(res => {
                console.log(res.data.feature);
                let info = res.data.features;
                setHospital(info);
            })
        },            
        []);

        return (
            <div>
                <h4>
                    Hospitals and Urgent Cares
                </h4>
                <ul>
                    {hospital.slice(0,5)
                    .map((elem, index) => {
                        return <div>
                            <li key={index}>Hospital name: {elem.attributes.NAME}<br />
                                Address: {elem.attributes.ADDRESS}<br />
                                Telephone: {elem.attributes.TELEPHONE}<br />
                                {/* Fips Code: {elem.attributes.FIPS} */}
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