var app=angular.module("cartmodule",['cartservice'])
.controller("cartctrl",function($scope,$http,$location,cartservice){
   
   (function(){
      $http.post("/getuser").then(function(response){
         console.log("response in getuser",response.data);
         if(response.data.message=="User found sending the user"){
            $scope.user=response.data.user;
            cartservice.user=response.data.user;
            cartservice.updatecurrentcart(response.data.user);
            $scope.currentcart=cartservice.currentcart;
            
            console.log("got the user in the cartctrl",response.data,$scope.currentcart);
            if(response.data.user.username==undefined){
               $scope.user={};
            }
            
            
         }else{
            $scope.user={};
            console.log('cant get the user');
         }
         
      });
      
      
   })();
   
   
   
    
   $scope.plans=cartservice.plans;
   $scope.selectplan=function(productname){
     console.log("selected product",productname);
     if($scope.user.username!== undefined){
         console.log(productname,"Product Selected by",$scope.user.username);
         cartservice.addtocart(productname,$scope.user);
     }else{
         
         console.log("user not logged in to add the to the carthistory ");
        $location.path("/login");
         //prompt for login or sign up
         
         
         
     }
   };
   $scope.deleteproduct=function(productname){
      console.log("deleting the product",productname);
       cartservice.deleteproduct(productname,$scope.user);
       console.log("updated User",$scope.user);
   };
        
        $scope.updateprofile=function(){
           console.log("updating profile",$scope.updateprofile);
           cartservice.updateprofile($scope.updateprofile);
           console.log("Updated User",$scope.user)
        };
    
    
    
});