'use strict';

// Tab switching
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const tabId = tab.dataset.tab;
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("active");
        });
        document.querySelector(`#${tabId}`).classList.add("active");
    });
});




// Filtering widget expansion toggle
const link = document.querySelector('.widget-link');
const container = document.querySelector('.options-container');

link.addEventListener('click', (event) => {
    event.preventDefault();
    container.classList.toggle('expanded');
});





// Ordering Switch Content
const addButton = document.querySelector('.menu-item-order-btn');
const toggleSection1 = document.querySelector('.content-switch-tab');
const toggleSection2 = document.querySelector('.content-switch-tab.hidden');
const cancelBtn = document.querySelector('.to-cart-cancel');
const parentMenuitem = toggleSection1.parentElement.parentElement

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSection1.classList.add('hidden');
    parentMenuitem.style.height = "fit-content";
    toggleSection2.classList.remove('hidden');
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSection2.classList.add('hidden');
    parentMenuitem.style.height = "";
    toggleSection1.classList.remove('hidden');
});
//     $('.menu-item-order-btn').click(function {
//         $('.content-switch-tab').addClass('hidden');
//         $('.content-switch-tab.hidden').removeClass('hidden');
//         $(this).closest('.content-swtich').parent().css("height","fit-content");
//     })