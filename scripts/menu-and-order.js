function init() {
    loadJSON(function (response) {
        let actual_JSON = JSON.parse(response);
        let data = actual_JSON.data;
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
                if(htmlView!==undefined){
                    articleWrap = articleWrap + htmlView
                }
            } else {
                if(htmlView){
                    strHml = strHml + `<div class="tab-content active" id="tab-${tabCount}">` + articleWrap + "</div>";
                    articleWrap = "";
                }

            }

        })
        document.getElementById("pizza-widget").innerHTML = strHml;


    });


}

init();


function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../db/menuitem.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
