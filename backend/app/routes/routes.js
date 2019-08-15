"use strict";

let router=require("express").Router();
let passport=require("passport");
let helper=require("../helpers/queries.js");







router.get('/',(req,res,next)=>{
    res.sendFile("land.html",{root:"views"});

    console.log("main Page Served");
});


///authenticate the user for login
router.post('/authenticate',(req,res,next)=>{
    console.log("authenticating user");
 
   
    passport.authenticate('local',function(error,user){
        console.log("user send after authentication",user);
       if(user!==false){
            helper.setUser(req,user);
            res.send("userlogged in successfully").end();
        }
        else{
            res.send("user not found").end();
            console.log("auth failed send 404");
        }
    })(req, res, next);
    
    
    
});
router.post('/signup',(req,res,next)=>{
    var useremail=req.body.email;
    var username=req.body.username;
    var password=req.body.password;
    var confirmpassword=req.body.Cpassword;
    var userprofile={
    username:username,
    password:password,
    email:useremail,
    profile:{},
    activePlans:[],
    carthistory:[],
    reviews:[]

              };
              console.log(userprofile,req.body);

//validate credientials
  if(useremail!==""&& username!==""&& password!==""&& confirmpassword!=="" && password===confirmpassword){
      console.log("finding the user");

      //find the user in db. If found reject the res prompting for login
      helper.findUserByEmail(useremail).then((user)=>{
          if(user){
              console.log("user already exist",user);
             res.send(false).end();
             }else{
                 console.log("Creating new user in db");
    //if user not found creat and authenticate the user
              helper.createNewUser(userprofile).then((user)=>{
                  if(user){
                console.log("moving to authentication");
                      passport.authenticate('local',function(error, user) {
                          console.log("result of signup",error,user);
if(error && error!==null){
    console.log("User is false",error);
    res.send(false);
}
else{
    if(user && user!==null){
        helper.setUser(req,user);
    
console.log("user on req");
console.log("user send back");
res.send("user signup successfully").end();
    }
    }


})(req, res, next);
                  }

              });
          }
      });
  }

});


//sign up route
/*router.post('/signup',(req,res,next)=>{
    console.log("req.body",req.body);
    h.findUserByEmail(req.body.email).then((result)=>{
            console.log("found in signupdb",result);
        if(result!==null){
            res.send("user already exist").end;
        }else{
            console.log("creating new user");
            h.createNewUser(req.body);
             passport.authenticate('local',function(error,user){
        console.log("user send after authentication",error);
       if(user){
            console.log("after authentication",user);
            var sendUser={};
            sendUser.username=user.username;
            sendUser.email=user.email;
            sendUser.profile=user.profile;
            sendUser.orders=user.orders;
            req.app.locals.user=sendUser;
            req.logIn(user,()=>{
                console.log("user logged in",req.isAuthenticated());
            });
            res.send(sendUser).end();
        }
        else{
            res.send("error creating user").end();
            console.log("auth failed send 404");
        }
    })(req, res, next);
            
            
            
        }
    });
    
        
});*/


//get user route

router.post("/getuser",function(req,res,next){
    
   if(req.user!==undefined){
       var sendUser= helper.setUser(req,req.user);
       console.log("user sent in getuser route",sendUser);
       var data={
           message:"User found sending the user",
           user:sendUser
       };
       
       res.send(data).end();
   }else{
       var errordata={
           message:"user not logged in"
       };
       res.send(errordata).end();
   } 
});


//update cart here
router.put("/change",(req,res,next)=>{
if( req.isAuthenticated){
    //var carthistory=req.app.locals.user.carthistory;
    console.log("change",req.body);
    helper.changeuser(req.user,req.body).then((updateuser)=>{
        if(updateuser && updateuser!==null){
            console.log("updated the user successfully",req.body.name);
        
var sendUser= helper.setUser(req,updateuser);

           console.log("User Sent",sendUser);
res.send(sendUser).end();
        }
    });
    console.log("updating cart");
}else{
    console.log("user not logged in to change");
}


    
});


router.get('/logout',(req,res,next)=>{
    if(req.isAuthenticated){
        req.logout(req.user);
        console.log("user logged out");
        console.log("is Authenticated",req.isAuthenticated());
        req.app.locals.user={};
        
        if(req.isAuthenticated==false){
            res.status(200).end();
        }
            }
});

module.exports={
    router:router
};