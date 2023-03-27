function isAuthorized_Loggedin() {
    let uName = localStorage.key("uName");
    if (!uName) {
        window.location.href = "../membership/sign-in.html";
    }
}

console.log("Loggined")
isAuthorized_Loggedin();