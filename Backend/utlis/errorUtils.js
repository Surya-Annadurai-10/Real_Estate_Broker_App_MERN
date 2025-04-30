const errorUtils = (statusCode , errorMessage) =>{
    console.log( statusCode , errorMessage,"statusCode")
    const error = new Error();
    error.statusCode = statusCode || 500;
    error.message = errorMessage || "Internal server error";
    return error;
}

module.exports = errorUtils;