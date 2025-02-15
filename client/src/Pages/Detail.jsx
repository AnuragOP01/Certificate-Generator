import axios from 'axios'
import React, { useState } from 'react'

function Detail() {
    const [eduction,setEducation] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [email,setEmail] = useState('')
    const storeData = ()=>{
        axios.post('http://localhost:3000/update/:id',{eduction,phone,address,email})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className=' text-2xl bg-gradient-to-t from-slate-50 to-red-400 text-blue-600 '>
        <h1 className=' text-center mb-5'> Enter Your Details Here</h1>
        <form className=' flex flex-col ' onSubmit={storeData}>
            <input type="text" className=' h-15 bg-slate-500 rounded-xl mb-5 ' placeholder='Your Phone Number' onChange={(e)=>setPhone(e.target.value)}  value={phone} />
            <input type="text" className=' h-15 bg-slate-500 rounded-xl mb-5 ' placeholder='Your Address' onChange={(e)=>setAddress(e.target.value)}  value={address} />
            <input type="text" className=' h-15 bg-slate-500 rounded-xl mb-5 ' placeholder='Your College Name' onChange={(e)=>setEducation(e.target.value)}  value={eduction} />
            <input type="text" className=' h-15 bg-slate-500 rounded-xl mb-5 ' placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)}  value={email} />

            <button className=' bg-green-500 outline-dotted rounded-xl m-auto ' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Detail