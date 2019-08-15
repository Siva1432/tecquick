"use strict";
let express=require("express");
let app=express();
let bp=require("body-parser");
let router=require("./backend/app/routes/routes.js");
let session=require("./backend/app/sessions/sessions.js").session;
let passport=require("passport");
let auth=require("./backend/app/auth/auth.js");
auth(app);
console.log("passportconfig",auth(app));


app.locals.user={};
app.use(bp.json({extended:true}));
app.use(bp.urlencoded({extended:true}));
//use the session middle ware 
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("views"));
app.use("/",router.router);
app.listen(process.env.PORT || 3000,()=>{
    console.log("express server started",process.env.PORT || 3000);
});

