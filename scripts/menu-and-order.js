'use strict';

//Loading the json data dynamically
const loadData = () => {
    fetch("../db/menuitem.json")
        .then(response => response.json())
        .then(json => {
            loadTemplate(json, "rawData"), localStorage.setItem("menu_data", JSON.stringify(json.data))
        });
}

const loadTemplate = (jsonData, type) => {
    let data;
    let htmlTemp = ""
    let counter = 0;
    let wrapperHtml = ""
    if (type === "rawData") {
        data = jsonData.data
    } else {
        data = jsonData;
    }
    if (!data || data.length === 0) {
        document.getElementById("menu").innerHTML = "";
    } else {
        for (let i = 0; i < data.length; i++) {
            let x = data[i];


            htmlTemp += `<article class="menu-item">
                <div class="menu-item-img">
                    <img alt="Hawaiian Pizza" src="${x.imgUrl}"/>
                </div>
                <div class="menu-item-text">
                    <h2>${x.name}</h2><br>
                    <p>${x.ingredient}</p>
                </div>
                <div class="content-switch">
                    <section class="content-switch-tab">
                        <a class="menu-item-order-btn">ADD TO ORDER</a>
                    </section>
                    <section class="content-switch-tab hidden">
                        <form class="form-to-cart">
                            <fieldset class="price-display-container">
                                <span class="price-display">$<span class="price-display-target">${x.price}</span></span>
                            </fieldset>
                            <input name="pizza_name" type="hidden" value={$x.name}>
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
                                <div class="field-container quantity-container select-parent">
                                    <label for="quantity">Quantity</label>
                                    <select autocomplete="off" class="select-quantity" name="quantity">
                                        <option class="placeholder" disabled="disabled" value="">Select quantity
                                        </option>
                                        <option selected="selected" value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </fieldset>
                            <div class="calories-display-container"> 180 - 320 Calories/Slice</div>
                            <fieldset class="form-actions">
                                <input class="to-cart-add" type="submit" value="Add to order"/>
                                <a class="to-cart-cancel">Cancel</a>
                            </fieldset>
                        </form>
                    </section>
                </div>
            </article>`
            counter++;
            if (counter % 4 === 0) {
                wrapperHtml = wrapperHtml + `<div class="tab-content active" id="tab-${counter / 4}">` + htmlTemp + "</div>";
                htmlTemp = "";
            }
        }
        document.getElementById("menu").innerHTML = wrapperHtml;
    }


}

window.onload = loadData();

//Filter Menu Function
const filterMenu = () => {
    let filteredPizzaNames = [];
    let filteredPizza = [];
    let dataArray = JSON.parse(localStorage.getItem("menu_data"));
    let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let checkbox of markedCheckbox) {
        dataArray.forEach(x => {
            if (x.dietaryOption && x.dietaryOption.includes(checkbox.value) && !filteredPizzaNames.includes(x.name)) {
                filteredPizza.push(x);
                filteredPizzaNames.push(x.name);
            }
        })
    }
    if (!markedCheckbox || markedCheckbox.length === 0) {
        loadTemplate(dataArray);
    } else {
        loadTemplate(filteredPizza)
    }

}

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


// // // Ordering Switch Content
const addButton = document.querySelectorAll('.menu-item-order-btn');
const toggleSection1 = document.querySelector('.content-switch-tab');
const toggleSection2 = document.querySelector('.content-switch-tab.hidden');
const cancelBtn = document.querySelector('.to-cart-cancel');
const parentMenuitem = toggleSection1?.parentElement?.parentElement

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (toggleSection1) toggleSection1?.classList?.add('hidden');
    if (parentMenuitem) parentMenuitem.style.height = "fit-content";
    if (toggleSection2) toggleSection2?.classList?.remove('hidden');
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSection2.classList.add('hidden');
    parentMenuitem.style.height = "";
    toggleSection1.classList.remove('hidden');
});
$('.menu-item-order-btn').click(function () {
    $('.content-switch-tab').addClass('hidden');
    $('.content-switch-tab.hidden').removeClass('hidden');
    $(this).closest('.content-swtich').parent().css("height", "fit-content");
})


