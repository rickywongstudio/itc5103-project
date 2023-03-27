// const onSubmit = (event) => {
//     console.log(JSON.stringify(event))
//     event.preventDefault();
//     let formData = document.getElementsByName("sign-up-form");
//
//
//     // return false;
// }

const loginForm = document.getElementById("sign-up");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const date = document.getElementById("date").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    console.log(email)

    if (!firstName || !lastName || !date || !city || !confirmPassword || !email || !password) {
        alert('Please fill in all the fields.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        date: date,
        city: city,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    alert("User Sign-Up Successfully");

    window.location.href = '../membership/sign-in.html';
});
