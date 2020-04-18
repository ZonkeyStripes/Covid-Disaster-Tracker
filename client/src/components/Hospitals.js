import React from "react";
import getHospitals from "../utils/HospitalsAPI";
import HospitalsAPI from "../utils/HospitalsAPI";

function loadHospitals() {

    useEffect(() => {
        loadHospitals()
    }, []);

    HospitalsAPI.getNews()
        .then(res => {
            console.log(res.data.articles)
            setArticles(res.data.articles)
        })
        .catch(err => console.log(err));
};

export default loadHospitals;