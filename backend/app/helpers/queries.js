"use strict";
let promise=require("mpromise");
let userModel=require("../db/mongoose.js").userModel;
//find the user by id
var findUserById=function (id) {
    return userModel.findById({"_id":id});
};

//find the user by email
var findUserByEmail=function(email){
    console.log("user email",email);
    return userModel.findOne({"email":email});
};

//create new user in the db
var createNewUser=function(profile){
    
   
    
 return new Promise((resolve,reject)=>{
      var newUser=userModel({
       username:profile.username,
    password:profile.password,
    email:profile.email,
    profile:profile.info,
    activePlans:profile.activePlans,
    carthistory:profile.cart,
    reviews:profile.reviews
    });
    console.log("new user in save method");
    
     newUser.save((error)=>{
         if(error!==null){
         console.log("error in save method" ,error);
             reject(error);
         }else{
             resolve(newUser);
             console.log("new user in save method", newUser);
         }
         
     });
 });
    
   
   
};


var changeuser=function(user,change){
    
   return new Promise((resolve, reject)=>{
        
  console.log("changing in db",change);
  if(change.type=="change" ){
      var changename=change.name;
      var changevalue=change.value;
      userModel.findOneAndUpdate({email:user.email},{$set:{carthistory:changevalue}},{new:true},(error,updateuser)=>{
          if(error && error!==null){
              console.log("error occured in changing the property",changename);
          }else{
          console.log("changed the property in db",changename,updateuser);
         
              if(updateuser!==null){
                  resolve(updateuser);
                  console.log("resolving the updated user",updateuser);
                  
              }else{
                  reject(error);
                  console.log("error in resolving the updated user",updateuser);
              }
              
         
          }
      });
  }
   });
    
};


// set user on app.locals and on sessions, logIn
var setUser=function(req,user){
    
    req.session.user=user;
  req.logIn(user,()=>{
    console.log("isAuthenticated",req.isAuthenticated());
});
var sendUser={};

            sendUser.username=user.username;
            sendUser.email=user.email;
            sendUser.profile=user.profile;
            sendUser.activePlans=user.activePlans;
            sendUser.carthistory=user.carthistory;
            sendUser.reviews=user.reviews;
          //  req.app.locals.user=sendUser;
req.app.locals.user=sendUser;

return sendUser;
    
};

module.exports={
    findUserById:findUserById,
    findUserByEmail:findUserByEmail,
    createNewUser:createNewUser,
    changeuser:changeuser,
    setUser:setUser
};
