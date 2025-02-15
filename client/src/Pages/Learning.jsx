import React, { useRef, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { FcAddImage } from "react-icons/fc";

// import {upload} from './photos';

function Learning() {
  const [selectImage, setSelectImage] = useState();
  const [title , setTitle] = useState();
  const [desc,setDesc] = useState();
  const [file, setFile] = useState();
  const [pathImg, setPathImg] = useState([]);

  const fileInputRef = useRef();

  const ImageUpl = () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title); 
    formData.append('description', desc);
    axiosInstance
      .post('/user/learning', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        console.log(result)
          loadImg()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadImg = async () => {
    axiosInstance
      .get('/user/learning')
      .then((res) => {
        console.log(res.data);
        setPathImg(res.data);
      })
      .catch((e) => console.log(e));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    loadImg();
  }, []);

  return (
    <div className="m-0 w-full min-h-screen rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-700">
      <h1 className="text-center font-extrabold pt-10 text-white text-2xl underline">
        LEARNINGS
      </h1>
      <br />
      
      <div className="grid grid-cols-1 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {pathImg.map((img) => (
          <div
            key={img._id}
            className="w-full border flex flex-col items-center justify-between rounded-xl bg-gradient-to-r from-blue-500 to-blue-300"
          >
            <h1 className='p-2 text-white'><span className=' font-bold'>Title </span> : {img.title}</h1>
            <img
              src={img.image}
              alt="Selected avatar"
              className=" w-full rounded-xl object-cover"
            />
            <h1 className='p-2 text-white text-center'> <span className='font-bold'>Description </span> : {img.description}</h1>
          </div>
        ))}
      </div>

      <section className="flex flex-col items-center justify-center w-full">
        <h1 className="text-center font-extrabold pt-10 text-white text-2xl">
          Upload new Learning
        </h1>
<br />
        <input
          className=" rounded-lg h-16 text-center w-2/3"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
<br />
        <textarea
          className="text-gray-500 mt-2 text-center rounded-xl h-24 w-2/3 "
          type="text"
          value={desc}
          onChange={e=>setDesc(e.target.value)}
          placeholder='Description'
        ></textarea>


        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setSelectImage(file ? URL.createObjectURL(file) : undefined);
            setFile(file);
          }}
        />

        <div className="mt-4 flex justify-between ">
          <FcAddImage
            size={100}
            className=" -translate-y-3 cursor-pointer h-24"
            onClick={handleImageClick}
          />

          {selectImage && (
            <img
              height={200}
              width={200}
              src={selectImage}
              alt="Selected avatar"
              className="   rounded-lg"
            />
          )}
        </div>

        
        <br />
        <button
          onClick={ImageUpl}
          className="m-2 p-2 w-40 bg-green-400 rounded-3xl text-white font-bold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Upload
        </button>
      </section>
    </div>
  );
}

export default Learning;
