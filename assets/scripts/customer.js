
var customers = [];

$('#customer-add-btn').on('click', () => {
    var customerId = $('#cus-custom-id').val();
    var customerName = $('#cus-custom-user').val();
    var customerAddress = $('#cus-custom-address').val();
    var customerEmail = $('#cus-custom-email').val();

    var record = `<tr>
                            <td scope="row">${customerId}</td>     
                            <td>${customerName}</td>
                            <td>${customerAddress}</td>     
                            <td>${customerEmail}</td>
                        </tr>`
    $('#customer-table').append(record);

    let customer = {
        cusId: customerId,
        cusName: customerName,
        cusAddress: customerAddress,
        cusEmail: customerEmail
    }

    customers.push(customer)
    loadTableCustomer();
    console.log(customers);
});

function loadTableCustomer(){
    $('#customer-table').empty();
    customers.map((item, index) =>{
        let record = `<tr>
                            <td scope="row">${item.cusId}</td>     
                            <td>${item.cusName}</td>
                            <td>${item.cusAddress}</td>     
                            <td>${item.cusEmail}</td>
                        </tr>`
        $('#customer-table').append(record);
    });
}
