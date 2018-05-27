var login = angular.module('myApp',[]);

console.log("I am in login");

login.controller('loginController',function($scope,$http) {
	console.log("I am in login controller");
    $scope.invalidpassword = false;
    $scope.invalidemail = false;

    $scope.btn_register=function() {
        console.log("just to check in sign in");

        
			$scope.jsondata = {
                    "email": $scope.regemail,
                    "password": $scope.regpassword,
                    "name": $scope.regname
				 }
         $http.post('/userRegister',$scope.jsondata).then(function(data,status){
         	if(data.data.status ==200){
         		console.log("Success");
		        window.location.assign('/userInfo');

         	}
	     })
     

};

 $scope.btn_login=function() {
        console.log("just to check in sign in");
        var proceed=1;
        if($scope.email == "")
        {
            $scope.emailrequired = true;
            proceed = 0;
        }else{
            $scope.emailrequired = false;
        }
        if($scope.password == "")
        {
            $scope.passwordrequired = true;
            proceed = 0;
        }else{
            $scope.passwordrequired = false;
        }
        if(proceed){
            $scope.jsondata = {
                    "email": $scope.email,
                    "password": $scope.password
                 }
         $http.post('/userLogin',$scope.jsondata).then(function(data,status){
           if(data.data.status ==200){
                console.log("Success");
                window.location.assign('/userloginhome');

            }
            else if(data.data.status ==201){
                $scope.invalidpassword = true;

            }
            else if(data.data.status ==202){
                $scope.invalidemail = true;

            }
            else if(data.data.status ==203){
                window.location.assign('/admin'); 
            }
         })
     }

};
});


