import ProductModel from "/model/ProductModel.js";
import {customers, products} from "/db/DB.js";

var recordIndex = undefined;

let isIDError = true;
let isNameError = true;
let isTypeError = true;
let isQtyError = true;
let isPriceError = true;

function validateID(){
    if ($('#pro-custom-id').val() === "") {
        $("#pro-custom-id").css({"border-color": "red"});
        alert("ID Missing");
        isIDError = false;
        return false;
    } else {
        $("#pro-custom-id").css({"border-color": "#32008E"});
        isIDError = true;
    }
}
function validateName(){
    var isValidName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
    if ($('#pro-custom-name').val() === "") {
        $("#pro-custom-name").css({"border-color": "red"});
        alert("Product Name Missing");
        isNameError = false;
        return false;
    } else if (!isValidName.test($("#pro-custom-name").val())) {
        $("#pro-custom-name").css({"border-color": "red"});
        alert("Product Name Invalid");
        isNameError = false;
        return false;
    } else {
        $("#pro-custom-name").css({"border-color": "#32008E"});
        isNameError = true;
    }
}
function validateType(){
    var isValidType = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
    if ($('#pro-custom-type').val() === "") {
        $("#pro-custom-type").css({"border-color": "red"});
        alert("Product Type Missing");
        isTypeError = false;
        return false;
    } else if (!isValidType.test($("#pro-custom-type").val())) {
        $("#pro-custom-type").css({"border-color": "red"});
        alert("Product Type Invalid");
        isTypeError = false;
        return false;
    } else {
        $("#pro-custom-type").css({"border-color": "#32008E"});
        isTypeError = true;
    }
}
function validateQty(){
    var isValidQTY = new RegExp("^[0-9]+\\.?[0-9]*$");
    if ($('#pro-custom-qty').val() === "") {
        $("#pro-custom-qty").css({"border-color": "red"});
        alert("Product QTY Missing");
        isQtyError = false;
        return false;
    } else if (!isValidQTY.test($("#pro-custom-qty").val())) {
        $("#pro-custom-qty").css({"border-color": "red"});
        alert("Product QTY Invalid");
        isQtyError = false;
        return false;
    } else {
        $("#pro-custom-qty").css({"border-color": "#32008E"});
        isQtyError = true;
    }
}
function validatePrice(){
    var isValidPrice = new RegExp("^[0-9]+\\.?[0-9]*$");
    if ($('#pro-custom-price').val() === "") {
        $("#pro-custom-price").css({"border-color": "red"});
        alert("Product Price Missing");
        isPriceError = false;
        return false;
    } else if (!isValidPrice.test($("#pro-custom-price").val())) {
        $("#pro-custom-price").css({"border-color": "red"});
        alert("Product Price Invalid");
        isPriceError = false;
        return false;
    } else {
        $("#pro-custom-price").css({"border-color": "#32008E"});
        isPriceError = true;
    }
}

$('#btnSearchProduct').on('click', () => {
    let prodId = $('#pro-custom-id').val();

    console.log('Selected product ID:', prodId);

    // Find the selected product object
    const selectedProduct = products.find(product => product.proId === prodId);
    console.log('Selected product:', selectedProduct);
    $('#pro-custom-name').val(selectedProduct.proName);
    $('#pro-custom-type').val(selectedProduct.proType);
    $('#pro-custom-qty').val(selectedProduct.proQty);
    $('#pro-custom-price').val(selectedProduct.proPrice);
});

$('#product-add-btn').on('click', () => {
    validateID();
    validateName();
    validateType();
    validatePrice();
    validateQty();

    if (isIDError === true && isNameError === true && isTypeError === true && isPriceError === true && isQtyError === true) {
        var productId = $('#pro-custom-id').val();
        var productName = $('#pro-custom-name').val();
        var productType = $('#pro-custom-type').val();
        var productQty = $('#pro-custom-qty').val();
        var productPrice = $('#pro-custom-price').val();

        var record = `<tr>
                            <td class="pro_id" scope="row">${productId}</td>     
                            <td class="pro_name">${productName}</td>
                            <td class="pro_type">${productType}</td>     
                            <td class="pro_qty">${productQty}</td>
                            <td class="pro_price">${productPrice}</td>
                        </tr>`
        $('#product-table').append(record);

        let product = new ProductModel(productId, productName, productType, productQty, productPrice);

        products.push(product)
        loadTableProduct();
        totalProducts();
        console.log(products);
        clearFields();
    } else {
        return false;
    }
});

export function loadTableProduct(){
    $('#product-table').empty();
    products.map((item, index) =>{
        let record = `<tr>
                            <td class="pro_id" scope="row">${item.proId}</td>     
                            <td class="pro_name">${item.proName}</td>
                            <td class="pro_type">${item.proType}</td>     
                            <td class="pro_qty">${item.proQty}</td>
                            <td class="pro_price">${item.proPrice}</td>
                        </tr>`
        $('#product-table').append(record);
    });
}

$("#product-table").on('click', 'tr',function()  {
    // console.log("Adoo");
    recordIndex = $(this).index();
    console.log(recordIndex);

    let productId = $(this).find(".pro_id").text();
    let productName = $(this).find(".pro_name").text();
    let productType = $(this).find(".pro_type").text();
    let productQty = $(this).find(".pro_qty").text();
    let productPrice = $(this).find(".pro_price").text();

    $("#pro-custom-id").val(productId);
    $("#pro-custom-name").val(productName);
    $("#pro-custom-type").val(productType);
    $("#pro-custom-qty").val(productQty);
    $("#pro-custom-price").val(productPrice);
});

$("#product-update-btn").on('click', () => {
    var productId = $('#pro-custom-id').val();
    var productName = $('#pro-custom-name').val();
    var productType = $('#pro-custom-type').val();
    var productQty = $('#pro-custom-qty').val();
    var productPrice = $('#pro-custom-price').val();

    let proObj = products[recordIndex];
    proObj.proId = productId;
    proObj.proName = productName;
    proObj.proType = productType;
    proObj.proQty = productQty;
    proObj.proPrice = productPrice;

    loadTableProduct();
    clearFields();
});

$('#product-delete-btn').on('click', () => {
    products.splice(recordIndex, 1);
    loadTableProduct();
    totalProducts();
    clearFields();
});

$('#product-clear-btn').on('click', () => {
    clearFields();
});

function clearFields() {
    $('#pro-custom-id').val("");
    $('#pro-custom-name').val("");
    $('#pro-custom-type').val("");
    $('#pro-custom-qty').val("");
    $('#pro-custom-price').val("");
}

function totalProducts() {
    var totalProduct = products.length;
    console.log(totalProduct);
    $('#productCount').text(totalProduct);
}
