export class TLDStatisticsDTO {
    //sources is a dictionary of the form {sourceName: numberOfMetadataFiles}
    
    /**
     * Constructs a TLDStatisticsDTO object.
     * @param {*} jsonData the json data to be parsed
     */
    constructor(jsonData) {
        console.log("Data received:", jsonData)
        this.sources = jsonData.sources;
    }

    /**
     * Get the total number of metadata files in the temporal landing zone
     * @returns {number} the total number of metadata records
     */
    getTotalMetadataCount() {
        let total = 0;
        for (const source in this.sources) {
            total += this.sources[source]
        }
        return total;
    }

    /**
     * Get the total number of data files in the temporal landing zone
     * @returns {number} the total number of sources in the temporal landing zone
     */
    getTotalSources() {
        return Object.keys(this.sources).length;
    }

    /**
     * Get the names of the sources in the temporal landing zone
     * @returns {Array} an array of the names of the sources in the temporal landing zone
     */
    getSourcesNames() {
        return Object.keys(this.sources);
    }
    
    /**
     * Get the number of metadata files in a specific source
     * @param {String} sourceName 
     * @returns {number} the number of metadata files in the source
     */
    getMetadataFromSource(sourceName) {
        return this.sources[sourceName];
    }
}