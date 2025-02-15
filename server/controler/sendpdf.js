const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const sendPdf = async (email , pdf) => {

    try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com', // Fix the typo in the host
        port: 587,
        secure: false,
        auth: {
            user: 'ranurag404@gmail.com',
            pass: 'bhuspdayjxgxbyag',
        },
    });

    const pdfPath = path.join('', `../server/public/${pdf}`);

    let info = await transporter.sendMail({
        from: {
            name: "Mangoesorange",
            address: 'gus.wiegand40@ethereal.email',
        },
        to: [`${email}`],
        subject: "Internship Certificate",
        text: "Hello this is testing of email with pdf",
        html: `<div>
                <p>Dear Intern,</p>
                <p>
                    Congratulations on completing your internship! We are pleased to inform you that you have successfully 
                    completed your internship with us. Your hard work, dedication, and willingness to learn have made a 
                    valuable impact on the team and the projects you were part of.
                </p>
                <p>
                    This is a milestone in your professional journey, and we hope that the experiences and skills gained 
                    during this time will serve you well in the future. We are confident that your contributions will help 
                    shape your career path.
                </p>
                <p>
                    We wish you all the best for your future endeavors and hope that this internship has been both rewarding 
                    and fulfilling for you.
                </p>
                <p>
                    Thank you once again for your commitment, and congratulations on reaching this important achievement!
                </p>
                <p>
                    Sincerely,<br/>
                    Mangosorange pvt Ltd.
                </p>
            </div>`,
        attachments: [
            {
              filename: "Internship Certificate.pdf", // Ensure file has .pdf extension
              path: pdfPath,  // The file path
              contentType: "application/pdf",  // PDF MIME type
              encoding: "base64",  // Base64 encoding
            },
        ],
    });

    console.log("pdf path: %s", pdfPath);

    } catch (error) {
        console.log(error, "ERRR");
    }
};

module.exports = sendPdf;
