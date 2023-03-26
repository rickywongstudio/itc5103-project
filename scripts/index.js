function addMobileMenu(toggle, menu) {
    // jQuery for the navbar-dropdown menu in Mobile view
    $(document).ready(function () {
        $(toggle).click(function () {
            $(menu).toggle(function () {
                $(this).animate();
            });
        });
    });
}

function switchHeaderView(screenSize, menu) {
    if (screenSize.matches) menu.style.display = "none";
}

function setup() {
    const toggle = document.querySelector(".nav-dropdown-toggle");
    const menu = document.querySelector(".nav-dropdown-menu");
    addMobileMenu(toggle, menu);
    const screenSize = window.matchMedia("(min-width: 540px)");
    screenSize.addEventListener("change", () => switchHeaderView(screenSize, menu));
}

setup();

