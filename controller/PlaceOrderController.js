//import CustomerModel from "/model/CustomerModel.js"
import {customers} from "/db/DB.js";

    $.each(customers, function(index, obj) {
        $('#customerSelectID').append($('<option>').text(obj.cusId).attr('value', obj.cusId));
    });

    $('#customerSelectID').change(function(){
        var selectedId = $(this).val(); // Get the selected ID
        var selectedName = data.find(obj => obj.cusId === selectedId).cusName; // Find the corresponding name
        $('#validationCustomerName').val(selectedName); // Set the name in the input field
    });