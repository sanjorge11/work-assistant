
app.controller("quotes-controller", function ($scope, $http) {
    
    var vm = $scope; 
    var gridTable = null; 
    var currentQuote = null; 

    
    vm.getAllQuotes = function() {

        $http.get("http://localhost:8080/quotes")
        .then(function(response) {
            vm.quotesArr = response.data;
            if(gridTable === null) vm.activateGrid();
        });

    }

    vm.quoteModal = function(quote, index) { 
        $("#quoteModal").modal(); 

        var quoteTo = quote.to.split("\n"); 
        vm.clientFullName = quoteTo[0]; 
        vm.quotePDFurl = "/quotes/" + quote.quotePDFpath.split(".")[0]; 
        currentQuote = quote; 
        vm.selectedIndex = index; 

    }

    vm.deleteQuote = function() { 
        
        var url = "http://localhost:8080/quotes/" + currentQuote._id; 
         
         $http.delete(url, null)
         .then(function(data) {
             $('#confirmDelete').modal("hide");    
             $('#quoteModal').modal("hide");   
             
             gridTable.row( $('#'+vm.selectedIndex) )
             .remove()
             .draw();
         }); 
         
     }

    vm.sendEmail = function() { 
        //window.open('mailto:email@domain.com?subject=file&body=see+file&attachment=\\Users\\sanjorge\\Projects\\work-assistant\\uploads\\5d75cf63dccdb742b9b6984b.pdf');
        //window.open('mailto:test@example.com?subject=subject&body=body');
    }

    vm.activateGrid = function() { 

        $(document).ready(function() {
            gridTable = $('#quoteGrid').DataTable({
                lengthChange: false,
                columnDefs: [ { type: 'date', 'targets': [0] } ],
                order: [[ 0, 'desc' ]]
            });

            $('#quoteGrid').show();   //render after DOM has been set up

        } );

    }

    vm.getAllQuotes(); 

});