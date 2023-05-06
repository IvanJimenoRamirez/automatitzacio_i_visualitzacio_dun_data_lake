export class ProjectsDTO {
    //projects is a list of projects like this:

    /* 
    [
        {
            "id": 1,
            "name": "AnnotationAppAnnotations"
        }
    ]
    */

    /**
     * Constructs a TLDStatisticsDTO object.
     * @param {*} jsonData the json data to be parsed
     */
    constructor(jsonData) {
        this.projects = jsonData;
    }

    /**
     * Returns the list of endpoints.
     * @returns the list of endpoints
     */
    getList() {
        return this.endpoints;
    }
}