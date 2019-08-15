"use strict";
let dbURI=require("../enve/enve.js").dbURI;
let mongoosecore=require("mongoose");
mongoosecore.promise=global.promise;
let mongoose=require("mongoose").connect(dbURI);
mongoose.connection.on('connection',(message)=>{
     console.log("Db connected successfully"+message);
});


let userschema= new mongoose.Schema({
    "username":String,
    "password":String,
    "email":String,
    "profile":Object,
    "activePlans":Array,
    "carthistory":Array,
    "reviews":Array
});
let userModel=mongoose.model("userModel",userschema);



module.exports={
    mongoose:mongoose,
    userModel:userModel
};


