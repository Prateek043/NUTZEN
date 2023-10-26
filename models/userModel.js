const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

//password hash Middleware
userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);
})
//password matched middleware
userSchema.methods.isPasswordMatched=async function (Enteredpass){
    return await bcrypt.compare(Enteredpass,this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);