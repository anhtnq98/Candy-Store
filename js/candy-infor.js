let listProduct = JSON.parse(localStorage.getItem("listProduct"));
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
let money = 0;
function renderProducts() {
    let result1 = '';
    let result2 = '';
    let result3 = '';
    for (let i = 0; i < listProduct.length; i++) {
        money = listProduct[i].price;
        let resultMoney = VND.format(money);
        if (listProduct[i].productGenre.includes("Kẹo dẻo")) {
            result1 +=
                `
            <div class="infor">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <img src="${listProduct[i].productImage}" alt="Avatar" style="width:200px;height:200px;">
                        <h5 class="s-h4">${listProduct[i].productName}</h5>
                        </div>
                        <div id = "s-candy" class="flip-card-back">
                            <p class="card-infor-title1">--- Tên sản phẩm: ---</p>
                            <p class="card-infor">${listProduct[i].productName}</p>
                            <p class="card-infor-title1">--- Mã sản phẩm: ---</p>
                            <p class="card-infor">${listProduct[i].productID}</p>
                            <p class="card-infor-title1">--- Xuất xứ: ---</p>
                            <p class="card-infor">${listProduct[i].madeIn}</p>
                            <p class="card-infor-title1">--- Giá tiền: ---</p>
                            <p class="card-infor">${resultMoney}</p>
                        </div>
                    </div>
                </div>
            </div>
    `
        }
        document.getElementById("soft-candy-infor").innerHTML = result1;
    }

    for (let j = 0; j < listProduct.length; j++) {
        money = listProduct[j].price;
        let resultMoney = VND.format(money);
        if (listProduct[j].productGenre.includes("Kẹo cứng")) {
            listProduct[j].quantity = 1;
            result2 +=
                `
            <div class="infor">
            <div class="flip-card">
            <div class="flip-card-inner">
            <div class="flip-card-front">
            <img src="${listProduct[j].productImage}" alt="Avatar" style="width:200px;height:200px;">
            <h5 class="h-h4">${listProduct[j].productName}</h5>
                        </div>
                        <div id ="h-candy" class="flip-card-back">
                            <p class="card-infor-title2">--- Tên sản phẩm: ---</p>
                            <p class="card-infor">${listProduct[j].productName}</p>
                            <p class="card-infor-title2">--- Mã sản phẩm: ---</p>
                            <p class="card-infor">${listProduct[j].productID}</p>
                            <p class="card-infor-title2">--- Xuất xứ: ---</p>
                            <p class="card-infor">${listProduct[j].madeIn}</p>
                            <p class="card-infor-title2">--- Giá tiền: ---</p>
                            <p class="card-infor">${resultMoney}</p>
                        </div>
                    </div>
                </div>
            </div>
    `
        }
        document.getElementById("hard-candy-infor").innerHTML = result2;
    }

    for (let k = 0; k < listProduct.length; k++) {
        money = listProduct[k].price;
        let resultMoney = VND.format(money);
        if (listProduct[k].productGenre.includes("Kẹo sô-cô-la")) {
            listProduct[k].quantity = 1;
            result3 +=
                `
            <div class="infor">    
            <div class="flip-card">
            <div class="flip-card-inner">
            <div class="flip-card-front">
            <img src="${listProduct[k].productImage}" alt="Avatar" style="width:200px;height:200px;">
            <h5 class="c-h4">${listProduct[k].productName}</h5>
                        </div>
                        <div id ="c-candy" class="flip-card-back">
                            <p class="card-infor-title3">--- Tên sản phẩm: ---</p>
                            <p class="card-infor">${listProduct[k].productName}</p>
                            <p class="card-infor-title3">--- Mã sản phẩm: ---</p>
                            <p class="card-infor">${listProduct[k].productID}</p>
                            <p class="card-infor-title3">--- Xuất xứ: ---</p>
                            <p class="card-infor">${listProduct[k].madeIn}</p>
                            <p class="card-infor-title3">--- Giá tiền: ---</p>
                            <p class="card-infor">${resultMoney}</p>
                        </div>
                    </div>
                </div>
            </div>
    `
        }
        document.getElementById("chocolate-infor").innerHTML = result3;
    }

}

renderProducts();