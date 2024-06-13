import {customers, products, orderDetails, orders} from "/db/DB.js";
import OrderDetailModel from "/model/OrderDetailModel.js"
import {loadTableProduct} from "./ProductController.js";
import {loadTableCustomer} from "./CustomerController.js";


let cusId = null;

const date = new Date();

let recordIndex = undefined;
let orderId = $('#orderId').text();
let orderDate = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate();

$('#orderId').text(orderId);
$('#orderDate').text(orderDate);

function updateCustomerIDs() {
    $('#customerSelectID').empty();
    const defaultOption = document.createElement("option");

    defaultOption.text = "Select customer ID";
    $('#customerSelectID').append(defaultOption);
        
    customers.forEach(customer => {
        const option = document.createElement("option");
        option.value = JSON.stringify(customer);
        option.text = customer.cusId;
        $('#customerSelectID').append(option);
    });
}

$('#customerSelectID').on('focus', () => {
    updateCustomerIDs();
});

$('#customerSelectID').on('change', function() {
    cusId = $('#customerSelectID option:selected').text();

    console.log('Selected Customer ID:', cusId);

    // Find the selected customer object
    const selectedCustomer = customers.find(customer => customer.cusId === cusId);
    console.log('Selected Customer:', selectedCustomer);

    // Update the input element with the customer's name if a customer is selected
    if (selectedCustomer) {
        $('#customerName').val(selectedCustomer.cusName); 
    } else {
        // If no customer is selected, clear the span element
        $('#customerName').val("No customer selected"); 
    }
});
    
function updateProductIDs() {
    $('#productSelectID').empty();
    const defaultOption = document.createElement("option");
        
    defaultOption.text = "Select product ID";
    $('#productSelectID').append(defaultOption);
        
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = JSON.stringify(product);
        option.text = product.proId;
        $('#productSelectID').append(option);
    });
}

$('#productSelectID').on('focus', () => {
    updateProductIDs();
});

$('#productSelectID').on('change', function() {
    let prodId = $('#productSelectID option:selected').text();

    console.log('Selected product ID:', prodId);

    // Find the selected product object
    const selectedProduct = products.find(product => product.proId === prodId); 
    console.log('Selected product:', selectedProduct);
    $('#productName').val(selectedProduct.proName); 
    $('#productType').val(selectedProduct.proType); 
    $('#productQTY').val(selectedProduct.proQty); 
    $('#productPrice').val(selectedProduct.proPrice); 
});

function loadTableCart() {
    $('#cart-table').empty();
    $('#order-table').empty();
    $('#dash-table').empty();

    orderDetails.map((item, index) => {
        let record = `<tr>
                                <td class="order_id" scope="row">${item.orderId}</td>
                                <td class="pro_name">${item.proName}</td>
                                <td class="pro_type">${item.proType}</td>
                                <td class="pro_qty">${item.proQty}</td>
                                <td class="pro_price">${item.proPrice}</td>
                                <td class="pro_total">${item.proTotal}</td>
                            </tr>`
        $('#cart-table').append(record);
        $('#order-table').append(record);
        $('#dash-table').append(record);
    });
}

function clearFields(){
    $('#productSelectID option:selected').text("");
    $('#productName').val("");
    $('#productType').val("");
    $('#productQTY').val("");
    $('#productQtyNeeded').val("");
    $('#productPrice').val("");
}

$('#clear').on('click', () => {
    clearFields();
});

$("#cart-table").on('click', 'tr', function () {
    recordIndex = $(this).index();
    console.log(recordIndex);

    let productName = $(this).find(".proName").text();
    let productType = $(this).find(".proType").text();
    let productQTYNeeded = $(this).find(".proQty").text();
    let productPrice = $(this).find(".proPrice").text();

    $('#productName').val(productName);
    $('#productType').val(productType);
    $('#productQTY').val(productQTYNeeded);
    $('#productPrice').val(productPrice);
});



$('#addToCart').on('click', () => {
    if ($('#productQty').val() <= $('#productQtyNeeded').val()) {
        alert("Blah")
    } else {
        let customerId = cusId;
        let customerName = $('#customerName').val();
        let productId = $('#productSelectID option:selected').text();
        let productName = $('#productName').val();
        let productType = $('#productType').val();
        let productQTYNeeded = $('#productQtyNeeded').val();
        let productPrice = $('#productPrice').val();
        let productTotal = productQTYNeeded*productPrice;

        let orderDetail = new OrderDetailModel(orderId, customerId, customerName, productId, productName, productType, productQTYNeeded, productPrice, productTotal);

        const selectedProduct = products.find(product => product.proId === productId)
        selectedProduct.proQty = selectedProduct.proQty - $('#productQtyNeeded').val();
        console.log("Product Qty: "+selectedProduct.proQty);

        orderDetails.push(orderDetail);

        loadTableCustomer();
        loadTableProduct();
        loadTableCart();
        totalOrders();
        console.log(orderDetails);
        clearFields();
    }
});

$('#removeFromCart').on('click', () => {
    orderDetails.splice(recordIndex, 1);
    loadTableCart();
    totalOrders();
    clearFields();
});

function totalOrders() {
    let totalOrder = orders.length
    console.log("Customer Count: "+totalOrder);
    $('#orderCount').text(totalOrder);
}