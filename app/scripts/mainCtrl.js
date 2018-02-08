// 'use strict';

// angular
//   .module('demoAppApp', [
//     'ngCookies',
//     'ngResource',
//     'ngRoute',
//     'ngSanitize',
//     'ngTouch'
//   ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'views/main.html',
//         controller: 'MainCtrl',
//         controllerAs: 'main'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });
// debugger
// angular.module("myapp", ['chart.js', 'rzModule'])
// .config(function (ChartJsProvider) {
//   ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
// });

angular.module("myapp", ['chart.js', 'rzModule'])
.config(function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
})
.controller("MyController", function($scope) {
    debugger
    $scope.myvalues = {};
    $scope.myForm = {}; 
    $scope.currentDate = false;
    $scope.currentMonth = false;
    $scope.multiplierInpt = false;
    $scope.image = "menuicon.png";
    $scope.myForm.growth = [
      {id: "linear", name: "Linear" },
      {id: "exponential", name: "Exponential" }
    ];

    $scope.myForm.options = [
        { id : "3mnths", name: "3 Months" }
        ,{ id : "6mnths", name: "6 Months" }
        ,{ id : "12mnths"  , name: "12 Months" }
    ];

    $scope.priceSlider = 150;
    $scope.slider = {
        minValue: 58,
        maxValue: 90,
        options: {
            floor: 0,
            ceil: 100,
            step: 1
        }
    };

    $scope.labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N","D"];
    // $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [0, 20, 35, 42, 40, 38, 42, 58, 60, 62, 65, 78, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-2' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };

    $scope.onChange = function (gro) {
      if(gro == "exponential"){
        $scope.multiplierInpt = true;
        $scope.myForm.multiplier = "ratio";
      }else{
        $scope.multiplierInpt = false;
      }
    };

    $scope.getCurrentDate = function() {
      $scope.dateObj = Date();
      $scope.myForm.current_date = $scope.dateObj.split(" ")[1] + " " + $scope.dateObj.split(" ")[3];
      $scope.myForm.periodicity = "monthly";
    };
    $scope.getCurrentDate();

    $scope.save = function(mvalues){
        console.log("My Form values", mvalues);
        $scope.myvalues = {growth_types_available: mvalues.growth, forecast_months_available: mvalues.options, 
            current_date: mvalues.current_date, periodicity: mvalues.periodicity, 
            forecast_months: mvalues.forecast_months, growth_type: mvalues.growth_type
        }
    }
});