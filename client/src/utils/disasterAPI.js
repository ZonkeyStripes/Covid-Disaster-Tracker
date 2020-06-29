import Axios from "axios";

export default {
    getDisasters: function() {
        return Axios.get("https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=declarationDate%20gt%20%272019-06-25T04:00:00.000z%27and incidentType ne 'Biological'&$top=4000")
    },

    getDisastersbyState: function(stateInput) {
        return Axios.get("https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=declarationDate ge '2019-04-21T04:00:00.000z' and state eq '" + stateInput + "' and incidentType ne 'Biological'")
    }
}