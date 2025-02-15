import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/SignUp/Signup'
import Login from './Components/Login'
import Dashboard from './Pages/Dashboard';
import Otp from './Components/Otp';


function App() {
  
  return (
    

      <BrowserRouter>
      <Routes>
          <Route path='/' exact element={<Signup/>}/>
          <Route path='/otp' exact element={<Otp/>}/>
          <Route path="/login" element={<Login/>} />
        
          {/* <Route path='/home' element = {<Sidebar />}> */}
            // user routes
            <Route path='/home/user' element={<Dashboard/>} />
            {/* <Route path="certificate" element={<Certirficate/>} />
            <Route path="learning" element={<Learning/>} />
            <Route path="detail" element={<Detail/>} /> */}
            // Admin routes
            <Route path='/home/admin' element={<Dashboard/>} />
            {/* <Route path='/home/learnings' element={<LearningStu/>} />
            <Route path='/home/details' element={<Details/>} />
            <Route path='/home/delete' element={<Delete/>} /> */}

            
          {/* </Route> */}
          
      </Routes>
    </BrowserRouter>
  );
}

export default App
