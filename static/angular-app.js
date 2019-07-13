
var app = angular.module("angular-app", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        template: "<h2> Home </h2>",
    })
    .when("/clients", {
        template: "<h2> Clients </h2>",
        // ,
        // controller : "londonCtrl"
    });
});
// app.controller("londonCtrl", function ($scope) {
//     $scope.msg = "I love London";
// });
// app.controller("parisCtrl", function ($scope) {
//     $scope.msg = "I love Paris";
// });
