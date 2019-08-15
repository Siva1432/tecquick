var app=angular.module("cartservice",[]);
app.factory("cartservice",['$http','$location',function($http,$location){
    var planbasic={
        name:"Basic",
        duration:1,
        price:50,
        data:{ emailservices:"Not Included",
            uxguidance:"Not Included",
            prioritatizion:"Not Included",
            workshop:"Not Included"},
        Specs:{
            item:"Basic Site With Less Then 8 pages"
        }
    };
    var plansilver={
        name:"silver",
        icon:"glyphicon glyphicon-send",
        duration:1,
        price:100,
        data:{
            emailservices:"Not Included",
            uxguidance:"Not Included",
            extention:"Not Included",
            hosting:"Not Included"
        },
        Specs:{}
    };
    var plangold={
        name:"gold",
        icon:"glyphicon glyphicon-tower",
        duration:1,
        price:150,
        data:{
             emailservices:"Included",
            uxguidance:"Included",
            extention:"Not Included",
            hosting:"Not Included"
        },
        Specs:{}
    };
    var planplatinum={
        name:"platinum",
        icon:"glyphicon glyphicon-briefcase",
        duration:1,
        price:300,
        data:{
             emailservices:"Included",
            uxguidance:" Included",
            extention:"Included",
            hosting:"Included"
        },
        Specs:{}
    };
    
    var user={};
    
    var plans=[plansilver,plangold,planplatinum];
    
    var changecall=function(type,name,value){
        
        
           var change={
          type:type,
          name:name,
          value:value
          
        };
      
        $http({url:"/change",
        method:"PUT",
            data:change
        }).then(function(response){
            
            if(response.data!==null){
               
                console.log("cart changed successfully",response.data);
                
                $location.path("/dashboard");
                
            }else{
                console.log("change failed");
            
            }
        });
        
        
    };
    
    var currentcart=[];
    
    var updatecurrentcart=function(user){
        
            console.log("adding products to the currentcart",user);
        for(var i=0; i<user.carthistory.length; i++){
            
        }
        
        
    };
    
    var addtocart=function(productname,user){
        //check wether the product is already in the carthistory
        console.log("user",user);
        
        if(user.carthistory[0]==undefined){
            
            console.log("carthistory is empty");
               
              
          if(productname=="silver"){
                 user.carthistory.push(plansilver);
                console.log("the silver product from user deleted");
            }
            if(productname=="gold"){
                 user.carthistory.push(plangold); 
                console.log("the gold product from user deleted");
            }
            if(productname=="platinum"){
                 user.carthistory.push(planplatinum);
                 console.log("the platinum product from user deleted");
            }
           changecall('change','carthistory',user.carthistory);
           
          
            
        }else{
            for(var i=0;i< user.carthistory.length;i++){
                
                if(user.carthistory[i].name==productname){
                    console.log("product found in the user.carthistory",user.carthistory[i]);
                    console.log("item found in the carthistory");
                
                     $location.path("/dashboard");
                    break;
                } else{
                    if(i==user.carthistory.length-1){
                        console.log("adding the product into the carthistor",i);
                        if(productname=="silver"){
                 user.carthistory.push(plansilver);
                console.log("the silver product from user cart addtocurrentcart");
            }
            if(productname=="gold"){
                 user.carthistory.push(plangold); 
                console.log("the gold product from user cart addtocurrentcart");
            }
            if(productname=="platinum"){
                 user.carthistory.push(planplatinum);
                 console.log("the platinum product from user cart addtocurrentcart");
            }
                       
                        
                console.log("carthistory with product",user.carthistory,i);
            
                
               changecall("change","carthistory",user.carthistory);
                        
                        
                    }
                }
                
            }
    }
        
        
    };
    
    
    //delete the products from the cart
    var deleteproduct=function(productname,user){
      
      for(var i=0; i<user.carthistory.length;i++){
          
         
          
          if(user.carthistory[i].name==productname){
              console.log("product deleted from the user cart",user.carthistory[i],productname);
               user.carthistory.splice(i,1);
           changecall('change','carthistory',user.carthistory);
           
          }
           
          
      }
        
    };
    
    
    var cartTotal=function(user){
        var total=0;
        for( let product in user.carthistory){
            console.log("Product in total function", product);
            total+=product.price;
            return total;
        }
    };
    
    
    
    
    return{
        plans:plans,
        addtocart:addtocart,
        user:user,
        deleteproduct:deleteproduct,
         updatecurrentcart: updatecurrentcart,
         currentcart:currentcart,
         cartTotal:cartTotal
        
    };
    
    
}]);