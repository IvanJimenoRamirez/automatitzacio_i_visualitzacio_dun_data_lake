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
        this.endpoints = jsonData;
    }

    /**
     * Returns the endpoint with the given id.
     * @param {Integer} id The id of the endpoint to find
     * @returns the endpoint with the given id
     */
    findById(id) {
        return this.endpoints.find(endpoint => endpoint.id === id)
    }
    
    /**
     * Returns the number of endpoints.
     * @returns the number of endpoints
     */
    getNumberOfEndpoints() {
        return this.endpoints.length;
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
        if (search === "") return this.endpoints
        // Filter any endpoint that contains the search string in any of its fields
        return this.endpoints.filter(endpoint => {
            return endpoint.summary.toLowerCase().includes(search.toLowerCase()) || endpoint.description.toLowerCase().includes(search.toLowerCase()) || endpoint.route.toLowerCase().includes(search.toLowerCase())
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

    /**
     * Given a method and a search string, returns the list of endpoints that match the search.
     * @param {String} method The method to filter: GET, POST, PUT, DELETE, PATCH, any
     * @param {String} search The search string
     * @returns the list of endpoints that match the search
     */
    filter (method, search) {
        console.log("Filtering by method:", method, "and search:", search)
        if (method === "any" && search === "") return this.endpoints
        if (method === "any") return this.filterSearch(search)
        if (search === "") return this.filterMethod(method)
        return this.filterMethod(method).filter(endpoint => {
            return endpoint.summary.toLowerCase().includes(search.toLowerCase()) || endpoint.description.toLowerCase().includes(search.toLowerCase()) || endpoint.route.toLowerCase().includes(search.toLowerCase())
        })
    }

   
}