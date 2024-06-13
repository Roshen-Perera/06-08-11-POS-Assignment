import {users} from "../db/DB.js";

$('#reg-btn').click(function(e) {
    e.preventDefault();
    var username = $('#reg-custom-user').val();
    var emailAddress = $('#reg-custom-email').val();
    var password = $('#reg-custom-pw').val();

    if (username === "" && emailAddress === "" && password === "") {
        alert("Please enter Details");
        console.log("Empty fields detected");
        return false;
    }
    // Check if username is already taken
    if (users.find(user => user.username === username)) {
        alert("Username already exists");
        return;
    }

    let user = {
        username: username,
        emailAddress: emailAddress,
        password: password
    }

    users.push(user);
    console.log(users)
    alert("User added successfully")
});