
app.controller("projects-controller", function ($scope, $http) {
    
    var vm = $scope; 
    vm.formClientId = ''; //'(None Selected)';
    vm.clientsArr = []; 

    
    vm.getAllClients = function() {

        $http.get("http://localhost:8080/clients")
        .then(function(response) {
            vm.clientsArr = response.data; 
            //console.log(vm.clientsArr);
            activate();
        }); 

    }

    function activate() { 
        vm.getAllProjects = function() {

           // vm.getAllClients(); 
    
            $http.get("http://localhost:8080/projects")
            .then(function(response) {
                vm.projectsArr = response.data;
                //console.log(vm.projectsArr); 
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
                $('#myModal').modal("hide");    //hide modal and refresh with GET request 
                vm.getAllProjects(); 
              });
    
        }
    
        vm.mapToClient = function(id) {
            for(var i=0; i<vm.clientsArr.clients.length; i++) { 
                if(vm.clientsArr.clients[i]._id === id) {
                    return vm.clientsArr.clients[i]; 
                }
            }
        }

        vm.openModal = function(project) {
            $("#myModal").modal(); 
            //console.log(project); 
    
            vm.myForm.projectId = project._id;
            vm.myForm.clientName = vm.mapToClient(project.clientId).fullName; 
            vm.myForm.description = project.description; 
            
            //if edit mode is true, then primary modal has more 
            //options to edit client information 
            vm.toggleEditMode(true); 
            //console.log(vm); 
        }
    
        vm.toggleEditMode = function(bool) { 
           // if(!bool) vm.clearForm();
    
            vm.myForm.formEditMode = bool; 
        }

        // vm.clearForm = function() { 
        //     vm.myForm.formFirstName = ''; 
        //     vm.myForm.formLastName = ''; 
        //     vm.myForm.formAddress = '';
        //     vm.myForm.formEmail = ''; 
        // }
    
        vm.getAllProjects(); 
    }

    vm.getAllClients();

});