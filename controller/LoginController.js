import {users} from "../db/DB.js";

$('#login-btn').click(function(e) {
    // e.preventDefault();

    // var loginUsername = $('#login-custom-user').val();
    // var loginPassword = $('#login-custom-pw').val();

    // console.log("Username:", loginUsername);
    // console.log("Password:", loginPassword);

    // if (loginUsername === '' || loginPassword === '') {
    //     alert("Please enter username and password");
    //     console.log("Empty fields detected");
    //     return;
    // }

    // var user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    // if (user) {
        alert('Login successful');
        $("#navigation").css({ display: "block" });
        $("#login-page").css({ display: "none" });
        $("#register-page").css({ display: "none" });
        $("#dashboard-page").css({ display: "block" });
        $("#customer-page").css({ display: "none" });
        $("#product-page").css({ display: "none" });
        $("#order-page").css({ display: "none" });
        $("#neworder-page").css({ display: "none" });
    // } else {
    //     alert('Invalid username or password');
    // }
});
