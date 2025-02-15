const express = require('express');
const router = express.Router();
const {getAllUser, getVerified, getUncertified, getUnverified} = require("../controler/admin.controler");
const {verifyUserById, validateIds, verifyAllByIds, getCertified,deleteStudent , sendCertificate , unverifyAllByIds , unverifyUserById} = require("../controler/admin.controler");

//all registerd User
router.get("/alluser", getAllUser);
// All verified Students
router.get("/verified", getVerified);


  // verified snd UnCertificate generated
  router.get("/unCertified", getUncertified);

//All Unverided Students
router.get("/Unverified", getUnverified);

// Verified and Certified
router.get("/Certified", getCertified);



//verify all student by admin
router.use('/verifyAll', validateIds);
  
  
// Verified : True from Admin dashBoard
router.post('/verify/:id', verifyUserById);
// Route to update multiple students based on their IDs
router.post('/verifyAll', verifyAllByIds);

//unverify
router.post('/unverifyAll', unverifyAllByIds);
router.post('/unverify/:id', unverifyUserById);

router.post('/sendCer', sendCertificate);

router.delete("/:id", deleteStudent);
  

module.exports = router;
