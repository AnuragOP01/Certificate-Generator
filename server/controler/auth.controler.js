const ConnectDB = require("../connectDB");
const Student = require("../models/student");
const sendMail = require("./sendMail");
const jwt = require("jsonwebtoken");


let otpass = Math.floor(Math.random() * 9000) + 1000;

const signUp =  async(req, res)=>{
  const { name, email, password } = req.body;

  try {
    const existingUser = await Student.findOne({ "basicInfo.email": email });

    if (existingUser && existingUser.emailVerified === true) {
      return res.status(400).json("User exist");
    }

    if (!existingUser) {
      const newUser = await Student.create({
        basicInfo: { name: name, email: email, password: password },
        otp: otpass,
      });
    } else {
      const updateResult = await Student.updateOne(
        { "basicInfo.email": email },
        {
          basicInfo: { name: name, email: email, password: password },
          otp: otpass,
        }
      );
    }
    sendMail(email, otpass);
    req.session.email = email;
    res.json({error : false , status : "Success" , msg : "User is created"})
  } catch (err) {
    res.status(500).json({ status: "error", err: err });
  }
}

// otp verify
const otpp = async (req, res) => {
  let { otp } = req.body;
  const email = req.session.email;
  console.log(email);
  
  if (!email) {
    return res
      .status(400)
      .json({ status: "error", msg: "Email is missing from the session.",error : true });
  }

  const user = await Student.findOne({ "basicInfo.email": email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "error", msg: `User not found for email: ${email}`,error : true });
  }

  if (otp == user.otp) {
    const updateResult = await Student.updateOne(
      { "basicInfo.email": email },
      { emailVerified: true }
    );
    req.session.destroy();
    return res.status(200).json({msg : "Success" , error : false});
  } else {
    return res.status(200).json({ status: "error", msg: "OTP does not match" , error : true });
  }
};

const login =  async(req, res)=>{
  const { email, password } = req.body;

  const student = await Student.findOne({ "basicInfo.email": email }).then(
    (registers) => {
      if (registers) {
        if (registers.basicInfo.password === password) {
          const user = { email: email, password: password, _id: registers._id };
          const token = jwt.sign(user, "No Key Is Secret", {
            expiresIn: "1d",
          });
          res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });

          res.status(200).json({
            error: false,
            registers,
            token,
          });
        } else {
          res.status(200).json("Password not matched");
        }
      } else {
        res.status(404).json("unregistered user");
      }
    }
  );
}

//otp resend
const resend = async (req, res) => {

  try {
    otpass = Math.floor(Math.random() * 9000) + 1000;
    const email = req.session.email;
    
    const updateResult = await Student.updateOne(
      { "basicInfo.email": email },
      { otp: otpass }
    );

    await sendMail(email, otpass);
    if(email)
    res.status(200).json({ status: "success", msg: "OTP is sent" });
    else
    res.status(500).json({ status: "error", msg: "No Email receopants were found" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req,res) => {
    const {name , email , gender} = req.body;
    let isMale = false;
    if(gender === "male")
       isMale = true;
    
    const password = `xyz@${email}`
  try {
    const existingUser = await Student.findOne({ "basicInfo.email": email });
  
      if (existingUser && existingUser.emailVerified === true) {
        return res.status(400).json("User exist");
      }
  
      if (!existingUser) {
        const newUser = await Student.create({
          basicInfo: { name: name, email: email, password: password },
          otp: otpass,
          emailVerified : true,
          isMale : isMale,
          isVerified : true,
        });
      } else {
        const updateResult = await Student.updateOne(
          { "basicInfo.email": email },
          {
            basicInfo: { name: name, email: email, password: password },
            otp: otpass,
            isVerified : true,
          }
        );
      }
      res.json({error : false , status : "Success" , msg : "User is created"})
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }

}

module.exports = {signUp, login,otpp, resend,register};