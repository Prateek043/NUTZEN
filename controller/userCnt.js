const jwtTokenGenerate = require("../config/jwToken.js");
const User=require("../models/userModel.js");
const Blacklist=require("../models/blacklist.js");
const asyncHandler=require("express-async-handler");


//Register a user Controller
const createUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user)
    {
       throw new Error("User already Existed");
    }
    else{
        const newUser=await User.create(req.body);
        res.json(newUser);
    }
});

//Login a User

const loginController=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && await user.isPasswordMatched(password))
    {
        res.json({
            _id:user?._id,
            email:user?.email,
            token:jwtTokenGenerate(user?._id),
        });
    }
    else{
        throw new Error("Invalid Credentials");
    }
});

//Upadte a user
const updateUser=asyncHandler(async(req,res)=>{
    const { _id }=req.user;
    try{
        const user=await User.findByIdAndUpdate(
            _id,
            {
            email:req?.body?.email,
            },
            {
            new:true,
            }
        );
       res.json(user);
    }
    catch(err)
    {
        throw new Error(err);
    }
})

//Logout a user
const logoutUser=asyncHandler(async(req,res)=>{
    try {
        const authHeader = req.headers['cookie']; 
        if (!authHeader) return res.sendStatus(204); 
        const cookie = authHeader.split('=')[1]; 
        const accessToken = cookie.split(';')[0];
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
        // if true, send a no content response.
        if (checkIfBlacklisted) return res.sendStatus(204);
        // otherwise blacklist token
        const newBlacklist = new Blacklist({
          token: accessToken,
        });
        await newBlacklist.save();
        // Also clear request cookie on client
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        res.status(200).json({ message: 'You are logged out!' });
      } catch (err) {
        res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }
      res.end();
    
})



module.exports={createUser,loginController,updateUser,logoutUser};