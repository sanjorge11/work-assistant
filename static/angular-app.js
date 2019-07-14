
var app = angular.module("angular-app", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "/views/home.htm",
        controller: "home-controller"
    })
    .when("/clients", {
        templateUrl: "/views/clients.htm",
        controller : "clients-controller"
    })
    .when("/projects", {
        templateUrl: "/views/projects.htm",
        controller: "projects-controller"
    })
    .when("/quotes", {
        templateUrl: "/views/quotes.htm",
        controller: "quotes-controller"
    });
});