// 'use strict';
var app = angular.module('myapp', ['chart.js', 'rzModule']);

app.config(function (ChartJsProvider) {
  ChartJsProvider.setOptions({ 
    colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
    tooltipFillColor: '#FFF',
    tooltipFontColor: '#000',
  });
});

var myapp = angular.module('myapp');

myapp.controller("MyController",['$scope', function($scope) {
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

  $scope.getCurrentDate = function() {
    $scope.dateObj = Date();
    $scope.myForm.current_date = $scope.dateObj.split(" ")[1] + " " + $scope.dateObj.split(" ")[3];
    $scope.myForm.periodicity = "monthly";
  };
  $scope.getCurrentDate();

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

  $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov","Dec"];
  // $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [0, 20, 35, 42, 40, 38, 42, 58, 60, 62, 65, 78, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [
    { 
      // label: $scope.myForm.current_date,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.4)",
      // tooltipFillColor: "rgba(0,0,0,0.8)"
    }
  ];
  $scope.options = {
    tooltips: {
      yAlign: 'bottom'
      // backgroundColor: "#ffffff",
    },
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

  $scope.onchangeMonth = function (mon){
    if(mon == "3mnths"){
      $scope.labels = ["Jan", "Feb", "Mar"];
    }else if(mon == "6mnths"){
      $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
    }else{
      $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov","Dec"];
    }
  };

  $scope.save = function(mvalues){
    console.log("My Form values", mvalues);
    if(mvalues.multiplier == "3mnths"){
      $scope.labels = ["Jan", "Feb", "Mar"];
    }else if(mvalues.multiplier == "6mnths"){
      $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
    }else{
      $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov","Dec"];
    }
    $scope.myvalues = {growth_types_available: mvalues.growth, forecast_months_available: mvalues.options, 
        current_date: mvalues.current_date, periodicity: mvalues.periodicity, 
        forecast_months: mvalues.forecast_months, growth_type: mvalues.growth_type
    }
  }
}]);