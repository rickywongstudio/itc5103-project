'use strict';
const loadData = (actual_JSON) => {
    let data = actual_JSON.data;
    let htmlTemp = "";

    data.forEach((x, i) => {
        htmlTemp += `  <article class="menu-item">
                <div class="menu-item-img">
                    <img alt="Hawaiian Pizza" src="${x.imgUrl}"/>
                </div>
                <div class="menu-item-text">
                    <h2>${x.name}</h2>
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

    });

    document.getElementById("tab-1").innerHTML = htmlTemp;
    console.log(htmlTemp)

}
fetch("../db/menuitem.json")
    .then(response => response.json())
    .then(json => loadData(json));
// Tab switching
// const tabs = document.querySelectorAll(".tab");
// const tabContents = document.querySelectorAll(".tab-content");
// tabs.forEach((tab) => {
//     tab.addEventListener("click", () => {
//         const tabId = tab.dataset.tab;
//         tabContents.forEach((tabContent) => {
//             tabContent.classList.remove("active");
//         });
//         document.querySelector(`#${tabId}`).classList.add("active");
//     });
// });


// Filtering widget expansion toggle
const link = document.querySelector('.widget-link');
const container = document.querySelector('.options-container');

link.addEventListener('click', (event) => {
    event.preventDefault();
    container.classList.toggle('expanded');
});


// // Ordering Switch Content
const addButton = document.querySelector('.menu-item-order-btn');
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
// $('.menu-item-order-btn').click(function {
//     $('.content-switch-tab').addClass('hidden');
//     $('.content-switch-tab.hidden').removeClass('hidden');
//     $(this).closest('.content-swtich').parent().css("height","fit-content");
// })




function init() {
    loadJSON(function (response) {
        let actual_JSON = JSON.parse(response);
        let data = actual_JSON.data;
        console.log(data)
        let strHml;
        let tabCount = 1;
        let articleWrap = "";
        data.forEach((x, i) => {
            if (i !== 0 && i % 4 === 0) {
                tabCount += 1;
            }
            let htmlView = `
      <article class="menu-item">
        <div class="menu-item-img">
          <img src="${x.imgUrl}" alt="Hawaiian Pizza" />
        </div>
        <div class="menu-item-text">
          <h2>${x.name}</h2>
          <p>${x.ingredient}</p>
          <p>${x.price}</p>
        </div>
      </article>`

            if (i === 0 || i % 4 !== 0) {
                if (htmlView !== undefined) {
                    articleWrap = articleWrap + htmlView
                }
            } else {
                if (htmlView) {
                    strHml = strHml + `<div class="tab-content active" id="tab-${tabCount}">` + articleWrap + "</div>";
                    articleWrap = "";
                }
            }

        })
        // document.getElementById("pizza-widget").innerHTML = strHml;
        console.log(strHml)

    });


}

// init();
//
//
// function loadJSON(callback) {
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', '../db/menuitem.json', true);
//     xobj.onreadystatechange = function () {
//         if (xobj.readyState === 4 && xobj.status === "200") {
//             callback(xobj.responseText);
//         }
//     };
//     xobj.send(null);
// }