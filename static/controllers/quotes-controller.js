
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

    vm.getQuotePDF = function(quoteId) {

        var url = "http://localhost:8080/quotes/uploads" + quoteId; 

    }

    vm.openModal = function(quote) { 
        $("#quoteModal").modal(); 

        var quoteTo = quote.to.split("\n"); 

        vm.clientFullName = quoteTo[0]; 

        vm.quotePDFurl = "/quotes/" + quote.quotePDFpath.split(".")[0]; 

        // vm.myForm.clientId = client._id;
        // vm.myForm.formFirstName = client.firstName; 
        // vm.myForm.formLastName = client.lastName; 
        // vm.myForm.formAddress = client.address;
        // vm.myForm.formEmail = client.email; 
        
        // //if edit mode is true, then primary modal has more 
        // //options to edit client information 
        // vm.toggleEditMode(true); 

    }

    vm.getAllQuotes(); 

});