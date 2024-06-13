import CustomerModel from "/model/CustomerModel.js"
import {customers, products} from "/db/DB.js";

var recordIndex = undefined;

$("#customerIdCheck").hide();
let isError = true;

$("#customerUserCheck").hide();
let usernameError = true;

$("#customerAddressCheck").hide();
let addressError = true;

$("#customerMobileCheck").hide();
let mobileError = true;

function validateID(){
    if ($('#cus-custom-id').val() === "") {
        $("#cus-custom-id").css({"border-color": "red"});
        $("#idCheck").show();
        isError = false;
        return false;
    } else {
        $("#cus-custom-id").css({"border-color": "#32008E"});
        $("#idCheck").hide();
        isError = true;
    }
}

function validateName(){
    var isValidCustomerName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
    if ($('#cus-custom-user').val() === "") {
        $("#cus-custom-user").css({"border-color": "red"});
        $("#userCheck").show()
        alert("Customer Name Missing");
        return false;
    } else if (!isValidCustomerName.test($('#cus-custom-user').val())) {
        $("#cus-custom-user").css({"border-color": "red"});
        alert("Customer Name Invalid");
        usernameError = false;
        return false;
    } else {
        $("#cus-custom-user").css({"border-color": "#32008E"});
        $("#userCheck").hide();
        usernameError = true;
    }
}

function validateAddress(){
    var isValidCustomerAddress = new RegExp("^[A-Za-z0-9'\\/\\.,\\s]{5,}$");
    if ($("#cus-custom-address").val() === "") {
        $("#cus-custom-address").css({"border-color": "red"});
        alert("Customer Address Missing");
        addressError = false;
        return false;
    } else if (!isValidCustomerAddress.test($("#cus-custom-address").val())) {
        $("#cus-custom-address").css({"border-color": "red"});
        alert("Customer Address Invalid");
        addressError = false;
        return false;
    } else {
        $("#cus-custom-address").css({"border-color": "#32008E"});
        $("#addressCheck").hide();
        addressError = true;
    }
}

function validateMobile(){
    var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");
    if ($("#cus-custom-mobile").val() === "") {
        $("#cus-custom-mobile").css({"border-color": "red"});
        alert("Customer Mobile Missing");
        mobileError = false;
        return false;
    } else if (!isValidPhoneNumber.test($("#cus-custom-mobile").val())) {
        $("#cus-custom-mobile").css({"border-color": "red"});
        alert("Customer Mobile Invalid");
        mobileError = false;
        return false;
    } else {
        $("#cus-custom-mobile").css({"border-color": "#32008E"});
        $("#mobileCheck").hide();
        mobileError = true;
    }
}

/*
$("#cus-custom-user").keyup(function () {
    validateName();
});
$("#cus-custom-address").keyup(function () {
    validateAddress();
});
$("#cus-custom-mobile").keyup(function () {
    validateMobile();
})
*/
$('#btnSearchCustomer').on('click', () => {
    let cusId = $('#cus-custom-id').val();

    console.log('Selected product ID:', cusId);

    // Find the selected product object
    const selectedProduct = customers.find(customer => customer.cusId === cusId);
    console.log('Selected product:', selectedProduct);
    $('#cus-custom-user').val(selectedProduct.cusName);
    $('#cus-custom-address').val(selectedProduct.cusAddress);
    $('#cus-custom-mobile').val(selectedProduct.cusMobile);
});

$('#customer-add-btn').on('click', () => {
    validateID();
    validateName();
    validateAddress();
    validateMobile();
    if (isError === true && usernameError === true && addressError === true && mobileError === true) {
        console.log(isError);
        console.log(usernameError);
        console.log(addressError);
        console.log(mobileError);
        let customerId = $('#cus-custom-id').val();
        let customerName = $('#cus-custom-user').val();
        let customerAddress = $('#cus-custom-address').val();
        let customerMobile = $('#cus-custom-mobile').val();

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
    } else {
        return false;
    }
});

export function loadTableCustomer() {
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
    validateID();
    validateName();
    validateAddress();
    validateMobile();
    if (isError === true && usernameError === true && addressError === true && mobileError === true) {
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
    } else {
        return false;
    }
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
    let totalCustomer = customers.length
    console.log("Customer Count: "+totalCustomer);
    $('#customerCount').text(totalCustomer);
}