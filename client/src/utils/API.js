import axios from "axios";

export default {
    getNews: function() {
        return axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=6357cdd3d6b24dc4805cd011b911f281")
    },
}