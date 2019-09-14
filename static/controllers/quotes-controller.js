
app.controller("quotes-controller", function ($scope, $http) {
    
    var vm = $scope; 
    var gridTable = null; 
    vm.resources = [];


    vm.addItem = function() { 
        vm.quoteForm.items.push({
            name: '',
            quantity: 1,
            unit_cost: 0
        });
    }

    vm.removeItem = function(e) { 
        var rowIndex = e.$parent.$index;

        var firstHalf = vm.quoteForm.items.slice(0, rowIndex);
        var secondHalf = vm.quoteForm.items.slice(rowIndex+1);

        vm.quoteForm.items = []; 
        for(var item in firstHalf) {
            vm.quoteForm.items.push(firstHalf[item]);
        }
        for(var item in secondHalf) {
            vm.quoteForm.items.push(secondHalf[item]);
        }
    }

    vm.getTotal = function() { 
        if(vm.quoteForm.items) {
            var sum = 0; 
            for(var i=0; i<vm.quoteForm.items.length; i++) { 
                sum += (vm.quoteForm.items[i].quantity * vm.quoteForm.items[i].unit_cost); 
            }
            return sum; 
        }
        return;
    }
    
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
        vm.currentQuote = quote; 
        vm.originalQuoteItems = quote.items;
        vm.selectedIndex = index; 

        vm.getClient(vm.currentQuote.clientId); 

    }

    vm.updateQuote = function() { 
        console.log(vm.quoteForm); 
    }

    vm.deleteQuote = function() { 
        
        var url = "http://localhost:8080/quotes/" + vm.currentQuote._id; 
         
         $http.delete(url, null)
         .then(function(data) {
             $('#confirmDelete').modal("hide");    
             $('#quoteModal').modal("hide");   
             
             gridTable.row( $('#'+vm.selectedIndex) )
             .remove()
             .draw();
         }); 
         
     }

    vm.getClient = function(clientId) { 

        var url = "http://localhost:8080/clients/" + clientId; 

        $http.get(url)
        .then(function(response) {
            vm.currentClient = response.data.client; 

            //initialize quoteForm
            Object.assign(vm.quoteForm, vm.currentClient);
            Object.assign(vm.quoteForm, vm.currentQuote);
            vm.quoteForm.items = []; 
            for(var i=0; i<vm.originalQuoteItems.length; i++) vm.quoteForm.items.push(vm.originalQuoteItems[i]);
        }); 
        
    }

    vm.getResources = function() { 

        var url = "http://localhost:8080/resources"; 

        $http.get(url)
        .then(function(result) { 

            for(i in result.data.resources) vm.resources[result.data.resources[i].resourceName] = result.data.resources[i];
       
        });

    }

    vm.resetForm = function() {
    
        for(var a in vm.currentClient) { 
            if(a !== '__v') vm.quoteForm[a] = vm.currentClient[a]; 
        }

        for(var a in vm.currentQuote) { 
            if(a !== '__v') vm.quoteForm[a] = vm.currentQuote[a]; 
        }

        vm.quoteForm.$setPristine();

        console.log(vm.quoteForm); 
        
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
    

    vm.getResources();
    vm.getAllQuotes(); 

});