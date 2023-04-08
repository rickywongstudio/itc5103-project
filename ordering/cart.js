// Get the elements
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const quantityInput = document.querySelector(".quantity-input");

// Add click event listeners to the buttons
minusBtn.addEventListener("click", decreaseQuantity);
plusBtn.addEventListener("click", increaseQuantity);


console.log("JS ")

//Item loading to cart
function loadingItemsToCart(){
    let orderItems=localStorage.getItem("orders")
}


$(document).ready(function (){
    console.log("Hi there")
})
// Define the functions
function decreaseQuantity() {
    let quantity = parseInt(quantityInput.innerHTML);
    if (quantity > 0) {
        quantity--;
        quantityInput.innerHTML = quantity;
    }
}

function increaseQuantity() {
    let quantity = parseInt(quantityInput.innerHTML);
    quantity++;
    quantityInput.innerHTML = quantity;
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
