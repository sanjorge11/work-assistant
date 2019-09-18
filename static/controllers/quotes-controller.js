
app.controller("quotes-controller", function ($scope, $http) {
    
    var vm = $scope; 
    var gridTable = null; 
    vm.resources = [];
    vm.originalQuoteItems = [];


    vm.addItem = function() { 
        vm.quoteForm.$setDirty();

        vm.quoteForm.items.push({
            name: '',
            quantity: 1,
            unit_cost: 0
        });
    }

    vm.removeItem = function(e) { 
        vm.quoteForm.$setDirty();

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
       
        vm.originalQuoteItems = [];
        var itemsArr = JSON.parse(angular.toJson(quote.items)); 
        for(var i=0; i<itemsArr.length; i++) vm.originalQuoteItems.push(itemsArr[i]);
        
        vm.selectedIndex = index; 
        vm.getClient(vm.currentQuote.clientId); 

    }

    vm.createQuote = function() { 
    
        var url = "http://localhost:8080/quotes"; 

        vm.quoteForm.projectTotal = vm.getTotal(); 

        //remove $$hashkey and other properties added by angular
        var parameter = angular.toJson(vm.quoteForm);

        $http.post(url, parameter).
        then(function(data) {
            $('#updateQuoteModal').modal("hide");    
            $('#quoteModal').modal("hide");    

            location.reload(true);      //temporary work-around for ng-doubleclick issue
        });
        
    }

    /*
    vm.updateQuote = function() { 

        var url = "http://localhost:8080/quotes/" + vm.currentQuote._id;
    
        var parameter = angular.toJson(vm.quoteForm);

        $http.put(url, parameter).
        then(function(data) {
            $('#updateQuoteModal').modal("hide");

            // //update gridTable
            // vm.clientsArr.clients[vm.selectedIndex].firstName = vm.updateForm.firstName; 
            // vm.clientsArr.clients[vm.selectedIndex].lastName = vm.updateForm.lastName; 
            // vm.clientsArr.clients[vm.selectedIndex].address = vm.updateForm.address; 
            // vm.clientsArr.clients[vm.selectedIndex].email = vm.updateForm.email; 

        });

        // console.log(vm.currentQuote); 
        // console.log(JSON.parse(parameter)); 
    } */

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
            for(var a in vm.currentClient) { 
                if(a[0] !== '$' && a[0] !== '_') vm.quoteForm[a] = vm.currentClient[a]; 
            }
            for(var a in vm.currentQuote) { 
                if(a[0] !== '$' && a[0] !== '_' && a !== 'items') vm.quoteForm[a] = vm.currentQuote[a]; 
            }
            
            if(vm.quoteForm.items === undefined) vm.quoteForm.items = [];
            
            //note that we convert to JSON and then parse to remove $$hashkey references
            vm.quoteForm.items.splice(0,vm.quoteForm.items.length); 
            var itemsArr = JSON.parse(angular.toJson(vm.originalQuoteItems)); 
            for(var i=0; i<itemsArr.length; i++) vm.quoteForm.items.push(itemsArr[i]); 


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

        for(var a in vm.quoteForm) { 
            if(a[0] !== '_' && a[0] !== '$') { 
                if(a in vm.currentClient) { 
                    vm.quoteForm[a] = vm.currentClient[a]; 
                } else if (a in vm.currentQuote) { 
                    if(a === 'items') { 
                        vm.quoteForm.items.splice(0,vm.quoteForm.items.length); 
                        var itemsArr = JSON.parse(angular.toJson(vm.originalQuoteItems)); 
                        for(var i=0; i<itemsArr.length; i++) vm.quoteForm.items.push(itemsArr[i]);
                    }
                    else vm.quoteForm[a] = vm.currentQuote[a]; 
                } else { 
                    delete vm.quoteForm[a]; 
                }
            }
        }

        vm.quoteForm.$setPristine();
        
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