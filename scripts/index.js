"use strict";
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

///////////////////////////////////////
// MODAL WINDOW
function setupModal() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const btnCloseModal = document.querySelector(".close-modal");
    const btnsOpenModal = document.querySelectorAll(".show-modal");

    const openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    };

    const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    };


    for (let i = 0; i < btnsOpenModal.length; i++) {
        btnsOpenModal[i].addEventListener("click", openModal);
    }

    btnCloseModal.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });
}



///////////////////////////////////////
// Slider
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 2;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${500 * (i - slide)}px)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(curSlide);
        createDots();

        activateDot(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};

function setup() {
    const toggle = document.querySelector(".nav-dropdown-toggle");
    const menu = document.querySelector(".nav-dropdown-menu");
    addMobileMenu(toggle, menu);
    setupModal();
    slider();
    const screenSize = window.matchMedia("(min-width: 540px)");
    screenSize.addEventListener("change", () => switchHeaderView(screenSize, menu));
}

setup();

