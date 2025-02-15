const express = require('express');
const router = express.Router();
const authenticateToken = require('./../middleware/authenticateToken')

const {callGenerateCertificate, callTemplate, callTemplate2, generateCertificate , downloadCert , callDeleteCertificate , DeleteCertificate}  = require("../controler/certificate.controler");


router.post("/certificate", callGenerateCertificate);

router.post("/uncertificate", callDeleteCertificate);

router.get('/certGoHackathon' , callTemplate);

router.get('/certMangosorange' , callTemplate2);

//Pfd converter
router.post("/certificate/:id", generateCertificate);

router.post("/uncertificate/:id", DeleteCertificate);

router.post('/download-pdf',authenticateToken , downloadCert);

module.exports = router;