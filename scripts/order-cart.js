let orders = [];

function loadingItemsToCart() {
    orders = JSON.parse(localStorage.getItem("orders"));
    if (!orders || orders.length === 0) {
        return
    }
    document.getElementById("noOfOrders").innerHTML = "(" + orders.length + " Items)";
    let tbody = document.getElementById("orderItems");
    if (tbody.hasChildNodes()) {
        tbody.innerHTML = '';
    }
    orders.forEach(item => {
        const tableRow = document.createElement("tr");
        const tabledata1 = document.createElement("td");
        const imgDiv = document.createElement("div");
        const img = document.createElement("img");
        img.src = item.img;
        img.className = "rounded float-start img-styles";
        const itemDiv = document.createElement("div")
        const itemName = document.createElement("p")
        itemName.className = "item-name";
        itemName.innerHTML = item.name;
        imgDiv.appendChild(img);
        itemDiv.appendChild(itemName)
        tabledata1.appendChild(imgDiv)
        tabledata1.appendChild(itemDiv)
        tableRow.appendChild(tabledata1);
        const tabledata2 = document.createElement("td")
        tabledata2.innerHTML = "$" + item.price;
        tableRow.appendChild(tabledata2);
        const tabledata3 = document.createElement("td")
        tabledata3.innerHTML = item.size ? getPizzaSize(item.size) : "-";
        tableRow.appendChild(tabledata3);
        const tabledata4 = document.createElement("td");
        const quatityDiv = document.createElement("div");
        quatityDiv.className = "item-quantity";
        const minusButton = document.createElement("button");
        minusButton.className = "minus-btn";
        minusButton.innerHTML = "-";
        const quatityButton = document.createElement("button");
        quatityButton.className = "quantity-input";
        quatityButton.innerHTML = item.quantity
        const plusButton = document.createElement("button");
        plusButton.className = "plus-btn";
        plusButton.innerHTML = "+";
        tabledata4.className = "item-quantity";
        quatityDiv.appendChild(minusButton);
        quatityDiv.appendChild(quatityButton);
        quatityDiv.appendChild(plusButton);
        tabledata4.appendChild(quatityDiv);
        tableRow.appendChild(tabledata4);
        const tabledata5 = document.createElement("td")
        tabledata5.innerHTML = "$" + parseInt(item.price) * parseInt(item.quantity);
        tableRow.appendChild(tabledata5);
        const tabledata6 = document.createElement("td")
        const removeImg = document.createElement("img")
        removeImg.src = "../media/remove-bin-delete-trash-svgrepo-com.svg";
        removeImg.className = "rounded float-start rmImg-styles";
        tabledata6.appendChild(removeImg);
        tableRow.appendChild(tabledata6);
        removeImg.addEventListener('click', () => {
            removeOrder(item)
        });
        minusButton.addEventListener("click", () => {
            decreaseQuantity(item);
        });
        plusButton.addEventListener("click", () => {
            increaseQuantity(item)
        });
        tbody.appendChild(tableRow);
    })

    loadPrice();
}

function loadPrice() {
    let subTotal = 0;
    let tax = 0;
    orders.forEach(item => {
            subTotal += parseFloat(item.price) * parseFloat(item.quantity);
        }
    )

    tax = subTotal * 0.13;
    let grandTotal = subTotal + tax;
    document.getElementById("subTotal").innerHTML = "$" + subTotal;
    document.getElementById("salesTax").innerHTML = "$" + tax.toFixed(2);
    document.getElementById("grandTotal").innerHTML = "$" + grandTotal.toFixed(2);
}

function removeOrder(item) {
    orders.forEach((x, i) => {
        if (item.name === x.name) {
            orders.splice(i, 1);
        }
    })

    localStorage.setItem("orders", JSON.stringify(orders));
    if (orders.length > 0) {
        loadingItemsToCart();
    } else {
        location.reload();
    }

}

$(document).ready(function () {
    let isUserLoggined = localStorage.getItem("usrName");
    if (!isUserLoggined || isUserLoggined === undefined) {
        alert("Please sign-in to our website, to view your orders");
        return;
    } else {
        loadingItemsToCart();
    }
});

function decreaseQuantity(item) {
    let orders = JSON.parse(localStorage.getItem("orders"));
    orders.forEach((x, i) => {

        if (item.size && item.name === x.name && item.size === x.size && x.quantity > 1) {
            x.quantity -= 1;
        } else if (!item.size && item.name === x.name && x.quantity > 1) {
            x.quantity -= 1;
        }

    })
    localStorage.setItem("orders", JSON.stringify(orders));
    loadingItemsToCart();
}

function increaseQuantity(item) {
    let orders = JSON.parse(localStorage.getItem("orders"));
    orders.forEach((x, i) => {
        if (item.size && item.name === x.name && item.size === x.size) {
            x.quantity += 1;
        } else if (!item.size && item.name === x.name) {
            x.quantity += 1;
        }
    })
    localStorage.setItem("orders", JSON.stringify(orders));
    loadingItemsToCart();
}


function getPizzaSize(size) {
    const pizzaSizePrices = {
        "0": "-",
        "2": "Small",
        "3": "Medium",
        "4": "Large",
        "20": "18 Jumbo",
        "21": "21 X 15 Party",
    };
    return pizzaSizePrices[size] ? pizzaSizePrices[size] : pizzaSizePrices["2"];
}


