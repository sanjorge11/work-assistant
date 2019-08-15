
app.controller("clients-controller", function ($scope, $http) {
    
    var vm = $scope; 

    
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
                firstName: vm.myForm.formFirstName, 
                lastName: vm.myForm.formLastName, 
                address: vm.myForm.formAddress, 
                email: vm.myForm.formEmail
            }
        );

        $http.post(url, parameter).
        then(function(data) {
            $('#myModal').modal("hide");    //hide modal and refresh with GET request 
            vm.getAllClients(); 
          });

    }

    vm.updateClient = function() { 

        var url = "http://localhost:8080/clients/" + vm.myForm.clientId; 
        var parameter = JSON.stringify(
            {
                firstName: vm.myForm.formFirstName, 
                lastName: vm.myForm.formLastName, 
                address: vm.myForm.formAddress, 
                email: vm.myForm.formEmail
            }
        );

        $http.put(url, parameter).
        then(function(data) {
            $('#myModal').modal("hide");    
            vm.getAllClients(); 
        });

    }

    vm.openModal = function(client) {
        $("#myModal").modal(); 

        vm.myForm.clientId = client._id;
        vm.myForm.formFirstName = client.firstName; 
        vm.myForm.formLastName = client.lastName; 
        vm.myForm.formAddress = client.address;
        vm.myForm.formEmail = client.email; 
        
        vm.toggleEditMode(true); 

    }

    vm.toggleEditMode = function(bool) { 
        if(!bool) vm.clearForm();

        vm.myForm.formEditMode = bool; 
    }

    vm.clearForm = function() { 
        vm.myForm.formFirstName = ''; 
        vm.myForm.formLastName = ''; 
        vm.myForm.formAddress = '';
        vm.myForm.formEmail = ''; 
    }

    vm.getAllClients(); 

});