
app.controller("projects-controller", function ($scope, $http) {
    
    var vm = $scope; 
    vm.formClientId = '';

    
    vm.getAllProjects = function() {

        $http.get("http://localhost:8080/projects")
        .then(function(response) {
            vm.projectsArr = response.data;
        });

    }

    vm.createProject = function() {
        
        var url = "http://localhost:8080/projects"; 
        var parameter = JSON.stringify(
            {
                clientId: vm.formClientId
            }
        );

        $http.post(url, parameter).
        then(function(data) {
            $('#myModal').modal("hide");    //hide modal and refresh with GET request 
            vm.getAllProjects(); 
          });

    }

    vm.getAllProjects(); 

});