const express=require("express");
const {createUser,loginController, updateUser,logoutUser} = require("../controller/userCnt");
const {jsonwebtokenverify} = require("../middleware/jwtVerify");
const router=express.Router();

router.post("/register",createUser);
router.post("/login",loginController);
router.put("/edit-user",jsonwebtokenverify,updateUser);
router.get("/logout",logoutUser);
module.exports=router;