const express=require("express");
const dotenv=require("dotenv");
const bodyparser=require("body-parser");
dotenv.config();
const port=process.env.PORT || 8000;
const dbConnect=require("./config/dbConnection.js");
dbConnect();
const userAuth=require("./routes/auth.js");
const { notFound, errorHandle } = require("./middleware/errorHandler.js");
const app=express();

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use("/api/user",userAuth);


app.use(notFound);
app.use(errorHandle);



app.listen(port,()=>{
    console.log(`Server is listining at port no ${port}`);
})