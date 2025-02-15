import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Navbar from "../Navbar";

function LearningStu() {

  const [user, setUser] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [search , setSearch] = React.useState('');
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/admin/verified")
        .then(res => {
        setUser(res.data.students);
        console.log(res.data.students);
        })
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  const userLearning = (images) => {
    setSelectedImages(images);
    console.log(search);
  };

  const clearImages = () => {
    setSelectedImages([]);
  };

  return (
    <div className="w-full min-h-screen rounded-s-xl bg-gradient-to-t font-serif from-blue-600 to-blue-700 text-white font-light text-2xl flex flex-col">
      <Navbar setSearch = {setSearch} search={search} />
      <div className="w-full flex flex-col items-center mt-5 justify-center">
        <h1 className="text-center mb-8">Learnings</h1>
        <table className="table-auto max-w-4xl w-full mx-auto font-light">
          <thead>
            <tr className="rounded-md bg-black border shadow-xl shadow-slate-500">
              <th className="p-4">S.no</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
            
            </tr>
          </thead>
          <tbody>
          {user &&
          user
            .filter(per => per.basicInfo.name.toLowerCase().startsWith(search.toLowerCase()))
            .map((per, index) => (
              <tr
                onClick={() => userLearning(per.learnings)}
                className="rounded-md border shadow-xl shadow-slate-500 cursor-pointer hover:bg-blue-500 transition-colors duration-300"
                key={per._id}
              >
                <td className="text-center p-4">{index + 1}</td>
                <td className="text-left p-4">{per.basicInfo.name}</td>
                <td className="text-left p-4">{per.basicInfo.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedImages.length > 0 && (
          <div className="fixed rounded-2xl m-auto h-[90%] w-1/2 z-50 bg-gradient-to-tr from-yellow-500 to-red-600 inset-0 bg-opacity-50 flex flex-col justify-center items-center overflow-hidden">
            <h2 className="text-center text-xl mt-4">User Images</h2>
            <div
              className="flex-1 overflow-y-auto w-full p-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="grid grid-cols-3 gap-4">
                {selectedImages.map((image, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <p className="text-sm">
                      {image.title}
                    </p>
                    <img
                      src={image.image}
                      alt={`User Image ${idx + 1}`}
                      className="w-48 h-48 object-cover rounded-lg mb-2"
                    />
                    <p className="text-sm">
                      {image.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={clearImages}
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

export default LearningStu;
