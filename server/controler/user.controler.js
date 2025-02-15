const ConnectDB  = require("../connectDB");
const Student = require("../models/student");
const path = require("path");
const { uploadOnCloudinary }= require('./../utils/imagesave');




const uploadProfileImage =  async(req, res)=>{
    const  id  = req.user._id;
    console.log(req.file.path);
    try {
      const filePath = await uploadOnCloudinary(req.file.path)
      const result = await Student.findByIdAndUpdate(
        id,
        {
          'profile': filePath.secure_url,
          
        },
        // { new: true, runValidators: true }
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const updatedStudent = await Student.findById(id);
  
      res.status(200).json(updatedStudent);
    } catch  (error) { 
      res.status(500).json({ message: 'Server error', error });
    }
  }


  const addNewLearning =  async(req, res)=>{
    const  id  = req.user._id;
    const filePath = await uploadOnCloudinary(req.file.path)
    const result = await Student.findByIdAndUpdate( 
      id,
      {
        $push: {
          learnings: {
            image:filePath.secure_url,
            title:req.body.title,
            description:req.body.description,
            // uploadDate: new Date()  // This will use the current date by default
          }
        }
      })

    res.send("done");
}


// Update User Info from user DashBoardd
const getUserDetails = async(req, res)=>{
    const  id  = req.user._id;
    let user = await Student.findById(id);
    res.status(200).json(user);
  }


//Save Updated Detais of user
const updateDetals =  async (req, res) => {

    const  id  = req.user._id;
     console.log(req.body);
      console.log(id);
      
    try {
      const result = await Student.findByIdAndUpdate(
        id,
        {
          'basicInfo.password': req.body.password,
          'basicInfo.address': req.body.address,
          'basicInfo.phone': req.body.phone,
          'degree.courseName': req.body.course,
          'degree.college': req.body.college,
        },
        { new: true, runValidators: true }
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Student not found' });
      }
       
      let updatedStudent = await Student.findById(id);
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }


  //DownLoad Certuficte
  const donwloadCertificate = (req, res) => {
    console.log( req.params.pdfName)
    console.log(req.params.pdfName);
    const filePath = path.join(__dirname, "../public/files", req.params.pdfName);  
    res.download(filePath);
    }

   
  //Sending Learning Data Function
  const learingsData = async(req, res)=>{
    const  id  = req.user._id;
    let student = await Student.findById(id);
    

    res.json(student.learnings);
}  



module.exports = {uploadProfileImage, addNewLearning, getUserDetails, updateDetals, donwloadCertificate, learingsData};
