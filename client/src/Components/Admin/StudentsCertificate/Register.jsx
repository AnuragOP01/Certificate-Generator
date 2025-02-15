import React from 'react'
import Navbar from '../../Navbar';
import axios from 'axios';

const Register = () => {
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [gender, setGender] = React.useState();
    const [search , setSearch] = React.useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
      axios
      .post("http://localhost:3000/auth/register", { name, email , gender : formData.get("gender")  } )
      .then((result) => {
        setEmail('')
        setName('')
        setGender('')
        console.log(result);
      })
      .catch((err) => console.log(err)
    );

    }
  return (
    <div className="w-full min-h-screen font-serif bg-gradient-to-t rounded-s-2xl from-blue-600 to-blue-700 text-white font-light text-2xl">
      <Navbar setSearch = {setSearch} />
    <div className="flex flex-col font-medium text-2xl mt-10">
      <h1 className="text-center text-3xl">Register a student</h1>
        <form className=' mt-[5%] space-y-6 w-1/2 m-auto border-2 border-blue-100 p-8 rounded-lg' onSubmit={handleSubmit}>
            <div>
                <label className=" text-white block mb-2 text-lg font-medium m-auto text-center dark:text-gray-300 blur-0">Name</label>
                <input  type="text" id="text" name="text" required="" value={name} onChange={(e)=>setName(e.target.value)} className="text-black h-10 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="you@example.com"/>
            </div>
            <div>
                <label className="block mb-2 text-lg font-medium text-white text-center dark:text-gray-300">Email</label>
                <input type="email" id="email" name="email" required="" value={email} onChange={(e)=>setEmail(e.target.value)} className="text-black h-10 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="you@example.com"/>
            </div>
            <div>
                <label className="block mb-2 text-lg font-medium text-white text-center dark:text-gray-300">Gender</label>
                <div className='flex justify-start'>
                <div className="mx-4">
                <input
                  type="radio"
                  id="radio1"
                  name="gender"
                  onClick={e => setGender(e.target.value)}
                  value="male"
                  checked = {gender === "male"}
                  className="h-4 w-4 text-blue-600 border-blue-300 rounded-full"
                />
                <label className="ml-2 text-lg text-black-600">
                  Male
                </label>
              </div>
              <div className=" mx-4">
                <input
                  type="radio"
                  id="radio2"
                  name="gender"
                  value="female"
                  onClick={e => setGender(e.target.value)}
                  checked = {gender === "female"}
                  className="h-4 w-4 text-blue-600 border-blue-300 rounded-full"
                />
                <label className="ml-2 text-lg text-black-600">
                  Female
                </label>
              </div>
              </div>
            </div>

            <button type="submit" className="w-full px-5 mt-8 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
                Register
            </button>
        </form>
      </div>
      </div>
  )
}

export default Register