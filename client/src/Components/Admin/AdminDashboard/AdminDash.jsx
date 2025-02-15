import React, { useEffect, useState } from 'react';
import Delete from '../StudentsCertificate/Delete';
import Navbar from '../../Navbar';
import Verified from '../StudentsCertificate/Verified';
import Unverified from '../StudentsCertificate/Unverified';
import Uncertified from '../StudentsCertificate/Uncertified';
import Certified from '../StudentsCertificate/Certified';
import Register from '../StudentsCertificate/Register';
    
function AdminDash() {
    const [student , setStudent] = useState(0);

    const getStudent = () => {
      if (student === 0)
        return (
          <div className="min-h-screen ">
            <Navbar setStudent =  {setStudent}/>
            <div className="container mx-auto py-8">
              <h1 className="text-3xl text-center mt-6  underline">
                All Students
              </h1>
              <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-2 md:gap-20 md:mx-28">
                <button
                  onClick={() => setStudent(3)}
                  className="p-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                >
                  All Verified Students
                </button>
                <button
                  onClick={() => setStudent(1)}
                  className="p-6 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
                >
                  All Unverified Students
                </button>
                <button
                  onClick={() => setStudent(4)}
                  className="p-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
                >
                  All Certified Students
                </button>
                <button
                  onClick={() => setStudent(2)}
                  className="p-6 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition-colors"
                >
                  All Uncertified Students
                </button>
                <button
                  onClick={() => setStudent(5)}
                  className="p-6 bg-fuchsia-600 text-white rounded-lg shadow-lg hover:bg-fuchsia-700 transition-colors"
                >
                  Register Students
                </button>
                <button
                  onClick={() => setStudent(6)}
                  className="p-6 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        );
      else if(student == 1) return <Unverified setStudent =  {setStudent}/> 
      else if(student == 2) return <Uncertified setStudent =  {setStudent}/>
      else if(student == 3) return <Verified setStudent =  {setStudent}/>
      else if(student == 4) return <Certified setStudent =  {setStudent}/>
      else if(student == 5) return <Register setStudent =  {setStudent}/>
      else if(student == 6) return <Delete setStudent =  {setStudent}/>

    }

  return (
    <div>
      <div>{getStudent()}</div>
    </div>
  );
}

export default AdminDash