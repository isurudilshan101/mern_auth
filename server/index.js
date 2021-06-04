const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

//set up server
const app=express();

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started port : ${PORT}`));

// app.get('/test',(req,res)=>{
//     res.send("It works!");
// });


//  isuru41

//mongodb+srv://isuru:isuru41@cluster0.nzhft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//connect to mongodb  

mongoose.connect(process.env.MDB_CONNECT,
    { useUnifiedTopology: true,
        useNewUrlParser: true, }, 
        (err) => {
    if(err)  return console.error(err);
  
   
    console.log("Connect Successfull");
});