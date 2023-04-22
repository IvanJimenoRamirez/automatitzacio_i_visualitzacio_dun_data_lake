export class EndpointsDTO {
    //endpoints is a list of endpoints like this:

    /* 
    [
        {
            "id": 1,
            "route": "/DataLakeAPI/temporalLandingZone/{source}/{file_name}/exists",
            "project_id": null,
            "name": "Existeix fitxer",
            "method": "GET",
            "zone_id": 1,
            "description": "Comproba si un fitxer existeix per la font de dades indicada",
            "parameters": [
                {
                    "endpoint_id": 1,
                    "name": "file_name",
                    "description": "Nom del arxiu",
                    "param_type": "path",
                    "id": 1,
                    "required": true
                },
                {
                    "endpoint_id": 1,
                    "name": "source",
                    "description": "Nom de la font de dades",
                    "param_type": "path",
                    "id": 2,
                    "required": true
                }
            ]
        }
    ]
    */
    
    /**
     * Constructs a TLDStatisticsDTO object.
     * @param {*} jsonData the json data to be parsed
     */
    constructor(jsonData) {
        console.log("Data received:", jsonData)
        this.endpoints = jsonData;
    }

    /**
     * Returns the list of endpoints.
     * @returns the list of endpoints
     */
    getList() {
        return this.endpoints;
    }

    /**
     * Given a search string, returns the list of endpoints that match the search.
     * @param {String} search the search string
     * @returns the list of endpoints that match the search
     */
    filterSearch(search) {
        // Filter any endpoint that contains the search string in any of its fields
        return this.endpoints.filter(endpoint => {
            return endpoint.name.toLowerCase().includes(search.toLowerCase()) || endpoint.description.toLowerCase().includes(search.toLowerCase()) || endpoint.route.toLowerCase().includes(search.toLowerCase())
        })
    }

    /**
     * Given a search string, returns the list of endpoints that match the search.
     * @param {String} method the method to filter
     * @returns the list of endpoints that match the search
     */
    filterMethod(method) {
        // Filter any endpoint that contains the search string in any of its fields
        return this.endpoints.filter(endpoint => {
            return endpoint.method.toLowerCase().includes(method.toLowerCase())
        })
    }

   
}