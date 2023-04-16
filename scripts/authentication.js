$(document).ready(() => {
    let userName = localStorage.getItem("usrName");

    // member UI
    const memberHTML = `<a onclick="authentication()">LOGOUT <i class=\"fas\" style=\"font-size:16px\">&#xf2f5;</i></a>`;
    const cartHTML = `<br><a href="../ordering/order-cart.html">CART <i class='fas' style='font-size:16px'>&#xf07a;</i></a>`;
    const profileHTML = `<br><a href="../membership/profile.html">PROFILE</a>`;

    // non-member UI
    const nonMemberHTML = `<a onclick=\"authentication()\">LOGIN <i class=\"fas\" style=\"font-size:16px\">&#xf2f6;</i></a>`;
    const currentPage = window.location.pathname.split('/').pop();




    if (userName) {

        if (currentPage === 'index.html') {
            document.getElementById("loginId").innerHTML = memberHTML;
            document.getElementById("loginId").insertAdjacentHTML('beforeend', `<br><a href="ordering/order-cart.html">CART <i class='fas' style='font-size:16px'>&#xf07a;</i></a>`);
            document.getElementById("loginId").insertAdjacentHTML('beforeend', `<br><a href="membership/profile.html">PROFILE</a>`);

            document.getElementById("login").innerHTML = memberHTML;
            document.getElementById("login").insertAdjacentHTML('beforeend', `<br><a href="ordering/order-cart.html">CART <i class='fas' style='font-size:16px'>&#xf07a;</i></a>`);
            document.getElementById("login").insertAdjacentHTML('beforeend', `<br><a href="membership/profile.html">PROFILE</a>`);
            return;
        }

        document.getElementById("loginId").innerHTML = memberHTML;
        document.getElementById("loginId").insertAdjacentHTML('beforeend', cartHTML);
        document.getElementById("loginId").insertAdjacentHTML('beforeend', profileHTML);

        document.getElementById("login").innerHTML = memberHTML;
        document.getElementById("login").insertAdjacentHTML('beforeend', cartHTML);
        document.getElementById("login").insertAdjacentHTML('beforeend', profileHTML);


    } else {
        document.getElementById("loginId").innerHTML = nonMemberHTML;
        document.getElementById("login").innerHTML = nonMemberHTML;

        if (currentPage === 'index.html') {
            console.log(currentPage);
            document.getElementById("loginId").innerHTML = `<a onclick=\"authentication('index')\">LOGIN <i class=\"fas\" style=\"font-size:16px\">&#xf2f6;</i></a>`;
            document.getElementById("login").innerHTML = `<a onclick=\"authentication('index')\">LOGIN <i class=\"fas\" style=\"font-size:16px\">&#xf2f6;</i></a>`;

        }
    }

});


function authentication(arg) {
    let userName = localStorage.getItem("usrName");
    if (userName) {
        localStorage.removeItem("usrName");
        localStorage.removeItem("orders");
        alert("User successfully logout")
        location.reload();
        // document.getElementById("loginId").innerHTML = "<a onclick=\"authentication()\">LOGIN <i class=\"fas\" style=\"font-size:16px\">&#xf2f6;</i></a>";
        // document.getElementById("login").innerHTML = "<a onclick=\"authentication()\">LOGIN <i class=\"fas\" style=\"font-size:16px\">&#xf2f6;</i></a>";
    } else {
        if (!arg) location.href = "../membership/sign-in.html";
        else location.href = "membership/sign-in.html";


    }
}

