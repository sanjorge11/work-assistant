
app.controller("projects-controller", function ($scope, $http) {
    
    var vm = $scope; 
    vm.formClientId = ''; //'(None Selected)';
    vm.clientSet = {}; 
    vm.clientsArr = []; 

    vm.getAllClients =  function() { 

        var url = "http://localhost:8080/clients";

        $http.get(url)
        .then(function(response) { 
            vm.clientsArr = response.data
            activate(); 
        })

    }

    function activate() { 
        vm.getAllProjects = function() {
    
            $http.get("http://localhost:8080/projects")
            .then(function(response) {
                vm.projectsArr = response.data;
    
                // //reset clientSet to get fresh client data 
                // vm.clientSet = {};  
    
                // for(var i=0; i<vm.projectsArr.count; i++) { 
                //     var clientId = vm.projectsArr.projects[i].clientId; 
    
                //     //if set does not have client info, send an HTTP request
                //     if(vm.clientSet[clientId] === undefined) {
                //         $http.get("http://localhost:8080/clients/" + clientId)
                //         .then(function(response) {
    
                //             var client = response.data.client; 
    
                //             vm.clientSet[client._id] = client; 
    
                //         });
                //     }
    
                // }
    
            });
    
        }
    
        vm.createProject = function() {
                
            var url = "http://localhost:8080/projects"; 
            var parameter = JSON.stringify(
                {
                    clientId: vm.myForm.clientId,
                    description: vm.myForm.description,
                    quotes: []
                }
            );
    
            $http.post(url, parameter).
            then(function(data) {
                $('#myModal').modal("hide");    
                vm.getAllProjects(); 
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
                $('#myModal').modal("hide");    
                vm.getAllProjects();    //refresh project and client info 
            });
    
        }
    
        vm.openModal = function(project) {
            $("#myModal").modal(); 
    
            vm.currentClient = vm.filterClient(project.clientId); 

            vm.myForm.projectId = project._id;
            vm.myForm.clientId = project.clientId; 
            vm.myForm.clientName = vm.currentClient.fullName
            vm.myForm.description = project.description; 

            vm.quoteForm.fullName = vm.currentClient.fullName;
            vm.quoteForm.address = vm.currentClient.address;
            vm.quoteForm.email = vm.currentClient.email;
    
            vm.getClientInfo(); 
            
            vm.toggleEditMode(true); 
    
        }
    
        vm.toggleEditMode = function(bool) { 
            if(!bool) vm.clearForm(); 
            vm.myForm.formEditMode = bool; 
        }
    
        vm.clearForm = function() { 
            vm.myForm.clientId = '';
            vm.myForm.clientName = '';
            vm.myForm.description = '';
        }
        
        vm.getClientInfo = function() { 
    
            vm.currentClient = vm.clientSet[vm.myForm.clientId]; 
    
            // var url = "http://localhost:8080/clients/" + vm.myForm.clientId; 
    
            // $http.get(url)
            // .then(function(response) {
            //     vm.currentClient = response.data.client; 
            // }); 
    
        } 

        vm.filterClient = function(clientId) { 
            for(var i=0; i<vm.clientsArr.clients.length; i++) 
                if(vm.clientsArr.clients[i]._id === clientId) return vm.clientsArr.clients[i]; 
        }

    //     function find() {
    //         console.log( vm.clientsArr.clients.filter( x => x._id === "5d26a19ad81b440ea40d2d32"  ) ); 
    //     }
    //    find(); 
    
        vm.getAllProjects(); 
    }

    vm.getAllClients();

});