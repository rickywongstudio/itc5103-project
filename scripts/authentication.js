
    let uName = localStorage.getItem("uName");
    if (!uName || uName==undefined) {
        window.location.href = "../membership/sign-in.html";
    }



function signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("uName");
    window.location.href = "../membership/sign-in.html"
}

// console.log("Loggined")
// isAuthorized_Loggedin();