const express = require('express');
const path = require('path');
const pup = require('puppeteer');
// const fetch = require('node-fetch'); // Ensure you import fetch if not using Node.js 18+
const ConnectDB = require("../connectDB");
const Student = require("../models/student");
const { uploadPDF } = require('../utils/imagesave');
const { spawn } = require('child_process');
const poppler = require('pdf-poppler');
const fs = require('fs');
const sendPdf = require('./sendpdf');

// Establish database connection
// ConnectDB();

// Function to generate certificates for multiple students
const callGenerateCertificate = async (req, res) => {
    try {
        const { ids } = req.body;
        const responses = await Promise.all(
            ids.map(id => fetch(`http://localhost:3000/certificate/certificate/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        );
        res.json({ message: "done" });
    } catch (error) {
        console.error('Error generating certificates:', error);
        res.status(500).send('An error occurred while generating the certificates.');
    }
};



// Function to render the certificate template
const callTemplate = async (req, res) => {
    const { info } = req.query;
    const data = JSON.parse(info);
    res.render("certificateFullstack.ejs", { data });
};

const callTemplate2 = async (req, res) => {
    const { info } = req.query;
    const data = JSON.parse(info);
    res.render("mangosorangeCert.ejs", { data });
};

// Function to generate a PDF certificate for a student
const generateCertificate = async (req, res) => {
    const { id } = req.params;
    try {
        const info = await Student.findById(id);
        const browser = await pup.launch({ timeout: 0 });
        const page = await browser.newPage();

        console.log(info);

        // Navigate to the certificate template page
        await page.goto(`${req.protocol}://${req.get('host')}/certificate/certMangosorange?info=${encodeURIComponent(JSON.stringify(info))}`, {
            waitUntil: "networkidle2"
        });

        // Set the page viewport size
        await page.setViewport({ width: 1173, height: 830 });

        // Generate the PDF file path
        const pdfFileName = `${Date.now()}.pdf`;
        const pdfPath = path.join(__dirname, "../public/files", pdfFileName);

        // Generate the PDF in landscape orientation
        await page.pdf({
            path: pdfPath,
            format: "A4",
            landscape: true, // Set landscape orientation
            printBackground: true
        });

        await browser.close();

        // Update the student record with the certificate details
        await Student.findByIdAndUpdate(id, {
            'certificate': `/files/${pdfFileName}`,
            'isCertified': true
        });

        // Send the PDF as an email attachment
        await sendPdf(info.basicInfo.email, `/files/${pdfFileName}`);

        // Respond that the PDF has been generated
        res.set("Content-Type", "application/pdf");
        res.send("pdf generated");
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};


const downloadCert = async (req, res) => {
    try {
        const id = req.user._id;
        const student = await Student.findById(id);
        // Construct the correct path to the file
        const pdfPath = path.join(__dirname, '../public/', student.certificate);

        // Check if the file exists
        console.log(pdfPath);
        
        if (fs.existsSync(pdfPath)) {
            res.download(pdfPath, 'downloaded-file.pdf', (err) => {
                if (err) {
                    console.error('Error during PDF download:', err);
                    res.status(500).send('An error occurred while downloading the file.');
                }
            });
        } else {
            res.status(404).send('File not found.');
        }
    } catch (error) {
        console.error('Error fetching certificate:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
};

// Function to handle multiple certificates revocation
const callDeleteCertificate = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of student IDs
        const responses = await Promise.all(
            ids.map(async (id) => {
                return await Student.findByIdAndUpdate(id, { 'isCertified': false });
            })
        );
        res.json({ message: "Certificates revoked successfully" });
    } catch (error) {
        console.error('Error revoking certificates:', error);
        res.status(500).send('An error occurred while revoking the certificates.');
    }
};

// Function to revoke certificate for a single student
const DeleteCertificate = async (req, res) => {
    const { id } = req.params;
    try {
        await Student.findByIdAndUpdate(id, { 'isCertified': false });
        res.json({ message: "Certificate revoked successfully" });
    } catch (error) {
        console.error('Error revoking certificate:', error);
        res.status(500).send('An error occurred while revoking the certificate.');
    }
};



module.exports = { callGenerateCertificate, callTemplate,callTemplate2 , generateCertificate , downloadCert , callDeleteCertificate , DeleteCertificate};
