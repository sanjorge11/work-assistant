
app.controller("quotes-controller", function ($scope, $http) {
    
    var vm = $scope; 
    vm.formClientId = '';

    
    vm.getAllQuotes = function() {

        $http.get("http://localhost:8080/quotes")
        .then(function(response) {
            vm.quotesArr = response.data;
        });

    }

    vm.createProject = function() {
        
        var url = "http://localhost:8080/quotes"; 
        var parameter = JSON.stringify(
            {
                clientId: vm.formClientId
            }
        );

        $http.post(url, parameter).
        then(function(data) {
            $('#myModal').modal("hide");    //hide modal and refresh with GET request 
            vm.getAllQuotes(); 
          });

    }

    vm.getAllQuotes(); 

});