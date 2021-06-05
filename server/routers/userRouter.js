const router =require("express").Router();
const User=require('../models/userModel');
const bcrypt=require("bcryptjs");

router.post("/", async(req,res)=>{
    try{
        const {email,password,passwordVerify}=req.body;
     //   console.log(email);

     //validation

        if(!email || !password || !passwordVerify)
        return res
        .status(400)
        .json({errorMessage:"Please enter all required fields"});

        if(password.length<6)
        return res.status(400)
        .json({errorMessage:"Please enter password of at least 6 charactors"});

        if(password !==passwordVerify)
        return res
        .status(400)
        .json({errorMessage:"Please enter the same password twice"});

        // find exisst users

        const existingUser= await User.findOne({email});
        console.log(existingUser);

            
        if(existingUser)
        return res
        .status(400)
        .json({errorMessage:"An account already exist"});

        //hash password

        const salt=await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt);
        console.log(passwordHash);


    }catch(err){
        console.error(err);
        res.status(500).send();
    }
  
   
});
module.exports=router;