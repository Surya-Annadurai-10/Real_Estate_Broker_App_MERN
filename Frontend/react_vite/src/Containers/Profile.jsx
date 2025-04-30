import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null)
    const {loading , errorMessage , userData } = useSelector(state => state.user);
  
    console.log(userData , "userData");
    
useEffect(() =>{
  if(!userData){
    navigate("/login")
  }
},[])

    const handleSignUp = async () => {
      let userData = {
        username: userName,
        email: email,
        password: password,
      };
  
      try {
        setIsLoading(true);
        setError({});
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        const data = await res.json();
        console.log(data, "data");
  
        if (data.success == false) {
          setIsLoading(false);
          setError(data);
          setUserName("");
          setEmail("");
          setPassword("");
          console.log("if block");
  
          return;
        }
        setIsLoading(false);
        setError(data);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        console.log(data, "data");
  
        console.log(userData, "userdata");
        setUserName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error, "---------error");
      }
    };
  
    return (
      <section className="w-full h-[90vh] bg-[#F1F5F1]">
        <div className="flex py-10 m-auto  items-center justify-center max-w-[380px] flex-col gap-4">
          <h1 className="text-3xl pb-4">Profile</h1>
          <input type="file" ref={fileInputRef} />
          <div  className='w-[60px]  h-[60px] rounded-full bg-red-500'>
           {
            userData ?  <img src={userData.avatar} alt="" /> : null
           }
          </div>
          {
            error ? <>
             <h1 className={`font-semibold ${error.success ? "text-green-500" : "text-red-500"}`}>
            {error.message}
          </h1>
            </> : null
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
          <button
            onClick={handleSignUp}
            className="w-full cursor-pointer active:scale-[0.95] transition-all rounded-xl h-[45px] p-3 font-400 text-white bg-[#3C4A5D]"
          >
            {isLoading ? "Loading..." : "SIGN UP"}
          </button>
          <OAuth />
          <p>
            Already have an account?
            <Link
              className="text-blue-700 hover:underline hover:underline-offset-2"
              to={"/login"}
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </section>
    );
}

export default Profile