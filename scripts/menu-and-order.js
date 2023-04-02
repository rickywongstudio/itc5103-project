"use strict";
const widgetLink = document.querySelector('.widget-link');
const container = document.querySelector('.options-container');
const tabs = document.querySelectorAll(".tab");
const checkboxes = document.querySelectorAll(".form-check-input");
const menuContainer = document.getElementById('menu-container');

let menuItems;
let filteredItems;
let selectedCategory = "";
let selectedDietaryNeeds = [];

async function fetchMenuItems() {
    const response = await fetch('../db/menuItems.json');
    const menuItems = await response.json();
    return menuItems.data;
}

function createMenuItem(item) {
    // item img, name, text
    const menuItem = document.createElement("article");
    menuItem.className = "menu-item";

    const menuItemImg = document.createElement("div");
    menuItemImg.className = "menu-item-img";
    const img = document.createElement("img");
    img.alt = item.name;
    img.src = item.imgUrl;
    menuItemImg.appendChild(img);

    const menuItemText = document.createElement("div");
    menuItemText.className = "menu-item-text";
    const h2 = document.createElement("h2");
    h2.textContent = item.name;
    const p = document.createElement("p");
    p.textContent = item.ingredient.length > 0 ? item.ingredient.join(", ") : item.description;
    menuItemText.appendChild(h2);
    menuItemText.appendChild(p);

    menuItem.appendChild(menuItemImg);
    menuItem.appendChild(menuItemText);

    // item addToCartBtn, form
    const contentSwitch = document.createElement('div');
    contentSwitch.className = 'content-switch';

    const contentSwitchTab1 = document.createElement('section');
    contentSwitchTab1.className = 'content-switch-tab';

    const addToOrderBtn = document.createElement('a');
    addToOrderBtn.className = 'menu-item-order-btn';
    addToOrderBtn.textContent = 'ADD TO ORDER';

    const contentSwitchTab2 = document.createElement('section');
    contentSwitchTab2.className = 'content-switch-tab order-form hidden';

    const formToCart = document.createElement('form');
    formToCart.className = 'form-to-cart';
    formToCart.innerHTML = `
        <fieldset class="price-display-container">
            <span class="price-display">$<span class="price-display-target">${item.price}</span></span>
        </fieldset>
    `;

    if (item.category === 'pizza') {
        formToCart.innerHTML += `
            <fieldset class="to-cart-fields">
                <div class="field-container size-container select-parent">
                    <label for="size">Select size</label>
                    <select autocomplete="off" class="select-size" name="size">
                        <option class="placeholder" disabled="disabled" selected="selected" value="">
                            Select size
                        </option>
                        <option value="2">Small</option>
                        <option value="3">Medium</option>
                        <option value="4">Large</option>
                        <option value="20">18" Jumbo</option>
                        <option value="21">21" X 15" Party</option>
                    </select>
                </div>
            </fieldset>
        `;
    }

    const quantityContainer = document.createElement("div");
    quantityContainer.className = "field-container quantity-container select-parent";

    const quantityLabel = document.createElement("label");
    quantityLabel.setAttribute("for", "quantity");
    quantityLabel.textContent = "Quantity";
    quantityContainer.appendChild(quantityLabel);

    const quantitySelect = document.createElement("select");
    quantitySelect.setAttribute("autocomplete", "off");
    quantitySelect.className = "select-quantity";
    quantitySelect.name = "quantity";
    quantityContainer.appendChild(quantitySelect);

    const quantityOptions = [
        { value: "", text: "Select quantity", disabled: true, selected: true },
        ...Array.from({ length: 10 }, (_, i) => ({
            value: i + 1,
            text: (i + 1).toString(),
            disabled: false,
            selected: false,
        })),
    ];

    quantityOptions.forEach(({ value, text, disabled, selected }) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        option.disabled = disabled;
        option.selected = selected;
        quantitySelect.appendChild(option);
    });


    const formActions = document.createElement("fieldset");
    formActions.className = "form-actions";

    const addToOrderInput = document.createElement("input");
    addToOrderInput.className = "to-cart-add";
    addToOrderInput.type = "submit";
    addToOrderInput.value = "ADD TO CART";

    const cancelButton = document.createElement('a');
    cancelButton.className = 'to-cart-cancel';
    cancelButton.textContent = 'Cancel';

    formActions.appendChild(addToOrderInput);
    formActions.appendChild(cancelButton);
    formToCart.appendChild(quantityContainer);
    formToCart.appendChild(formActions);
    contentSwitchTab2.appendChild(formToCart);
    contentSwitchTab1.appendChild(addToOrderBtn);
    contentSwitch.appendChild(contentSwitchTab1);
    contentSwitch.appendChild(contentSwitchTab2);
    menuItem.appendChild(contentSwitch);

    // event listener
    addToOrderBtn.addEventListener('click', () => {
        contentSwitchTab2.classList.remove('hidden');
        contentSwitch.classList.add('shift-left');
    });

    // Add event listener to the cancel button
    cancelButton.addEventListener('click', () => {
        contentSwitch.classList.remove('shift-left');

        setTimeout(() => {
            contentSwitchTab2.classList.add('hidden');
        }, 300);
    });


    return menuItem;
}

function filterMenuItems(menuItems, category, dietaryNeeds) {
    let filteredItems = menuItems;

    if (category) {
        filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (dietaryNeeds.length > 0) {
        filteredItems = filteredItems.filter(item => dietaryNeeds.every(need => item.dietaryOption.includes(need)));
    }

    return filteredItems;
}


function displayMenuItems(items) {
    menuContainer.innerHTML = '';
    items.forEach(item => {
        const menuItem = createMenuItem(item);
        menuContainer.appendChild(menuItem);
    });
}

function filterAndUpdateItems() {
    filteredItems = filterMenuItems(menuItems, selectedCategory, selectedDietaryNeeds);
    displayMenuItems(filteredItems);
}

async function renderMenu() {
    menuItems = await fetchMenuItems();
    displayMenuItems(menuItems);
}

async function init() {

    renderMenu();

    // Reset all checkboxes
    $(function () {
        $('input[type=checkbox]').prop("checked", false);
    });

    // Event listeners
    // Filtering widget expansion toggle
    widgetLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.toggle('expanded');
    });

    // Tab
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            selectedCategory = tab.dataset.category;
            filterAndUpdateItems();
        });
    })

    // Checkbox
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            selectedDietaryNeeds = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.value);
            filterAndUpdateItems();
        });
    });
}

// Call the init function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', init);


