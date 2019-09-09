
app.controller("quotes-controller", function ($scope, $http) {
    
    var vm = $scope; 
    var gridTable = null; 

    
    vm.getAllQuotes = function() {

        $http.get("http://localhost:8080/quotes")
        .then(function(response) {
            vm.quotesArr = response.data;
            if(gridTable === null) vm.activateGrid();
        });

    }

    vm.quoteModal = function(quote) { 
        $("#quoteModal").modal(); 

        console.log(quote);
        var quoteTo = quote.to.split("\n"); 
        vm.clientFullName = quoteTo[0]; 
        vm.quotePDFurl = "/quotes/" + quote.quotePDFpath.split(".")[0]; 

    }

    vm.activateGrid = function() { 

        $(document).ready(function() {
            gridTable = $('#quoteGrid').DataTable({
                lengthChange: false
            });

            $('#quoteGrid').show();   //render after DOM has been set up

        } );

    }

    vm.getAllQuotes(); 

});