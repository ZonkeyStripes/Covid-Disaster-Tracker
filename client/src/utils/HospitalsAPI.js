import axios from "axios";

export default {
    getHospitals: function() {
        return axios.get("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Urgent_Care_Facilities/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    },
};