
app.controller("clients-controller", function ($scope, $http) {
    
    var vm = $scope; 

    
    vm.getAllClients = function() {

        $http.get("http://localhost:8080/clients")
        .then(function(response) {
            vm.clientsArr = response.data;
            vm.activateGrid();
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

    vm.deleteClient = function() { 
        
        var url = "http://localhost:8080/clients/" + vm.myForm.clientId; 

        $http.delete(url, null)
        .then(function(data) {
            $('#confirmDelete').modal("hide");    
            $('#myModal').modal("hide");   
            vm.getAllClients(); 
        }); 
        
    }

    vm.openModal = function(client) {
        $("#myModal").modal();

        // if(client === null) { 
        //     vm.toggleEditMode(false);
        //     return;
        // }

        vm.myForm.clientId = client._id;
        vm.myForm.formFirstName = client.firstName; 
        vm.myForm.formLastName = client.lastName; 
        vm.myForm.formAddress = client.address;
        vm.myForm.formEmail = client.email; 
        
        //if edit mode is true, then primary modal has more 
        //options to edit client information 
        vm.toggleEditMode(true); 

    }

    vm.openNewModal = function(client) {
        $("#newClientModal").modal();

    }

    vm.toggleEditMode = function(bool) { 
        console.log(bool);
        if(!bool) vm.clearForm();

        vm.formEditMode = bool; 
    }

    vm.clearForm = function() { 
        vm.myForm.formFirstName = ''; 
        vm.myForm.formLastName = ''; 
        vm.myForm.formAddress = '';
        vm.myForm.formEmail = ''; 
        console.log(vm.myForm); 
    }

    vm.activateGrid = function() { 

        $(document).ready(function() {
            var table = $('#clientGrid').DataTable({
                lengthChange: false
                //,"dom": '<"toolbar">frtip'
            });

            // $("div.toolbar").html('<button ng-click="toggleEditMode(false)" type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal">Create</button>');

         
            new $.fn.dataTable.Buttons( table, {
                buttons: [
                    {
                        text: 'Create New Client',
                        action: function ( e, dt, node, conf ) {
                            vm.openNewModal(null);
                        }
                    }
                ]
            } );
         
            table.buttons( 0, null ).container().prependTo(
                table.table().container()
            );

        } );

    }

    vm.getAllClients(); 

});