const express = require('express');
const multer  = require('multer');
const router = express.Router();
const {uploadProfileImage, addNewLearning, getUserDetails, updateDetals, donwloadCertificate, learingsData} = require("../controler/user.controler");
const authenticateToken = require('../middleware/authenticateToken');

// multer storage function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // 5MB limit
    }})
  

//user upload Profile image 
router.post("/profile", authenticateToken, upload.single('profile'),uploadProfileImage);
// Adding new learings of Students section Imgaes and Title
router.post("/learning" , authenticateToken ,upload.single('image'), addNewLearning);

// Compelete Profile Details from Student DashBoard

//update user info from User DashBoard

//Update user info
router.get("/info",authenticateToken, getUserDetails);
router.post('/update', authenticateToken, updateDetals);

//sendng learings data route
router.get("/learning",authenticateToken, learingsData)


// for download Certificate
router.get("/download/:pdfName", donwloadCertificate)



  

module.exports = router;
