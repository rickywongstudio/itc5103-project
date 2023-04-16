"use strict";
const widgetLink = document.querySelector('.widget-link');
const container = document.querySelector('.options-container');
const tabs = document.querySelectorAll(".tab");
const checkboxes = document.querySelectorAll(".form-check-input");
const menuContainer = document.getElementById('menu-container');


let menuItems;
let selectedCategory = "";
let selectedDietaryNeeds = [];
let orders = [];
const pizzaSizePrices = {
    "2": 1,    // Small - 100% of base price
    "3": 1.25, // Medium - 125% of base price
    "4": 1.5,  // Large - 150% of base price
    "20": 2,   // 18" Jumbo - 200% of base price
    "21": 2.5, // 21" X 15" Party - 250% of base price
};

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
    formToCart.id = "formToCart";
    formToCart.className = 'form-to-cart';
    formToCart.innerHTML = `
        <fieldset class="price-display-container">
            <span class="price-display">$<span id="price-display" class="price-display-target">${item.price + ".00"}</span></span>
        </fieldset>
    `;

    const fieldset = document.createElement("fieldset");
    fieldset.className = "to-cart-fields";

    if (item.category === 'pizza') {

        const sizeContainer = document.createElement("div");
        sizeContainer.className = "field-container size-container select-parent";

        const sizeLabel = document.createElement("label");
        sizeLabel.setAttribute("for", "size");
        sizeLabel.textContent = "Select size";
        sizeContainer.appendChild(sizeLabel);

        const sizeSelect = document.createElement("select");
        sizeSelect.setAttribute("autocomplete", "off");
        sizeSelect.className = "select-size";
        sizeSelect.id = "select-size";
        sizeSelect.name = "size";

        const sizeOptions = [
            {value: "", text: "Select size", disabled: true, selected: true},
            {value: "2", text: "Small", disabled: false, selected: false},
            {value: "3", text: "Medium", disabled: false, selected: false},
            {value: "4", text: "Large", disabled: false, selected: false},
            {value: "20", text: '18" Jumbo', disabled: false, selected: false},
            {value: "21", text: '21" X 15" Party', disabled: false, selected: false},
        ];

        sizeOptions.forEach(({value, text, disabled, selected}) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = text;
            option.disabled = disabled;
            option.selected = selected;
            sizeSelect.appendChild(option);
        });

        sizeContainer.appendChild(sizeSelect);
        fieldset.appendChild(sizeContainer);
        formToCart.appendChild(fieldset);
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
        {value: "", text: "Select quantity", disabled: true, selected: true},
        ...Array.from({length: 10}, (_, i) => ({
            value: i + 1,
            text: (i + 1).toString(),
            disabled: false,
            selected: false,
        })),
    ];

    quantityOptions.forEach(({value, text, disabled, selected}) => {
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
    addToOrderInput.type = "button";
    addToOrderInput.value = "ADD TO CART";

    const cancelButton = document.createElement('a');
    cancelButton.className = 'to-cart-cancel';
    cancelButton.textContent = 'Cancel';

    formActions.appendChild(addToOrderInput);
    formActions.appendChild(cancelButton);
    fieldset.appendChild(quantityContainer);
    formToCart.append(fieldset);
    formToCart.appendChild(formActions);
    contentSwitchTab2.appendChild(formToCart);
    contentSwitchTab1.appendChild(addToOrderBtn);
    contentSwitch.appendChild(contentSwitchTab1);
    contentSwitch.appendChild(contentSwitchTab2);
    menuItem.appendChild(contentSwitch);

    // Event listener to order btn
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


    // Event listener to the price calculation
    quantitySelect.addEventListener("change", () => updatePrice(formToCart, item, quantitySelect));
    if (item.category === "pizza") {
        const sizeSelect = formToCart.querySelector(".select-size");
        sizeSelect.addEventListener("change", () => updatePrice(formToCart, item, quantitySelect));
    }

    addToOrderInput.addEventListener('click', (e) => {
        e.preventDefault();
        let price = document.getElementById("price-display").innerHTML;
        const quantity = !quantitySelect.value ? 1 : quantitySelect.value;
        let sizeSel = formToCart.querySelector(".select-size");

        item.quantity = quantity;
        item.sellingPrice = price;
        if (item.category === "pizza") {
            item.selectedSize = sizeSel.value
        } else {
            item.selectedSize = "0";
        }

        onFormSubmit(e, item);
        // $('#formToCart')[0].reset();
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

function updatePrice(formToCart, item, quantitySelect) {
    let basePrice = item.price;
    let quantity = isNaN(parseInt(quantitySelect.value)) ? 1 : parseInt(quantitySelect.value);

    if (item.category === "pizza") {
        const sizeSelect = formToCart.querySelector(".select-size");
        const selectedSize = sizeSelect.value;
        const sizePercentage = pizzaSizePrices[selectedSize] || 1;
        basePrice = item.price * sizePercentage;
    }

    const totalPrice = basePrice * quantity;
    updatePriceDisplay(formToCart, totalPrice);
}

function updatePriceDisplay(formToCart, price) {
    const priceDisplayTarget = formToCart.querySelector(".price-display-target");
    priceDisplayTarget.textContent = price.toFixed(2);
}


async function init() {
    menuItems = await fetchMenuItems();
    displayMenuItems(menuItems);

    // Reset all checkboxes
    $(function () {
        $('input[type=checkbox]').prop("checked", false);
    });

    // Event listeners
    // Filtering widget expansion toggle
    widgetLink.addEventListener('click', (e) => {
        // e.preventDefault(); // BUG: causing mobile menu non-working
        container.classList.toggle('expanded');
    });

    // Tab
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            selectedCategory = tab.dataset.category;
            displayMenuItems(filterMenuItems(menuItems, selectedCategory, selectedDietaryNeeds));
        });
    })

    // Checkbox
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            selectedDietaryNeeds = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.value);
            displayMenuItems(filterMenuItems(menuItems, selectedCategory, selectedDietaryNeeds));
        });
    });
}

