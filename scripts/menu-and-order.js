// script for tab function
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