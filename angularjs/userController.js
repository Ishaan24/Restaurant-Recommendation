var signup = angular.module('myApp',[]);

console.log("I am in user controller");

signup.controller('userController',function($scope,$http) {
	console.log("I am in user controller");
    var proceed=1;
    var cuisines=[];
    var table=0;
    var online=0;

   
    
    $scope.btn_preferences=function() {
        console.log("just to check in sign up");
        console.log($scope.cuisine1);
        console.log($scope.cuisine2);
        if($scope.cuisine1==true){
            cuisines.push("Afghani");
        }
        if($scope.cuisine2==true){
            cuisines.push("American");
        }
        if($scope.cuisine3==true){
            cuisines.push("Asian");
        }
        if($scope.cuisine4==true){
            cuisines.push("Chinese");
        }

        if($scope.cuisine5==true){
            cuisines.push("Continental");
        }
        if($scope.cuisine6==true){
            cuisines.push("Desserts");
        }
        if($scope.cuisine7==true){
            cuisines.push("European");
        }

        if($scope.cuisine8==true){
            cuisines.push("Fast Food");
        }
        if($scope.cuisine9==true){
            cuisines.push("Italian");
        }
        if($scope.cuisine10==true){
            cuisines.push("Japanese");
        }
        if($scope.cuisine11==true){
            cuisines.push("Malaysian");
        }
        if($scope.cuisine12==true){
            cuisines.push("Mexican");
        }
        if($scope.cuisine13==true){
            cuisines.push("Mughlai");
        }
        if($scope.cuisine14==true){
            cuisines.push("Nepalese");
        }
        if($scope.cuisine15==true){
            cuisines.push("North Indian");
        }
        if($scope.cuisine16==true){
            cuisines.push("Pakistani");
        }

        if($scope.cuisine17==true){
            cuisines.push("Rajasthani");
        }
        if($scope.cuisine18==true){
            cuisines.push("Sea Food");
        }
        if($scope.cuisine19==true){
            cuisines.push("South Indian");
        }
        if($scope.cuisine20==true){
            cuisines.push("Street Food");
        }
        if($scope.cuisine21==true){
            cuisines.push("Thai");
        }
        if($scope.cuisine22==true){
            cuisines.push("Turkish");
        }
        if($scope.cuisine23==true){
            cuisines.push("Vietanmese");
         }   
        if($scope.bakery==true){
            cuisines.push("Bakery");
        }
        if($scope.cafe==true){
            cuisines.push("Cafe");
        }
        if($scope.mediterranean==true){
            cuisines.push("Mediterranean");
        }
        if($scope.lebanese==true){
            cuisines.push("Lebanese");
        }
        if($scope.bengali==true){
            cuisines.push("Bengali");
        }
        if($scope.hyderabadi==true){
            cuisines.push("Hyderabadi");
        }
        if($scope.arabian==true){
            cuisines.push("Arabian");
        }
        if($scope.table1=="yes"){
            table=1;
        }
        if($scope.online1=="yes"){
            online=1;
        }

         if(proceed){
			$scope.jsondata = {
				 	"location": $scope.userLocation,
                    "price": $scope.price,
                    "cuisines":cuisines.toString(),
                    "table":table,
                    "online":online
				 }
         $http.post('/userPreferences',$scope.jsondata).then(function(data,status){
         	if(data.data.status ==200){
         		console.log("Success");
		        window.location.assign('/userhome');

         	}
	     })
     }
};

});



