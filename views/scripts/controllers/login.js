var app=angular.module('loginctrl',['loginservice'])

.controller("loginctrl",['$scope','$http','loginservice',function($scope,$http,loginservice){
    
    $scope.login=function(){
    if($scope.loginform.$valid){
    loginservice.login($scope.user);
        console.log("form submitted")
    }else{
        loginservice.displayMessage("Please fill the Missing Fields");
    }
    
    };
    $scope.showSignUp=false;
    
    $scope.displaySignUp=function(){
    $scope.showSignUp=true;
    console.log("display Sign Up");
    };
    $scope.signUp=function(){
        
        if($scope.signUpform.$valid){
            console.log("signing up in the js");
            loginservice.signUp($scope.newUser);
        }else{
            loginservice.displayMessage("Please agree to the terms and conditions");
        }
    };
    $scope.logout=function(){
        loginservice.logout();
    };
    
    
}]);