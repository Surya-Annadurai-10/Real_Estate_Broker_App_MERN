const errorMiddleware = (err , req , res , next) =>{
   console.log(err , "Error");
   const statusCode = err.statusCode || 500;
   const errMessage = err.message || "Internal server Error";
   
   res.status(statusCode).json({
    success : false,
    message : errMessage
   });
}

module.exports = errorMiddleware;