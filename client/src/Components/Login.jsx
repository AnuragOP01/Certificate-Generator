import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Bg from "../assets/Bg.jpg";
import axiosInstance from '../axiosInstance';

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
  
   
  
    const handleSubmit = e => {
      e.preventDefault()
      axiosInstance
        .post('/auth/login', { email, password })
        .then((result) => {
          console.log(result)
          if(result.data.token) {
            localStorage.clear()
            localStorage.setItem("token", `${result.data.token}`);
            if(result.data.registers.role === "student"){
            navigate('/home/user')
            return   
            }
            if(result.data.registers.role === "admin"){
            navigate('/home/admin')
            return   
            }

          }
          else{
            alert(result.data)
          }
        })
        .catch(err => console.log(err))
    }
  
  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <img
        src={Bg}
        alt="bg "
        className="h-screen w-screen absolute top-0 left-0 "
      />
    <div className=" absolute left-96 right-96 m-auto w-full max-w-md p-8 space-y-8 bg-transparent backdrop-blur-[4px] border-2 z-10 bg-opacity-0 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white h-10">Login to Your Account</h2>

        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300 h-10">Email</label>
                <input type="email" id="email" name="email" required="" onChange={(e)=>setEmail(e.target.value)} className="h-10 block w-full text-black p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="you@example.com"/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300 h-10">Password</label>
                <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required="" className="h-10 text-black block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••"/>
            </div>
        
            <button type="submit"  className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                Login
            </button>
            
        </form>
            <p className=" text-center text-black text-base font-normal dark:text-gray-400">
                Don’t have an account? <a href="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
            </p>
    </div>
</div>
  )
}

export default Login