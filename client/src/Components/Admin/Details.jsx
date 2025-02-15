import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import axiosInstance from '../../axiosInstance';

function Details() {
  const [user, setUser] = useState([]);
  const [details, setDetails] = useState([]);
  const [degree, setDegree] = useState([]);
  const [search , setSearch] = React.useState('');
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUser(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  const userLearning = (info,deg) => {
    setDetails(info);
    setDegree(deg)
    console.log(info);
  };
  const clearDetails = () => {
    setDetails([]);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t rounded-s-xl font-serif from-blue-600 to-blue-700 text-white font-light text-2xl flex flex-col">
      <Navbar setSearch={setSearch} search={search} />
      <div className="w-full flex flex-col items-center mt-5 justify-center">
        <h1 className="text-center mb-8">Student Details</h1>
        <table className="table-auto max-w-4xl w-full mx-auto font-light rounded-xl ">
          <thead>
            <tr className="rounded-md border shadow-xl shadow-slate-500 bg-slate-900">
              <th className="p-4">S.no</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user
                .filter((per) =>
                  per.basicInfo.name
                    .toLowerCase()
                    .startsWith(search.toLowerCase())
                )
                .map((per, index) => (
                  <tr
                    onClick={() => userLearning(per.basicInfo, per.degree)}
                    className="  rounded-md border shadow-xl shadow-slate-500 cursor-pointer hover:bg-blue-500 transition-colors duration-300"
                    key={per.basicInfo}
                  >
                    <td className="text-center p-4">{index + 1}</td>
                    <td className="text-left p-4">{per.basicInfo.name}</td>
                    <td className="text-left p-4">{per.basicInfo.email}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {details.length !== 0 && (
          <div className="fixed rounded-2xl m-auto h-[60%] w-1/2 z-50 bg-gradient-to-tr from-yellow-500 to-red-600 inset-0 bg-opacity-50 flex flex-col justify-center items-center overflow-hidden">
            <h2 className="text-center text-xl mt-4">User Details</h2>
            <div
              className="flex-1 overflow-y-auto w-full p-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <p className="text-lg">Name : {details.name}</p>
                <p className="text-lg">Email : {details.email}</p>
                <p className="text-lg">Password : {details.password}</p>

                {degree && (
                  <div>
                    <p className="text-lg py-2">Institution : {degree?degree.institution:""}</p>
                    <p className="text-lg py-2">Pursuing Course : {degree?degree.degreeName:""}</p>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={clearDetails}
              className="mt-4 mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

}

export default Details