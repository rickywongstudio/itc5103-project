// Iterate through the orders and create an HTML element for each order
const sizeOptions = [
    {value: "0", text: ""},
    { value: "2", text: "Small" },
    { value: "3", text: "Medium" },
    { value: "4", text: "Large" },
    { value: "20", text: '18" Jumbo' },
    { value: "21", text: '21" X 15" Party' },
];

const pizzaSizePrices = {
    "2": 1,    // Small - 100% of base price
    "3": 1.25, // Medium - 125% of base price
    "4": 1.5,  // Large - 150% of base price
    "20": 2,   // 18" Jumbo - 200% of base price
    "21": 2.5, // 21" X 15" Party - 250% of base price
};

document.getElementById('card1').onkeydown = function () {
    if (this.value.length == this.maxLength)
        document.getElementById('card2').focus();
}
document.getElementById('card2').onkeydown = function () {
    if (this.value.length == this.maxLength)
        document.getElementById('card3').focus();
}
document.getElementById('card3').onkeydown = function () {
    if (this.value.length == this.maxLength)
        document.getElementById('card4').focus();
}

// Get the orders data from local storage
const ordersData = localStorage.getItem('orders');

// Parse the JSON string into a JavaScript array of objects
const orders = JSON.parse(ordersData);

// Get a reference to the .orders div container
const ordersContainer = document.querySelector('.orders');
const cartTotal = document.querySelector('.summary-and-total');


orders.forEach(order => {
    const orderElement = document.createElement('div');
    const sizePrice = order.size && pizzaSizePrices[order.size] || 1;
    const itemTotal = (order.quantity * order.price * sizePrice).toFixed(2);
    orderElement.classList.add('order-item');

    const sizeText = order.size ? `${sizeOptions.find(sizeOption => sizeOption.value === order.size).text} ` : '';

    orderElement.innerHTML = `
        <h3 style="display:inline;"><span>${order.quantity}</span> &#215; ${sizeText}${order.name}</h3>
        <span class="item-total" style="float:right;">$${itemTotal}</span>
    `;

    ordersContainer.appendChild(orderElement);

});


const totalPrice = orders.reduce((total, order) => {
    const sizePrice = order.size && pizzaSizePrices[order.size] || 1;
    const itemTotal = order.quantity * order.price * sizePrice;
    return total + itemTotal;
}, 0);



const grandTotal = (totalPrice * 1.13).toFixed(2);
const grandTotalSpan = document.createElement('h3');
grandTotalSpan.style.float = 'right';
grandTotalSpan.innerHTML = `Grand Total (with tax): $${grandTotal}`;


cartTotal.appendChild(grandTotalSpan)
