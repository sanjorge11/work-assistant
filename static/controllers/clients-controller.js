
app.controller("clients-controller", function ($scope, $http) {
    
    var vm = $scope; 
    var gridTable = null; 
    vm.resources = [];

    
    vm.getAllClients = function() {

        $http.get("http://localhost:8080/clients")
        .then(function(response) {
            vm.clientsArr = response.data;
            if(gridTable === null) vm.activateGrid();
        });

    }

    vm.createClient = function() {

        var url = "http://localhost:8080/clients"; 
        var parameter = JSON.stringify(
            {
                firstName: vm.createForm.firstName, 
                lastName: vm.createForm.lastName, 
                address: vm.createForm.address, 
                city: vm.createForm.city, 
                state: vm.createForm.state, 
                zip: vm.createForm.zip, 
                phoneNumber: vm.createForm.phoneNumber, 
                email: vm.createForm.email
            }
        );

        $http.post(url, parameter).
        then(function(response) {
            $('#newClientModal').modal("hide");    

            // gridTable.row.add( [
            //         vm.createForm.firstName,
            //         vm.createForm.lastName,
            //         response.data.client.fullAddress,
            //         vm.createForm.phoneNumber,
            //         vm.createForm.email
            // ] ).draw(); 

            location.reload(true); //temporary work-around

            //only clear form if save was successful, 
            //don't erase typed info if user exits modal 
            //to check other browser windows
            vm.clearForm();
          });

    }

    vm.updateClient = function() { 

        var url = "http://localhost:8080/clients/" + vm.updateForm.clientId; 
        var parameter = JSON.stringify(
            {
                firstName: vm.updateForm.firstName, 
                lastName: vm.updateForm.lastName, 
                address: vm.updateForm.address, 
                email: vm.updateForm.email
            }
        );

        $http.put(url, parameter).
        then(function(data) {
            $('#updateClientModal').modal("hide");

            //update gridTable
            vm.clientsArr.clients[vm.selectedIndex].firstName = vm.updateForm.firstName; 
            vm.clientsArr.clients[vm.selectedIndex].lastName = vm.updateForm.lastName; 
            vm.clientsArr.clients[vm.selectedIndex].address = vm.updateForm.address; 
            vm.clientsArr.clients[vm.selectedIndex].email = vm.updateForm.email; 

        });

    }

    vm.deleteClient = function() { 
        
       var url = "http://localhost:8080/clients/" + vm.updateForm.clientId; 
        
        $http.delete(url, null)
        .then(function(data) {
            $('#confirmDelete').modal("hide");    
            $('#updateClientModal').modal("hide");   
            
            gridTable.row( $('#'+vm.selectedIndex) )
            .remove()
            .draw();
        }); 
        
    }

    vm.getResources = function() { 

        var url = "http://localhost:8080/resources"; 

        $http.get(url)
        .then(function(result) { 

            for(i in result.data.resources) vm.resources[result.data.resources[i].resourceName] = result.data.resources[i];
       
        });

    }

    vm.createClientModal = function() {
        $("#newClientModal").modal();
    }

    vm.updateClientModal = function(client, index) {
        $("#updateClientModal").modal();

        vm.selectedIndex = index; 

        vm.updateForm.clientId = client._id;
        vm.updateForm.firstName = client.firstName; 
        vm.updateForm.lastName = client.lastName; 
        vm.updateForm.address = client.address;
        vm.updateForm.city = client.city;
        vm.updateForm.state = client.state;
        vm.updateForm.zip = client.zip;
        vm.updateForm.phoneNumber = client.phoneNumber;
        vm.updateForm.email = client.email; 
        
    }

    vm.clearForm = function() { 
        vm.createForm.firstName = '';  
        vm.createForm.lastName = ''; 
        vm.createForm.address = ''; 
        vm.createForm.city = ''; 
        vm.createForm.state = 'Choose...'; 
        vm.createForm.zip = '';
        vm.createForm.phoneNumber = '';
        vm.createForm.email = '';
    }

    vm.activateGrid = function() { 

        $(document).ready(function() {
            gridTable = $('#clientGrid').DataTable({
                lengthChange: false
            });

            new $.fn.dataTable.Buttons( gridTable, {
                buttons: [
                    {
                        text: 'Create New Client',
                        action: function ( e, dt, node, conf ) {
                            e.preventDefault();
                            vm.createClientModal();
                        }
                    }
                ]
            } );
         
            gridTable.buttons( 0, null ).container().prependTo(
                gridTable.table().container()
            );

            // $('#inputPhone').keyup(function(e) {
            //     var key = $(this).val(); 

            //     if(key.length > 0) { 
            //         vm.createForm.phoneNumber = "(" + key.slice(0,3) + ")" + key.slice(3);
            //     }
                
            //     console.log(vm.createForm.phoneNumber); 
            // });

            $('#clientGrid').show();

        } );

    }

    vm.getResources();
    vm.getAllClients(); 

});