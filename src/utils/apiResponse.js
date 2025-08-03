// API Response class
class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode // status code save
        this.data = data // response data
        this.message = message // default ya custom message
        this.success = statusCode < 400 // success check
    }
}

export { ApiResponse } // class export
