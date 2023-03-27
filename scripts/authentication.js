
usrNm = localStorage.getItem("usrName");
    if (!usrNm || usrNm===undefined) {
        window.location.href = "../membership/sign-in.html";
    }



function signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("usrName");
    window.location.href = "../membership/sign-in.html"
}

// console.log("Loggined")
// isAuthorized_Loggedin();