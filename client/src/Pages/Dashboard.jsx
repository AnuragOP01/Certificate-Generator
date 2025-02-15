import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import Navbar from '../Components/Navbar';
import AdminDash from '../Components/Admin/AdminDashboard/AdminDash';

function Dashboard() {
  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [formData, setFormData] = useState({
    basicInfo: { name: '', email: '', password: '', phone: '', address: '' },
    degree: { courseName: '', college: '' }
  });

  const fetchData = async () => {
      const res = await axiosInstance.get('/user/info')
      .then(res => {
      console.log(res)
      if(res.data.role === 'admin')
        {
          setShowAdmin(!showAdmin)
        }
        setData(res.data);
        setFormData(res.data);
        console.log(res.data);
        
      })
      .catch(e=>console.log(e))
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/user/update', {course : formData.degree.courseName , college : formData.degree.college , phone : formData.basicInfo.phone , address : formData.basicInfo.address , password : formData.basicInfo.password})
      .then(res=>console.log(res)
      )
      setData(formData);
      setShowForm(false);  // Close the form after updating
      fetchData()
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <div className="w-full min-h-screen  bg-gradient-to-t rounded-2xl from-blue-600 to-blue-700 text-white font-light text-2xl">
      
      {!showAdmin ? (
        <div>
          <Navbar/>
          <section className="flex flex-col w-full h-screen  gap-5">

          {/* <h1 className="p-6 text-left"> personal Details </h1> */}

            <h1 id="name" className="p-4 text-left">
              NAME: {data ? data.basicInfo.name : "noDetail"}
            </h1>
            <h1 id="Email" className=" p-4 text-left">
              E-MAIL: {data ? data.basicInfo.email : "noDetail"}
            </h1>
            <h1 id="Password" className="p-4 text-left">
              PASSWORD: {data ? data.basicInfo.password : "noDetail"}
            </h1>
            <h1 id="Phone-no." className="p-4 text-left">
              PHONE NO: {data ? data.basicInfo.phone : "NoDetail"}
            </h1>
           
            <h1 id="Address" className="p-4 text-left">
              ADDRESS: {data ? data.basicInfo.address : "NoDetail"}
            </h1>
            
            {/* <h1 className="p-6 text-left"> Educational Details </h1> */}
            
            <h1 id="Institution" className="p-4 text-left">
              Institution: {formData.degree?formData.degree.college : ""}
            </h1>
            <h1 id="Course" className="p-4 text-left">
              Pursuing Course: {formData.degree?formData.degree.courseName: ""}
            </h1>
            {/* <h1 id="Collage-name" className='text-center'>COLLEGE NAME: {data ? data.degree.institution : 'NoDetail'}</h1> */}
            <button
             className="m-2 p-2 w-40 bg-green-400 rounded-3xl text-white font-bold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => setShowForm(true)}
            >
              Update
            </button>
          </section>

          {showForm && (
            <div className="fixed rounded-2xl z-50 m-auto h-[90%] w-1/2 bg-gradient-to-tr from-yellow-500 to-red-600 inset-0 bg-opacity-50 flex justify-center items-center">
              <div className=" px-5 rounded-lg">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-4xl capitalize text-center font-light mb-10">
                    Update User Info
                  </h2>
                  
                  <div className="mb-4">
                    <label>Password: </label>
                    <br />
                    <input
                      className="text-gray-500 rounded-xl h-10"
                      type="password"
                      name="basicInfo.password"
                      value={formData.basicInfo.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label>Phone: </label>
                    <br />
                    <input
                      className="text-gray-500 rounded-xl h-10"
                      type="text"
                      name="basicInfo.phone"
                      value={formData.basicInfo.phone?formData.basicInfo.phone:""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label>Address: </label>
                    <br />
                    <textarea
                      className="text-gray-500 rounded-xl h-20"
                      type="text"
                      name="basicInfo.address"
                      value={formData.basicInfo.address?formData.basicInfo.address:""}
                      onChange={handleChange}
                    ></textarea>
                  </div>


                <div className="mb-4">
                <label>College Name : </label>
                <br/>
                <input className='text-gray-500 rounded-xl h-10' type="text" name="degree.college" value={formData.degree.college} onChange={handleChange} />
                </div>

                <div className="mb-4">
                <label>Pursuing Course : </label>
                <br/>
                <input className='text-gray-500 rounded-xl h-10' type="text" name="degree.courseName" value={formData.degree.courseName} onChange={handleChange} />
                </div>
              
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="m-2 p-2 w-40 bg-gray-500 rounded-3xl text-white font-bold hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"

                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="m-2 p-2 w-40 bg-green-400 rounded-3xl text-white font-bold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"

                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <AdminDash/>
        </>
      )}
    </div>
  );
}

export default Dashboard;
