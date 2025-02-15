import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axiosInstance';
import Navbar from '../../Navbar';

const Delete = () => {
  const [user, setUser] = useState([]);
  const [deleted , setDeleted] = useState([]);
  const [search , setSearch] = React.useState('');

  const fetch = async () => {
    try {
      const res = await axiosInstance.get("/admin/alluser");
      setUser(res.data.allUser);
      console.log(res.data.allUser);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const userDelete = (id , name) => {
    console.log(id , name);
    axiosInstance.delete(`/admin/${id}`, { data: { name } })
    .then(res => {console.log(res.data)
      fetch()
    })
    .catch(e => console.log(e))
  };
  

  return (
    <div className="w-full min-h-screen rounded-s-xl bg-gradient-to-t font-serif from-blue-600 to-blue-700 text-white font-light text-2xl flex flex-col">
      <Navbar setSearch = {setSearch} search={search} />
      <div className="w-full flex flex-col items-center mt-5 justify-center">
        <h1 className="text-center mb-8">Delete Student</h1>
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
            .filter(per => per.basicInfo.name.toLowerCase().startsWith(search.toLowerCase()))| per.basicInfo.email.toLowerCase().startsWith(search)
            .map((per, index) => (
              <tr
                onClick={() => userDelete(per._id,per.basicInfo.name)}
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

        
      </div>
    </div>
  );

}

export default Delete