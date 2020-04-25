import axios from "axios";

export default {
    getDisaster: function(county, state) {
        return axios.get(`https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=(declarationDate%20gt%20%272019-01-01T04:00:00.000z%27%20and%20state%20eq%20%27${state}%27%20and%20declaredCountyArea%20eq%20%27${county}%20(County)%27)&$top=4`)
    }
}

// `https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=(state%20eq%20%27${state}%27%20and%20declaredCountyArea%20eq%20%27${county}%20(County)%27)%20or%20disasterNumber%20eq%201570&$top=4`


// `https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=(declarationDate%20gt%20%272020-01-01T04:00:00.000z%27&$%20and%20state%20eq%20%27${state}%27%20and%20declaredCountyArea%20eq%20%27${county}%20(County)%27)%20or%20disasterNumber%20eq%201570&$top=4`