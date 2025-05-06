import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, googleAuthProvider } from '../fireBase';
import { useDispatch } from 'react-redux';
import { loginInFailure, loginInStart, loginInSuccess } from '../slices/slice';
import { useNavigate } from 'react-router-dom';


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleGoogleSignUp = async() =>{
        try {
           
          const res = await signInWithPopup(auth, googleAuthProvider);
        //   console.log(res.user.providerData, "res");
    
          const userData = {
            
            username: res.user.providerData[0].displayName,
            email: res.user.providerData[0].email,
            password: res.user.providerData[0].uid,
            avatar : res.user.providerData[0].photoURL,
          }

          const dataResponse = await fetch("/api/auth/google",{
            method : "POST",
            headers :{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify( userData)
          })

          const jsonData = await dataResponse.json();

          if(jsonData.success == false){
            dispatch(loginInFailure(jsonData.message));
            return
          }else{
          console.log(jsonData , "jsonData");
          dispatch(loginInSuccess(jsonData));
          navigate("/")
          }
          
        } catch (error) {
          console.log(error , "error");
          
        }
      }
    
  return (
    <button onClick={handleGoogleSignUp} className="w-full  cursor-pointer active:scale-[0.95] transition-all rounded-xl h-[45px] p-3 font-400 text-white bg-[#BC2727]">
    CONTINUE WITH GOOGLE
  </button>
  )
}

export default OAuth