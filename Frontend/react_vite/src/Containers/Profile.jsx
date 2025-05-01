import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fireBase";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [errMessage, setErrMessage] = useState("");

  const { loading, errorMessage, userData } = useSelector(
    (state) => state.user
  );

  // console.log(userData , "userData");

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      console.log(userData, "userData-------------");
      setUserName(userData.username);
      setEmail(userData.email);
    }
  }, []);

  useEffect(() => {
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

  return (
    <section className="w-full h-[90vh] bg-[#F1F5F1]">
      <div className="flex py-10 m-auto  items-center justify-center max-w-[380px] flex-col gap-4">
        <h1 className="text-3xl pb-4">Profile</h1>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <div className="w-[60px] object-cover  h-[60px] rounded-full ">
          <img className=" w-[60px] object-cover  h-[60px] rounded-full"
            src={profilePicture || userData.avatar}
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
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="w-full  border border-[#d4d4d4]  rounded-xl outline-none p-3 bg-white h-[45px]"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="w-full ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-[#d4d4d4]   p-3 rounded-xl outline-none bg-white h-[45px]"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="w-full ">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full  border border-[#d4d4d4] p-3 rounded-xl outline-none bg-white h-[45px]"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="w-full cursor-pointer active:scale-[0.95] transition-all rounded-xl h-[45px] p-3 font-400 text-white bg-[#3C4A5D]">
          {isLoading ? "Loading..." : "Update"}
        </button>
        <button className="w-full cursor-pointer active:scale-[0.95] transition-all rounded-xl h-[45px] p-3 font-400 text-white bg-[green]">
          {isLoading ? "Loading..." : "Create Listing"}
        </button>
      </div>
    </section>
  );
};

export default Profile;
