import Axios from "axios";

export default {
    getCountyInfo: function() {
        return Axios.get("/counties")
    },

    getStateInfo: function() {
        return Axios.get("/states")
    }
}