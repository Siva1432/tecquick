"use strict";

var app=angular.module("loginservice",[])
.factory('loginservice',function($http,$location){
    
    var displayMessage=function(message){
        console.log(message);
          document.getElementById("messagedisplay").innerHTML="<h5 class='alert alert-danger'>"+message+"</h5>"
    }
    
    var login=function(user){
        var error={};
        $http.post("/authenticate",user).then(function(response){
           if(response.status==200 && response.data=="userlogged in successfully"){
                console.log("signUp successfully");
                $location.path("/dashboard");
            }
            if(response.status==200 && response.data=="user not found"){
                
                error.text="Error in login, Please SignUP";
                displayMessage(error.text);
            }else{
                console.log("login status",response.status);
                
                    error.text="Login failed please Sign Up";
                
            }
        });
        console.log("user set for authentication");
    };
    
    /// sign up function here
    var signUp=function(newuser){
        if(newuser.username!==""&& newuser.email!==""&& newuser.password!==""&&newuser.Cpassword!==""&& newuser.password===newuser.Cpassword){
            
        console.log("sign Up user",newuser);
        
        $http.post("/signup",newuser).then(function(response){
            if(response.status==200){
                console.log("signUp successfully");
                $location.path("/dashboard");
            }
            if(response.data=="user not found"){
                
                displayMessage("user already exist please.Please login !!!!!");
            }
        });
        }else{
           
            displayMessage("Please fill the missing fields");
        }
    };
    
var displaySignUp=function(){
    console.log("displaying sign up");
    return true;
}  ;

var logout=function(){
    $http.get("/logout").then(function(response){
        if(response.status==200){
            console.log("user logged out");
            $location.path("/login");
        }
        
    });
    
}
    
    return{
        login:login
        ,signUp:signUp,
        displayMessage:displayMessage,
        displaySignUp:displaySignUp,
        logout:logout
    };
    
});