// Call the init function when the DOM content is loaded
$(document).ready(function () {
    init();
    let orderData = JSON.parse(localStorage.getItem("orders"));
    if (orderData && orderData.length > 0) {
        orderData.forEach(it => {
            orders.push(it);
        })
    }
})

const onFormSubmit = (e, item) => {
    let isUserLoggined = localStorage.getItem("usrName");
    if (!isUserLoggined || isUserLoggined === undefined) {
        alert("Inorder to process with your order, please sign to your website");
        return;
    }
    let isItemAlreadyExistInCart = 0;
    let obj;
    if (item.category === 'pizza') {
        item.price = item.price * pizzaSizePrices[item.selectedSize]
    }
    if (orders && orders.length > 0) {
        orders.forEach((order, i) => {
            //Added logic to increase the quantity for Pizza
            if (order.name === item.name && item.category !== "pizza") {
                isItemAlreadyExistInCart = 1;
                orders[i].quantity += parseInt(item.quantity);
            } else if ((item.category === "pizza" && order.size === item.selectedSize) && order.name === item.name) {
                console.log(item)
                isItemAlreadyExistInCart = 1;
                orders[i].quantity += parseInt(item.quantity);
            }

        })
    }
    if (!isItemAlreadyExistInCart) {
        obj = getItemObject(item.name, item.imgUrl, parseInt(item.quantity), item.category, item.price, item.selectedSize);
        orders.push(obj);
    }

    alert("Your order is successfully added to cart");
    localStorage.setItem("orders", JSON.stringify(orders));
    e.preventDefault();
}

function getItemObject(name, img, quantity, category, price, selectedSize) {

    const Item = {
        name: "",
        img: "",
        quantity: 0,
        category: "",
        price: 0.0,
        size: 0
    }
    Item.name = name;
    Item.img = img;
    Item.quantity = quantity;
    Item.category = category;
    Item.price = price;
    Item.size = selectedSize;
    return Item;
}

class OrderItem {
    name

    image
    quantity

    category

    price

    size


    constructor(name, image, quantity, category, price, size) {
        this.name = name;
        this.image = image;
        this.quantity = quantity;
        this.category = category;
        this.price = price;
        this.size = size;
    }
}
