import ProductModel from "/model/ProductModel.js";
import {products} from "/db/DB.js";

var recordIndex = undefined;

$('#product-add-btn').on('click', () => {
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
});

function loadTableProduct(){
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
    $('#countProduct').text(totalProduct);
}
