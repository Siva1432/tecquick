"use strict";
let express=require("express");
let app=express();
let db=require("../db/mongoose.js");
let enve=require("../enve/enve.js");
var session=require("express-session");
let connectmongo=require("connect-mongo")(session);

let mysession=session({
    secret:enve.appsecret,
    saveUninitialized:false,
    resave:false,
    store :new connectmongo({
        mongooseConnection:db.mongoose.connection
    })
},()=>{
    console.log("sessions instantiated");
});
module.exports={
    session:mysession
}
