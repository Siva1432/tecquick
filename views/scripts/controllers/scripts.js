'use strict';

var app=angular.module('homeModule',['ui.router','loginctrl','cartmodule']);
app.config(function($stateProvider,$urlRouterProvider){
 $urlRouterProvider.otherwise("/home");
 $stateProvider.state('home',{
  url:"/home",
  templateUrl:"/home.html"
 }).state('about',{
  url:"/about",
  templateUrl:"./about.html"
 }).state('contact',{
  url:"/contact",
  templateUrl:"./contact.html"
 }).state('cart',{
  url:"/cart",
  templateUrl:"./cart.html"
 }).state('dashboard',{
  url:"/dashboard",
  templateUrl:"./dashboard.html"
 }).state('services',{
  url:"/services",
  templateUrl:"./services.html"
 }).state('login',{
  url:"/login",
  templateUrl:"./login.html"
 }).state('testmonials',{
  url:"/testmonials",
  templateUrl:"./testmonials.html"
 }).state('bestwork',{
  url:"/bestwork",
  templateUrl:"./bestwork.html"
 }).state('pricing',{
  url:"/pricing",
  templateUrl:"./pricing.html"
 }).state('payment',{
  url:"/payment",
  templateUrl:"./payment.html"
 }).state('support',{
  url:"/spport",
  templateUrl:"/support.html"
 });
 
});

 app.controller('mainctrl',function($scope,$http,$document){
     $scope.user={};
     var user=$scope.user;
     $scope.authenticate=function(user){
         $http.post('http://localhost:8080',JSON.stringify(user));
     };
     $scope.changeborder=function(id){
         console.log(id)
        var element=$document[0].getElementById(id);
        element.style.border="1px solid  red";
     };
     console.log("script js loaded");
     
     
    
 
 
 ///////////////////////////////////////
 $scope.details=function(){
     var element=document.getElementById("details");
     element.style.height='500px';
 };
$scope.detailsout= function(){
     var element=document.getElementById("details");
     element.style.height='0px';
 };
 //////////////////////////////v/////////
 $scope.chat=function(){
     var x=document.getElementById("box");
     if(x.style.height=="0px"){
         x.style.height="300px";
     }
     else{
         x.style.height="0px";
     }
 };
     $scope.normalborder=function(id){
         var element=$document[0].getElementById(id);
        element.style.border="none";
     };
     
 });