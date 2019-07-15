
app.controller("clients-controller", function ($scope, $http) {
    
    var vm = $scope; 
    vm.formFirstName = '';
    vm.formLastName = '';
    vm.formAddress = '';
    vm.formEmail = ''; 

    
    vm.getAllClients = function() {

        $http.get("http://localhost:8080/clients")
        .then(function(response) {
            vm.clientsArr = response.data;
        });

    }

    vm.createClient = function() {
        
        var url = "http://localhost:8080/clients"; 
        var parameter = JSON.stringify(
            {
                firstName: vm.formFirstName, 
                lastName: vm.formLastName, 
                address: vm.formAddress, 
                email: vm.formEmail
            }
        );

        $http.post(url, parameter).
        then(function(data) {
            $('#myModal').modal("hide");    //hide modal and refresh with GET request 
            vm.getAllClients(); 
          });

    }

    vm.getAllClients(); 

});