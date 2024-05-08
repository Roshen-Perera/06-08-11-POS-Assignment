import {products} from "../db/DB.js";

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

    let product = {
        proId: productId,
        proName: productName,
        proType: productType,
        proQty: productQty,
        proPrice: productPrice
    }

    products.push(product)
    loadTableproduct();
    console.log(products);
});

function loadTableproduct(){
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
    let index = $(this).index();
    console.log(index);

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

$('#product-delete-btn').on('click', () => {
    products.splice(recordIndex, 1);
    loadTableproduct();
});