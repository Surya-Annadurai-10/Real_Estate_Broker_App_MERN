const SignOutController = (req , res , next) =>{
      try {
        res.clearCookie("access_token");
        res.status(200).json({
            success : true,
            message : "User logged out successfully !!"
        })
      } catch (error) {
        next(error)
      }
} 

export default SignOutController;