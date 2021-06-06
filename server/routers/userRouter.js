const router =require("express").Router();
const User=require('../models/userModel');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

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
       // console.log(existingUser);

            
        if(existingUser)
        return res
        .status(400)
        .json({errorMessage:"An account already exist"});

        //hash password

        const salt=await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt);
        // console.log(passwordHash);

         //   save to database
        const newUser=new User({
            email,passwordHash
        });

        const savedUser=await newUser.save();

       //sign the token
        const token=jwt.sign(
            {
                user:savedUser._id
            },
           process.env.JWT_SECRET
        );
        
       console.log(token);

        //send the token in a http - only cookie

        res
        .cookie("token",token,{
            httpOnly:true,
        })
        .send();

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
  
   
});


        //login

router.post("/login",(req,res)=>{
    try{
        const {email,password}=req.body;

         //validation

         if(!email || !password )
         return res
         .status(400)
         .json({errorMessage:"Please enter all required fields"});
         

    }catch(err){
        console.log(err);
        res.status(500).send();
    }
})

module.exports=router;