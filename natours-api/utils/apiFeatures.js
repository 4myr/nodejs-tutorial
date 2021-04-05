class  APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter () {
        
        this.query = this.query.find(this.queryString);
        return this;
    }
}

module.exports = APIFeatures;