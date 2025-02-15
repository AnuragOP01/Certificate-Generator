import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Bg from "../assets/Bg.jpg";
import axiosInstance from '../axiosInstance';


function Otp() {
    const navigate = useNavigate()

    const [password, setPassword] = useState()
  
    const ResendOtp = ()=>{
        axiosInstance.post('/auth/resendotp' , {} , { withCredentials: true })
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
    }

    const handleSubmit = e => {
      e.preventDefault()
      axiosInstance
        .post('/auth/authenticate', { otp : password } , { withCredentials: true })
        .then((result) => {
          if(result.data.msg==='Success'){
            navigate('/login')
          }
          else if(result.data.msg){
            alert(result.data.msg)
          }
          else
          console.log(result.data)
          
        })
        .catch(err => console.log(err))
    } 
  
  return (
    <div className="flex items-center justify-center h-screen  dark:bg-gray-900">
        <img
        src={Bg}
        alt="bg "
        className="h-screen w-screen absolute top-0 left-0 "
      />
    <div className=" absolute left-96 right-96 m-auto w-full max-w-md p-8 space-y-8 bg-transparent border-2 backdrop-blur-[4px] z-10 bg-opacity-0 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white h-10">Verify Your OTP</h2>

        
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-gray-300 h-10">Your Otp : </label>
                <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required="" className="h-10 text-black block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••"/>
            </div>
        <div className=' flex flex-col justify-between'>
            <button type="submit"  className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                Verify
            </button>
            <br />
            <button onClick={ResendOtp}  className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                Resend OTP
            </button>
        </div>
        </form>
            {/* <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                 <a href="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
            </p> */}
    </div>
</div>
  )
}

export default Otp