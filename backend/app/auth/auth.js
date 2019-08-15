"use strict";
let passport=require("passport");
let db=require("../db/mongoose.js");
let h=require("../helpers/queries.js");
let localstrategy=require('passport-local').Strategy;



module.exports=function(app){
    
    passport.serializeUser((profile,done)=>{
        console.log("serializing user",profile);
        done(null,profile.id);
    });
    
    passport.deserializeUser(function(id,done){
        
      h.findUserById(id).then(function(user){
          if(user){
              console.log("deserializing user",user);
              done(null,user);
          }
      },(error)=>{
          console.log("deserializing failed",error);
          done(null,false);
      });  
        
    });
    
    
    
    passport.use(new localstrategy({
    usernameField: 'email',
    passwordField: 'password',
},function(email,password,done){
    console.log("finding user in db");
   h.findUserByEmail(email).then((result)=>{
      
       
       if(result){
       console.log("found in findUserBy email");
        console.log("authenticated user in the passport");
        done(null,result);
       }else{
           done(null,false);
           console.log("done false");
           
       }
   });

}));
};

/*(app)=>{
   

    passport.serializeUser((user,done)=>{
        console.log("serializing user");
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{

        db.userModel.findById({_id: id}).then((userid)=>{
            if(userid){
                done(null,userid);
                console.log("deserializing User");

                app.all(function(req,res,next){
                     res.JSON(req.user);
                   console.log("user set on request stream");
                     next();
                });

            }
        })
    });
var authcallback=function(username, password, done){
   //query through the db for the user
   console.log('inside the auth callback');
   db.userModel.findOne({"username":username,"password":password}).then((error,user)=>{
       if(user){
           done(user);
           console.log("user found in db");
       }else{
           console.log('error occur in finding the user',error);
       }
   }
   )

};

  passport.use(new localstrategy({
    usernameField: 'useremail',
    passwordField: 'password',

  }, function(useremail, password, done) {
    db.userModel.findOne({ "useremail": useremail,"password":password }).then((result)=>{
        if(result){
            done(null,result);
            console.log("user found in db in callback");
        }else{
            done(null,false);
            console.log('login failed ');
        }    });
})
  );
  
   

};*/



