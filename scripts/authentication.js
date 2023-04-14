$(document).ready(() => {
    let userName = localStorage.getItem("usrName");
    if (userName) {
        document.getElementById("loginId").innerHTML = "Logout";
        document.getElementById("login").innerHTML = "Logout";
    } else {
        document.getElementById("loginId").innerHTML = "Login";
        document.getElementById("login").innerHTML = "Login";
    }
});

function authentication(arg) {
    let userName = localStorage.getItem("usrName");
    if (userName) {
        localStorage.removeItem("usrName");
        localStorage.removeItem("orders");
        alert("User successfully logout")
        document.getElementById("loginId").innerHTML = "Login"
        document.getElementById("login").innerHTML = "Login"
    } else {
        if (!arg) location.href = "../membership/sign-in.html";
        else location.href = "membership/sign-in.html";


    }
}