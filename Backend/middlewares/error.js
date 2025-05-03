const errorMiddleware = (err , req , res , next) =>{
   const statusCode = err.statusCode || 500;
   const errMessage = err.message || "Internal server Error";
   console.log(err , "Error");
   console.log({
      success : false,
      message : errMessage
     });
   
   
   res.status(statusCode).json({
    success : false,
    message : errMessage
   });
}

export default errorMiddleware;