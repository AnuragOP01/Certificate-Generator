import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ResumeBuilder() {
  const [user,setUser] = useState([])
  useEffect(
    ()=>{
      const fetch = async ()=>{
        axios.get('http://localhost:3000/users')
        .then((res)=>{
          setUser(res.data)
          console.log(res.data);
        })
        .catch((e)=>{
          console.log(e);
        })
      }
      fetch()
    },[]
  )
  return (
    <div className=' flex flex-col font-medium text-2xl'>
      <h1 className=' text-center'> All Users</h1>
      {user&&(
            user.map((per)=>(
            <div className=' w-3/4 h-80 bg-slate-400 rounded-md border flex flex-col justify-around shadow-xl shadow-slate-500 mb-10 m-auto' key={per._id}>
              <h1 className='text-center'>User {}</h1>
                <h1 className='text-center'>ID : {per._id}</h1>
                <h1 className='text-center'> Name : {per.basicInfo.name}</h1>
                <h1 className='text-center'>Email : {per.basicInfo.email}</h1>
                <h1 className='text-center'>Password : {per.basicInfo.password}</h1>
            </div>
            ))
      )}
    </div>
  )
}

export default ResumeBuilder