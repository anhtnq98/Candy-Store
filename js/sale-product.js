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
            listProduct[i].quantity = 1;
            result1 +=
                `
    <div class="productOne">
    <img src="${listProduct[i].productImage}" alt="${listProduct[i].productName}"/>
    <p class = "display-name" id="display-name">${listProduct[i].productName}</p>
    <span id="price">${resultMoney}</span>
    <div onclick = addToCart("${listProduct[i].productID}") class="add-cart-container"><p class="add-cart"><i class="fa-sharp fa-solid fa-cart-shopping"></i></p></div>
    </div>

    `
        }
        document.getElementById("product-container-first").innerHTML = result1;
    }

    for (let j = 0; j < listProduct.length; j++) {
        money = listProduct[j].price;
        let resultMoney = VND.format(money);
        if (listProduct[j].productGenre.includes("Kẹo cứng")) {
            listProduct[j].quantity = 1;
            result2 +=
                `
    <div class="productTwo">
    <img src="${listProduct[j].productImage}" alt="${listProduct[j].productName}"/>
    <p class = "display-name" id="display-name">${listProduct[j].productName}</p>
    <span id="price">${resultMoney}</span>
    <div onclick = addToCart("${listProduct[j].productID}") class="add-cart-container"><p class="add-cart"><i class="fa-sharp fa-solid fa-cart-shopping"></i></p></div>
    </div>

    `
        }
        document.getElementById("product-container-second").innerHTML = result2;
    }

    for (let k = 0; k < listProduct.length; k++) {
        money = listProduct[k].price;
        let resultMoney = VND.format(money);
        if (listProduct[k].productGenre.includes("Kẹo sô-cô-la")) {
            listProduct[k].quantity = 1;
            result3 +=
                `
    <div class="productThree">
    <img src="${listProduct[k].productImage}" alt="${listProduct[k].productName}"/>
    <p class = "display-name" id="display-name">${listProduct[k].productName}</p>
    <span id="price">${resultMoney}</span>
    <div onclick = addToCart("${listProduct[k].productID}") class="add-cart-container"><p class="add-cart"><i class="fa-sharp fa-solid fa-cart-shopping"></i></p></div>
    </div>

    `
        }
        document.getElementById("product-container-third").innerHTML = result3;
    }

}

renderProducts();

// thêm vào giỏ hàng
let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
let listPerson = JSON.parse(localStorage.getItem("listRegister"));
let checkLogin = JSON.parse(localStorage.getItem("loginFlag"))
function addToCart(id) {
    if (checkLogin == null) {
        popUpRequire();
        return;
    }
    if (listProductCart == null) {
        listProductCart = [];
        for (let index = 0; index < listProduct.length; index++) {
            if (listProduct[index].productID == id) {
                popUpAddProduct()
                listProduct[index].userLogin = checkLogin.name;
                listProductCart.push(listProduct[index]);
                localStorage.setItem("listProductCart", JSON.stringify(listProductCart));
                console.log(2222);
                quantityCart()
                break;
            }
        }
    } else {
        for (let index = 0; index < listProduct.length; index++) {
            if (listProduct[index].productID == id) {
                let flag = true;
                for (let i = 0; i < listProductCart.length; i++) {
                    if (listProductCart[i].productID == id && checkLogin.name == listProductCart[i].userLogin) {
                        flag = false;
                        break;
                    } else {
                        flag = true
                    }
                }
                if (!flag) {
                    popUpSameProduct();
                    break;
                } else {
                    popUpAddProduct();
                    listProduct[index].userLogin = checkLogin.name;
                    listProductCart.push(listProduct[index]);
                    localStorage.setItem("listProductCart", JSON.stringify(listProductCart));
                    quantityCart()
                    break;
                }
            }
        }
    }
}

// hiện pop up yêu cầu đăng nhập
function popUpRequire() {
    document.getElementById("snack-bar").innerHTML = "Mời đăng nhập để mua hàng!";
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}

// hiện pop up có trong giỏ hàng
function popUpAddProduct() {
    document.getElementById("snack-bar").innerHTML = "Đã thêm sản phẩm vào giỏ hàng!";
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}

// hiện pop up có trong giỏ hàng
function popUpSameProduct() {
    document.getElementById("snack-bar").innerHTML = "Sản phẩm đã có trong giỏ hàng!";
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}


// hàm render quality card
function quantityCart() {
    let arrCart = JSON.parse(localStorage.getItem("listProductCart"));
    let loginFlag = JSON.parse(localStorage.getItem("loginFlag"))
    let cartCount = 0;
    if (arrCart == null || loginFlag == null) {
        document.getElementById("cart-quantity").innerHTML = cartCount;
    } else {
        for (let i = 0; i < arrCart.length; i++) {
            if (arrCart[i].userLogin == loginFlag.name) {
                cartCount++;
            }
        }
        document.getElementById("cart-quantity").innerHTML = cartCount;
    }
}
