"use strict";

let dev=require("../development/deve.json");

if(process.env.NODEENV=="production"){
     module.exports={
          host:process.env.host,
          appsecret:process.env.appSecret,
          dbURI:process.env.dbURI,
          nodemailerlink:process.env.nodemailerlink,
          email:process.env.email
     }
}else{
     module.exports={
          host:dev.host,
          appsecret:dev.appSecret,
          dbURI:dev.dbURI,
          nodemailerlink:dev.nodemailerlink,
          email:dev.email

     };

     }