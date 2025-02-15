import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import axiosInstance from '../../../axiosInstance';

const Certified = ({setStudent}) => {
  const [user, setUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [search , setSearch] = React.useState('');

  const fetch = async () => {
    const res = await axiosInstance.get('/admin/Certified')
      .then(res => {
        setUser(res.data.students); 
        setSelectedUsers(new Array(res.data.students.length).fill(false)); 
        console.log(res.data);
      })
      .catch(e => console.log(e));  
  };
  

  useEffect(() => {
    fetch();
  }, []);

  const handleSelectAll = () => {
    const allSelected = selectedUsers.every((selected) => selected);
    const newSelectedUsers = selectedUsers.map(() => !allSelected);
    setSelectedUsers(newSelectedUsers);

    if (allSelected) {
      setSelectedEmails([]);
    } else {
      const allEmails = user.map((per) => per._id);
      setSelectedEmails(allEmails);
    }
  };

  const handleCheckboxChange = (index, id) => {
    const updatedSelections = [...selectedUsers];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedUsers(updatedSelections);

    if (updatedSelections[index]) {
      setSelectedEmails([...selectedEmails, id]);
    } else {
      setSelectedEmails(selectedEmails.filter((e) => e !== id));
    }
    
  };

  const clear = () => {
    setSelectedUsers(new Array(user.length).fill(false));
    setSelectedEmails([]);
  };

  const unverify = async () =>{
    const res = await axiosInstance.post('/certificate/uncertificate' , { ids : selectedEmails})
    .then(async res => {
      console.log(res.data)
      await fetch();
    })
    .catch(e => console.log(e))
}

const unverifyOne= async (id) =>{
  const res = await axiosInstance.post(`/certificate/uncertificate/${id}`)
  .then(async res => {
    console.log(res.data)
    await fetch();
  })
  .catch(e => console.log(e))
}

  return (
    <div className="w-full min-h-screen font-serif bg-gradient-to-t rounded-s-2xl from-blue-600 to-blue-700 text-white font-light text-2xl">
      <Navbar setSearch = {setSearch} search={search} setStudent =  {setStudent} />
    <div className="flex flex-col font-medium text-2xl mt-10">
      <h1 className="text-center">All Cerified Users</h1>
      <table>
        <thead>
          <tr className="rounded-md border bg-black shadow-xl shadow-slate-500  mb-10 m-auto">
            <th className='p-4'>S.no</th>
            <th className='p-4'>Name</th>
            <th className='p-4'>Email</th>
            
            <th className="p-4">
                Select All{" "}
                <input
                  type="radio"
                  name="selectall"
                  onChange={handleSelectAll}
                  checked={selectedUsers.every((selected) => selected)}
                />
              </th>
              <th className="p-4">UnCertify</th>
          </tr>
        </thead>
        <tbody>
          {user && (
            user
            .filter(per => per.basicInfo.name.toLowerCase().startsWith(search))| per.basicInfo.email.toLowerCase().startsWith(search)
            .map((per, index) => (
              <tr
                className="rounded-md hover:bg-blue-500 border shadow-xl shadow-slate-500 mb-10 m-auto"
                key={per._id}
              >
                <td className="text-center p-4"> {index + 1}</td>
                <td className="text-center p-4"> {per.basicInfo.name}</td>
                <td className="text-center p-4"> {per.basicInfo.email}</td>
                
                <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers[index]}
                        onChange={() => handleCheckboxChange(index, per._id)}
                        name="check"
                      />
                    </td>
                    <td>
                      <button onClick={()=>unverifyOne(per._id)} 
                      className="bg-green-500 my-2 hover:bg-green-600 text-white font-light py-2 px-4 rounded">
                        UnCertify
                      </button>
                    </td>
              </tr>
            ))
          )}
          <div className='flex justify-around'>
            <button onClick={clear}
            className="bg-green-500 my-2 hover:bg-green-600 text-white font-light py-2 px-4 rounded">
              Clear
            </button>

            <button onClick={unverify}
            className="bg-green-500 my-2 hover:bg-green-600 text-white font-light py-2 px-4 rounded">
              UnCertify All
            </button>
          </div>
        </tbody>
      </table>
      </div>
      </div>
  );
}

export default Certified;


