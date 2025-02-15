const mongoose = require("mongoose");


const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://ranurag404:Luffy>>2*Kaido@cluster0.fjmbuyx.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0'
        , { dbName: 'Interns' })
    .then(console.log("db connected success to atlas")).catch(err => console.log(err));
}


module.exports = connectDB;


// mongodb+srv://Prakash06:701196@cluster0.pyyef.mongodb.net/