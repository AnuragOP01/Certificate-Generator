import React, { useEffect, useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import AdminDash from "./AdminDash";
import axiosInstance from "../axiosInstance";

const Sidebar = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/user/info');
      if(res.data.role === 'admin')
      {
        setShowAdmin(true)
      }
      
    } catch (e) {
      console.log(res);
      
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="font-serif">
      {!showAdmin ?  
    <div className="flex ">
      <aside className="flex h-screen fixed w-64 flex-col overflow-y-auto border-r px-3 ">
        <div className="my-2 flex flex-1 flex-col justify-between rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600">
          <nav className="-mx-3 space-y-6 px-6 ">
            <div className="space-y-3 mt-5">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
                    : "text-sm text-gray-200 flex transform items-center rounded-lg px-3 py-2  transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
                }
                to="/home/user"
              >
                <span className={`mx-2 font-medium `}>Dashboard</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700 "
                    : "text-sm flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
                }
                to="/home/learning"
              >
                <span className={`mx-2 font-medium `}>Learnings</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700 "
                    : "text-sm flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
                }
                to="/home/certificate"
              >
                <span className={`mx-2 font-medium`}>Certificate</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700 "
                    : "text-sm flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
                }
                to="/home/detail"
              >
                <span className={`mx-2 font-medium `}>Your Detail</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </aside>
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>

    : 
    
    (<div className="flex ">
    <aside className="flex h-screen fixed w-64 flex-col overflow-y-auto border-r px-3 ">
      <div className="my-2 flex flex-1 flex-col justify-between rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600">
        <nav className="-mx-3 space-y-6 px-6 ">
          <div className="space-y-3 mt-5">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
                  : "text-sm text-gray-200 flex transform items-center rounded-lg px-3 py-2  transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
              }
              to="/home/admin"
            >
              <span className={`mx-2 font-medium `}>Dashboard</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700 "
                  : "text-sm flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
              }
              to="/home/learnings"
            >
              <span className={`mx-2 font-medium `}>Learnings</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700 "
                  : "text-sm flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
              }
              to="/home/details"
            >
              <span className={`mx-2 font-medium `}>Detials</span>
            </NavLink>

            
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700 "
                  : "text-sm flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
              }
              to="/home/delete"
            >
              <span className={`mx-2 font-medium `}>Delete</span>
            </NavLink>

            {/* <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-xl scale-110 bg-white flex transform items-center rounded-lg px-3 py-2 text-blue-700 m-2 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700 "
                  : "text-sm flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors  duration-300 hover:bg-gray-50 hover:text-blue-700"
              }
              to="/home/certificate"
            >
              <span className={`mx-2 font-medium`}>Certificate</span>
            </NavLink> */}

            
          </div>
        </nav>
      </div>
    </aside>
    <div className="flex-1 ml-64">
      <Outlet />
    </div>
  </div>)}

    </div>
  );
};

export default Sidebar;
