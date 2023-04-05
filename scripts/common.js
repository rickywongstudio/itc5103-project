function mobileMenuToggling(toggle, menu) {
    $(document).ready(function () {
        $(toggle).click(function (e) {
            e.stopImmediatePropagation();
            $(menu).toggle(function () {
                $(this).animate();
            });
        });
    });
}

function switchMobileHeader(screenSize, menu) {
    if (screenSize.matches) menu.style.display = "none";
}

function insertHeaderAndFooter() {
    return new Promise((resolve, reject) => {
        $(function () {
            $("#header").load("../common/header.html", function () {
                $("#footer").load("../common/footer.html", function () {
                    resolve();
                });
            });
        });
    });
}

async function setup() {
    await insertHeaderAndFooter();
    const toggle = document.querySelector(".nav-dropdown-toggle");
    const menu = document.querySelector(".nav-dropdown-menu");
    mobileMenuToggling(toggle, menu);
    const screenSize = window.matchMedia("(min-width: 540px)");
    screenSize.addEventListener("change", () => switchMobileHeader(screenSize, menu));
}

setup();

