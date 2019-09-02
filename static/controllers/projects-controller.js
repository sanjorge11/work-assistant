
app.controller("projects-controller", function ($scope, $http) {
    
    var vm = $scope; 
    vm.clientsArr = []; 
    var gridTable = null; 


    vm.getAllClients =  function() { 

        var url = "http://localhost:8080/clients";

        $http.get(url)
        .then(function(response) { 
            vm.clientsArr = response.data
            activate(); 
        })

    }

    vm.activateGrid = function() { 

        $(document).ready(function() {
            gridTable = $('#projectGrid').DataTable({
                lengthChange: false
            });

            new $.fn.dataTable.Buttons( gridTable, {
                buttons: [
                    {
                        text: 'Create New Project',
                        action: function ( e, dt, node, conf ) {
                            e.preventDefault();
                            vm.createProjectModal();
                        }
                    }
                ]
            } );
         
            gridTable.buttons( 0, null ).container().prependTo(
                gridTable.table().container()
            );

            $('#projectGrid').show();   //render after DOM has been set up

        } );

    }

    function activate() { 

        vm.getAllProjects = function() {
    
            $http.get("http://localhost:8080/projects")
            .then(function(response) {
                vm.projectsArr = response.data;
                if(gridTable === null) vm.activateGrid();
            });
    
        }
    
        vm.createProject = function() {
                
            var url = "http://localhost:8080/projects"; 
            var parameter = JSON.stringify(
                {
                    clientId: vm.createForm.clientId,
                    description: vm.createForm.description,
                    quotes: []
                }
            );
    
            $http.post(url, parameter).
            then(function(data) {
                $('#newProjectModal').modal("hide");   
                
                gridTable.row.add( [
                    vm.createForm.clientId,
                    vm.getClientInfo(vm.createForm.clientId).fullName
                ] ).draw(); 

                vm.clearForm();
              });
    
        }
    
        vm.createQuote = function() { 
    
            var url = "http://localhost:8080/quotes"; 
    
            var clientFullName = vm.currentClient.fullName.length > 0 ? vm.currentClient.fullName + "\n" : ""; 
            var clientAddress = vm.currentClient.address.length > 0 ? vm.currentClient.address + "\n" : ""; 
            var clientEmail = vm.currentClient.email.length > 0 ? vm.currentClient.email : ""; 
    
            var quote = {
                from: "Jorge A Fuentes\n704-400-8160", 
                to: clientFullName + clientAddress + clientEmail, 
                number: "#1", 
                projectTotal: vm.quoteForm.cost, 
                items: [
                    {
                        name: vm.quoteForm.description,
                        quantity: 1,
                        unit_cost: vm.quoteForm.cost, 
                    }
                ]
            }
    
            var parameter = JSON.stringify(quote);
    
            $http.post(url, parameter).
            then(function(data) {
                $('#quoteModal').modal("hide");    
                $('#updateProjectModal').modal("hide");    
            });
    
        }
    
        vm.createProjectModal = function() {
            $("#newProjectModal").modal();   
        }

        vm.updateProjectModal = function(project, index) {
            $("#updateProjectModal").modal();
    
            vm.selectedIndex = index; 
    
            vm.updateForm.projectId = project._id;
            vm.updateForm.clientId = project.clientId; 
            vm.updateForm.clientName = project.clientName; 
            vm.updateForm.description = project.description;
            
            vm.currentClient = vm.getClientInfo(project.clientId); 

        }
    
        vm.clearForm = function() { 
            vm.createForm.clientId = '';
            vm.createForm.clientName = '';
            vm.createForm.description = '';
        }

        vm.getClientInfo = function(clientId) { 
            for(var i=0; i<vm.clientsArr.clients.length; i++) 
                if(vm.clientsArr.clients[i]._id === clientId) return vm.clientsArr.clients[i]; 
        }
    
        vm.getAllProjects(); 
    }

    vm.getAllClients();

});