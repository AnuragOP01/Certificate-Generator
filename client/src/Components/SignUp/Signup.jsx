import React, { useState } from "react";
import Bg from "../../assets/Bg.jpg";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:3000/auth/signup", { name, email, password } , { withCredentials: true } )
      .then((result) => {
        console.log(result);
        const data = result.data;
        if(!data.error){
        navigate("/otp");
        }
      })
      .catch((err) => console.log(err)
    );
  };

  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900">
      <img
        src={Bg}
        alt="bg "
        className="h-screen w-screen absolute top-0 left-0 "
      />
<div className="w-full m-auto absolute left-96 right-96  max-w-md p-8 space-y-8 bg-transparent border-2 backdrop-blur-[4px] z-10 bg-opacity-0 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Register to Your Account</h2>

        
        <form className=" space-y-6">
            <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300 blur-0">Name</label>
                <input  type="text" id="text" name="text" required="" onChange={(e)=>setName(e.target.value)} className="text-black h-10 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="you@example.com"/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">Email</label>
                <input type="email" id="email" name="email" required="" onChange={(e)=>setEmail(e.target.value)} className="text-black h-10 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="you@example.com"/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300">Password</label>
                <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required="" className="text-black h-10 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••"/>
            </div>
        
            <button type="submit" onClick={Submit}  className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                Register
            </button>
            
        </form>
            <p className="text-lg font-normal  text-center text-black ">
                Already have an account? <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</a>
            </p>
        </div>



    </div>
  );
};

export default Signup;
