const loginForm = document.getElementById("form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwordId").value;

    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }


    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        alert("User Not found please Signup!")
        return;
    }


    if (user.email === email && user.password === password) {
        window.location.href = '../index.html';
        localStorage.setItem("usrName",email)
        alert("Login successful");
    } else {
        alert("User credentials are not correct ");
    }

});
