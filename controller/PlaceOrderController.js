import CustomerModel from "/model/CustomerModel.js"
import {customers} from "/db/DB.js";

let customerModel = new CustomerModel();

    $.each(customers, function(index, customerModel) {
        $('#customerSelectID').append($('<option>').text(customerModel.cusId).attr('value', customerModel.cusId));

    });

    $('#customerSelectID').change(function(){
        var selectedId = $(this).val(); // Get the selected ID
        var selectedName = customers.find(customerModel => customerModel.cusId === selectedId).cusName; // Find the corresponding name
        $('#validationCustomerName').val(selectedName); // Set the name in the input field
    });