const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwordId").value;

    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }

    const user = {
        email: email,
        password: password
    };

    const userName = localStorage.getItem(email);
    const usrPassword = localStorage.getItem(password)

    if (userName === email && password === usrPassword) {
        alert("Login successful");
    } else {
        alert("User credentials are not correct ");
    }

});
