import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fireBase";
import axios from "axios";
import { cleaupError, deleteInFailure, deleteInStart, deleteInSuccess, updateInFailure, updateInStart, updateInSuccess } from "../slices/slice";



const Profile = () => {
  const  stateUser = useSelector(
    (state) => state.user
  );
  const [profilePicture, setProfilePicture] = useState(stateUser?.userData?.avatar || "");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [errMessage, setErrMessage] = useState("");
 const [formData , setFormData] = useState({});
  
  const dispatch = useDispatch();

  console.log(stateUser.userData , "stateUser.userData");

  useEffect(() => {
    if (!stateUser.userData) {
      navigate("/login");
    } else {
      console.log(stateUser.userData, "stateUser.userData-------------");
      dispatch(cleaupError())
    }
  }, []);

  useEffect(() =>{
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    if(file instanceof File){
     const storageRef = ref(storage, file.name);
     if(file.type.includes("image")) {
      setErrMessage("");
      const uploadBytes = uploadBytesResumable(storageRef, file);

     // Tracking the upload status
       //1. tracking the amount of data uploaded
       //2.error observer
       //3. completion observer
       uploadBytes.on(
        "state_changed",
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(progress, "progress");
          setProgress(Math.round(progress));
        },
        (err) => {
          setProgress("");
          console.log(err);
          
          setErrMessage("Error while uploading the image");
        } ,
        ()  => {
          getDownloadURL(uploadBytes.snapshot.ref).then((downloadURL) =>{
            setProfilePicture(downloadURL);
            console.log(downloadURL );
         
            setProgress("");
          })
        } 
      
      );
    }else{
      setErrMessage("Invalid format of file")
    }
   }

    
  };

  console.log(formData , "formData");

  const handleDeleteUser = async() =>{
    try {
      dispatch(deleteInStart())
      const res = await fetch(`/api/user/delete/${stateUser.userData._id}`,{
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        }
      });
     
      const resData = await res.json();
      console.log(resData, "resData");
      
      if(!resData.success){
        dispatch(deleteInFailure(resData))
        return
      }
      dispatch(deleteInSuccess(resData));
      navigate("/login");
    } catch (error) {
      console.log("Error while deleting the user" , error);
      
    }
  }
  

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }



  const handleSubmit = async() =>{
        const formDetails = {
          ...formData,
          avatar : profilePicture
        }
        console.log(formDetails , "formDetails");
        
    try {
      dispatch(updateInStart())
      const res = await fetch(`/api/user/update/${stateUser.userData._id}` , {
        method : "POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(formDetails)
      })

      const resData = await res.json();
      console.log(resData,"resData");
      if(!resData.success){
        dispatch(updateInFailure(resData));
        return
      }
      dispatch(updateInSuccess(resData));
      
    } catch (error) {
       console.log(error , "error------------------------");
       
    }
    
      // const headers = {
      //   "Content-Type" : "application/json"
      // }
      //    axios.post(`/api/user/update/${stateUser.userData._id}`,{
      //     formData , headers
      //   }).then((res) => console.log(res , "res")
      //   ).catch(err => console.log(err , "error")
      //   )
     
  }


  const handleSignOut = async() =>{
      try {
        const res = await fetch("/api/auth/signout",{
          method : "GET",
          headers : {
            "Content-Type" : "application/json"
          }
        })

        const resData  = await res.json();
        console.log(resData , "signOut");
        
        dispatch(deleteInSuccess(resData))
        navigate("/login")
      } catch (error) {
        console.log(error , "Error while logging out---------");
        
      }
  }

  return (
    <section className="w-full h-[90vh] bg-[#F1F5F1]">
      <div className="flex py-10 m-auto  items-center justify-center max-w-[380px] flex-col gap-4">
        <h1 className="text-3xl pb-4">Profile</h1>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            handleChange
            setFile(e.target.files[0])}}
          hidden
          accept="image/*"
        />
        <div className="w-[60px] object-cover  h-[60px] rounded-full ">
          <img className=" w-[60px] object-cover  h-[60px] rounded-full"
            src={profilePicture || stateUser?.userData?.avatar}
            onClick={() => fileInputRef.current.click()}
            alt=""
          />
        </div>
        {progress ? (
          <>
            <h1
              className={`font-semibold ${progress == 100 ? "text-green-600" :" text-slate-700"} `}
            >
             {
              progress == 100 ? `Image uploaded Successfully` :  `Uploading ${progress} % completed...`
             }
            </h1>
          </>
        ) : null}
        {
          errMessage ? <h1 className="text-red-500 font-semibold">{errMessage}</h1> : null
        }
        <div className="w-full ">
          <input
           onChange={(e) => handleChange(e)}
            className="w-full  border border-[#d4d4d4]  rounded-xl outline-none p-3 bg-white h-[45px]"
            type="text"
            defaultValue={stateUser.userData?.username}
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="w-full ">
          <input
            onChange={(e) => handleChange(e)}
            className="w-full border border-[#d4d4d4]   p-3 rounded-xl outline-none bg-white h-[45px]"
            type="email"
            id="email"
            defaultValue={stateUser.userData?.email}
            placeholder="Email"
          />
        </div>
        <div className="w-full ">
          <input
            onChange={(e) => handleChange(e)}
            className="w-full  border border-[#d4d4d4] p-3 rounded-xl outline-none bg-white h-[45px]"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        {
          stateUser.error ?<>
          <h1 className={` font-semibold ${stateUser.error.success ? "text-green-600" : "text-red-600"}`}>{stateUser.error.message}</h1>
          </> : null
        }
        <button onClick={handleSubmit} className="w-full cursor-pointer active:scale-[0.95] transition-all rounded-xl h-[45px] p-3 font-400 text-white bg-[#3C4A5D]">
          {stateUser.loading ? "Loading..." : "Update"}
        </button>
        <button className="w-full cursor-pointer active:scale-[0.95] transition-all rounded-xl h-[45px] p-3 font-400 text-white bg-[green]">
          {isLoading ? "Loading..." : "Create Listing"}
        </button>
        <div className="w-full flex items-center justify-between">
          <button onClick={handleDeleteUser} className="border-none hover:font-semibold  cursor-pointer text-red-600">Delete account</button>
          <button onClick={handleSignOut} className="border-none hover:font-semibold cursor-pointer text-red-600">Sign out</button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
