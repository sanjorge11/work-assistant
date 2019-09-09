
app.controller("projects-controller", function ($scope, $http) {
    
    var vm = $scope; 
    vm.clientsArr = []; 
    var gridTable = null; 
    vm.resources = [];
    vm.quoteItemsArr = [
        {
            name: '',
            quantity: 1,
            unit_cost: 0
        }
    ];


    vm.getAllClients =  function() { 

        var url = "http://localhost:8080/clients";

        $http.get(url)
        .then(function(response) { 
            vm.clientsArr = response.data
            activate(); 
        })

    }

    vm.addItem = function() { 
        vm.quoteItemsArr.push({
            name: '',
            quantity: 1,
            unit_cost: 0
        });
    }

    vm.removeItem = function(e) { 
        var rowIndex = e.$parent.$index;

        var firstHalf = vm.quoteItemsArr.slice(0, rowIndex);
        var secondHalf = vm.quoteItemsArr.slice(rowIndex+1);

        vm.quoteItemsArr = []; 
        for(var item in firstHalf) {
            vm.quoteItemsArr.push(firstHalf[item]);
        }
        for(var item in secondHalf) {
            vm.quoteItemsArr.push(secondHalf[item]);
        }
    }

    vm.getTotal = function() { 
        var sum = 0; 
        for(var i=0; i<vm.quoteItemsArr.length; i++) { 
            sum += (vm.quoteItemsArr[i].quantity * vm.quoteItemsArr[i].unit_cost); 
        }
        return sum; 
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
                    vm.getClientInfo(vm.createForm.clientId).fullName,
                    vm.getClientInfo(vm.createForm.clientId).fullName
                ] ).draw(); 

                vm.clearForm();
              });
    
        }
    
        vm.createQuote = function() { 
    
            var url = "http://localhost:8080/quotes"; 

            var clientInfo = 
            vm.currentClient.fullName + "\n" +
            vm.currentClient.fullAddress + "\n" +
            vm.currentClient.phoneNumber.length > 0 ? (vm.currentClient.phoneNumber + "\n") : "" + 
            vm.currentClient.email;
    
            var quote = {
                from: "Jorge A Fuentes\n704-400-8160", 
                to: clientInfo, 
                projectTotal: vm.getTotal(), 
                items: vm.quoteItemsArr,
                notes: vm.quoteForm.notes,
                terms: vm.quoteForm.terms
            }
    
            //remove $$hashkey and other properties added by angular
            var parameter = angular.toJson(quote);
    
            $http.post(url, parameter).
            then(function(data) {
                $('#quoteModal').modal("hide");    
                $('#updateProjectModal').modal("hide");    
            });
    
        }

        vm.getResources = function() { 

            var url = "http://localhost:8080/resources"; 
    
            $http.get(url)
            .then(function(result) { 
    
                for(i in result.data.resources) vm.resources[result.data.resources[i].resourceName] = result.data.resources[i];
           
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
    
        vm.getResources();
        vm.getAllProjects(); 
    }

    vm.getAllClients();

});