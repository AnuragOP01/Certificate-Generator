const express = require('express')
const path = require("path");
const app = express()
var cors = require('cors');
const port = 3000;
const user = require("./routes/user.js");
const auth = require("./routes/auth.js")
const certificate = require("./routes/certificate.js");
const admin = require("./routes/admin.js");
const session = require('express-session');
const connectDB = require('./connectDB.js');
const cookieParser = require('cookie-parser');

// const uri = "mongodb+srv://tecnocrates006:701196@student-data.wrr0t.mongodb.net/?retryWrites=true&w=majority&appName=student-data"; // atalash link
connectDB()
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use(session({
  secret: 'No Key Is Secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false} 
}));
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend's origin
  credentials: true // Allow cookies to be sent and received
}));

app.use("/user", user); 
app.use("/auth", auth);
app.use("/certificate", certificate);
app.use("/admin", admin);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));



app.get("/", (req, res)=>{
  res.render("certificate.ejs", {data:{basicInfo:{name:"Anurag Rathore"}}});
})


app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})