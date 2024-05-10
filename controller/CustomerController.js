import CustomerModel from "/model/CustomerModel.js"
import {customers} from "/db/DB.js";

var recordIndex = undefined;

$('#customer-add-btn').on('click', () => {
    var customerId = $('#cus-custom-id').val();
    var customerName = $('#cus-custom-user').val();
    var customerAddress = $('#cus-custom-address').val();
    var customerMobile = $('#cus-custom-mobile').val();

    var record = `<tr>
                            <td class="cus_id" scope="row">${customerId}</td>     
                            <td class="cus_name">${customerName}</td>
                            <td class="cus_address">${customerAddress}</td>     
                            <td class="cus_mobile">${customerMobile}</td>
                        </tr>`
    $('#customer-table').append(record);

    let customer = new CustomerModel(customerId, customerName, customerAddress, customerMobile);

    // let customer = {
    //     cusId: customerId,
    //     cusName: customerName,
    //     cusAddress: customerAddress,
    //     cusMobile: customerMobile
    // }

    customers.push(customer)
    loadTableCustomer();
    totalCustomers();
    console.log(customers);
    clearFields();
});

function loadTableCustomer() {
    $('#customer-table').empty();
    customers.map((item, index) => {
        let record = `<tr>
                                <td class="cus_id" scope="row">${item.cusId}</td>     
                                <td class="cus_name">${item.cusName}</td>
                                <td class="cus_address">${item.cusAddress}</td>     
                                <td class="cus_mobile">${item.cusMobile}</td>
                            </tr>`
        $('#customer-table').append(record);
    });
}

$("#customer-table").on('click', 'tr', function () {
    // console.log("Adoo");
    recordIndex = $(this).index();

    console.log(recordIndex);

    let customerId = $(this).find(".cus_id").text();
    let customerName = $(this).find(".cus_name").text();
    let customerAddress = $(this).find(".cus_address").text();
    let customerMobile = $(this).find(".cus_mobile").text();

    $("#cus-custom-id").val(customerId);
    $("#cus-custom-user").val(customerName);
    $("#cus-custom-address").val(customerAddress);
    $("#cus-custom-mobile").val(customerMobile);

    // console.log(id);
    // console.log(fName);
    // console.log(lName);
    // console.log(address);
});

$("#customer-update-btn").on('click', () => {
    var customerId = $('#cus-custom-id').val();
    var customerName = $('#cus-custom-user').val();
    var customerAddress = $('#cus-custom-address').val();
    var customerMobile = $('#cus-custom-mobile').val();

    let cusObj = customers[recordIndex];
    cusObj.cusId = customerId;
    cusObj.cusName = customerName;
    cusObj.cusAddress = customerAddress;
    cusObj.cusMobile = customerMobile;

    loadTableCustomer();
    clearFields();
});

$('#customer-delete-btn').on('click', () => {
    customers.splice(recordIndex, 1);
    totalCustomers();
    loadTableCustomer();
    clearFields();
});

$('#customer-clear-btn').on('click', () => {
    clearFields();
});

function clearFields() {
    $('#cus-custom-id').val('');
    $('#cus-custom-user').val('');
    $('#cus-custom-address').val('');
    $('#cus-custom-mobile').val('');
}

function totalCustomers() {
    var totalCustomer = customers.length
    console.log(totalCustomer);
    $('#countCustomer').text(totalCustomer);
}