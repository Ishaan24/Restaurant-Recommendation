

var admin = angular.module('myApp',[]);

console.log("I am in admin controller");

admin.controller('adminController', function($scope, $http) {
	var flag=true;
$scope.analyze=function(){
	console.log("I am in init");
          var containerDiv = document.getElementById("vizContainer"),
              url = "https://public.tableau.com/views/256-03/Sheet2?:embed=y&:display_count=yes&publish=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv, url, options);
          $scope.show=true;



           var containerDiv1 = document.getElementById("vizContainer1"),
              url = "https://public.tableau.com/views/256-02/Sheet2?:embed=y&:display_count=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv1, url, options);
          $scope.show=true;


          var containerDiv2 = document.getElementById("vizContainer2"),
              url = "https://public.tableau.com/views/256-01/Sheet1?:embed=y&:display_count=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv2, url, options);
          $scope.show=true;


           var containerDiv3 = document.getElementById("vizContainer3"),
              url = "https://public.tableau.com/views/256-04/Sheet1?:embed=y&:display_count=yes&publish=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv3, url, options);
          $scope.show=true;


          var containerDiv4 = document.getElementById("vizContainer4"),
              url = "https://public.tableau.com/views/256-05/Sheet1?:embed=y&:display_count=yes&publish=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv4, url, options);
          $scope.show=true;


          var containerDiv5 = document.getElementById("vizContainer5"),
              url = "https://public.tableau.com/views/256-06/Sheet1?:embed=y&:display_count=yes&publish=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv5, url, options);
          $scope.show=true;


           var containerDiv6 = document.getElementById("vizContainer6"),
              url = "https://public.tableau.com/views/256-07/Sheet1?:embed=y&:display_count=yes&publish=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv6, url, options);
          $scope.show=true;


           var containerDiv7 = document.getElementById("vizContainer7"),
              url = "https://public.tableau.com/views/256-08/Sheet1?:embed=y&:display_count=yes&publish=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv7, url, options);
          $scope.show=true;


          var containerDiv8 = document.getElementById("vizContainer8"),
              url = "https://public.tableau.com/views/256-09/Sheet1?:embed=y&:display_count=yes&publish=yes",
              options = {
                  hideTabs: true,
                  onFirstInteractive: function () {
                    flag=false;
                      console.log("Run this code when the viz has finished loading.");

                  }
              };
              if(flag===false){
                  viz.dispose();
              }
          viz = new tableau.Viz(containerDiv8, url, options);
          $scope.show=true;

          

};

});



