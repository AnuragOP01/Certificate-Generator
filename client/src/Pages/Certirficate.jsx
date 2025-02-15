import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function Certificate() {
  const [name, setName] = useState('');
  const [data, setData] = useState(0);
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/user/info');
      console.log(res);
      setName(res.data.basicInfo.name);
      if(res.data.isCertified)
        setData(1)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const download = async () => {
    try {
        const response = await axiosInstance.post('/certificate/download-pdf', {}, {
            responseType: 'blob', // Important to handle binary data
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'certificate.pdf'); // Filename for the download
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up the DOM after download
    } catch (error) {
        console.error('Error downloading the certificate:', error);
    }
};

const viewPDF = async () => {
  try {
      const response = await axiosInstance.post('/certificate/download-pdf', {}, {
          responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // Open the PDF in a new browser tab
      window.open(url);
  } catch (error) {
      console.error('Error fetching the certificate:', error);
  }
};




const getResponse = () => {
  if(data == 0){
    return (
      <div>You Are not Eligible to Download this Certificate </div>
    )
  }
  else if(data == 1){
    return (
      <div>Congratulations You are Qualified for downloading this certificate</div>
    )
  }
}


  return (

    <div className=' flex flex-col bg-gradient-to-t rounded-2xl h-screen from-blue-600 to-blue-700 text-white font-light text-2xl'>
      <br /><br /><br />
      <h1 className='text-center font-bold'>{getResponse()}</h1>

    <div className="flex justify-around items-center h-full ">
      <div className="mx-2">
        <button
        onClick={viewPDF}
          // href={`http://localhost:3000/certificate/cert?info=${encodeURIComponent(JSON.stringify({
          //   basicInfo: {
          //     name: name,
          //     course: 'JavaScript'
          //   }
          // }))}`}
          // target="_blank"
          // rel="noopener noreferrer"
          className="bg-blue-500 text-white text-center p-4 rounded-md transform transition-transform duration-300 hover:scale-125 hover:bg-blue-600 w-48 h-48 flex items-center justify-center border border-gray-300 shadow-lg"
        >
          Preview Certificate
        </button>
      </div>
      <div className="mx-2">
        <button
          onClick={download}
          className="bg-green-500 text-white text-center p-4 rounded-md transform transition-transform duration-300 hover:scale-125 hover:bg-green-600 w-48 h-48 flex items-center justify-center border border-gray-300 shadow-lg"
        >
          Download Certificate
        </button>
      </div>
    </div>
    </div>
  );
}

export default Certificate;
