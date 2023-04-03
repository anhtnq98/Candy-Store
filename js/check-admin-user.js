// đặt flag login trang index
let loginFlag = JSON.parse(localStorage.getItem("loginFlag"));
if (loginFlag == null) {
    document.getElementById("register-login").innerHTML =
        ` <div onclick="loginPage()" ><button class="login">Đăng nhập <i class="fa-solid fa-user-plus"></i></button></div>
        <div onclick="registerPage()" ><button class="login">Đăng ký <i class="fa-sharp fa-solid fa-right-from-bracket"></i></button></div>`;
    document.getElementById("my-cart").innerHTML =
        `<a href="../html/cart.html"><img src="../img/shopping-cart-shopping.gif" width="90vw"
        height="90vh" alt=""></a>
        <div class="cart-quantity" id="cart-quantity"></div>`
} else if (loginFlag.name == "Admin") {
    document.getElementById("edit-infor").innerHTML =
        ` <a href="./admin-manager.html"><img src="../img/pin.png" alt="Ảnh khá lỗi" width="40px">&nbsp;<i class="fa-solid fa-crown"></i>Quản &nbsp; lý trang web</a>`;
    document.getElementById("register-login").innerHTML =
        `<p class = "welcome">Xin chào, ${loginFlag.name}!</p>
<div onclick="indexPages()" ><button class="login">Đăng xuất <i class="fa-sharp fa-solid fa-right-from-bracket"></i></button></div>`;
} else {
    document.getElementById("register-login").innerHTML =
        `<p class = "welcome">Xin chào, ${loginFlag.name}!</p>
        <div onclick="indexPages()" ><button class="login">Đăng xuất <i class="fa-sharp fa-solid fa-right-from-bracket"></i></button></div>`;
    document.getElementById("edit-infor").innerHTML =
        ` <a href="./for-user.html"><img src="../img/pin.png" alt="Ảnh khá lỗi" width="40px">&nbsp;&nbsp;<i class="fa-solid fa-user-pen"></i>Thay &nbsp; đổi thông &nbsp; tin</a>`
    document.getElementById("my-cart").innerHTML =
        `<a href="../html/cart.html"><img src="../img/shopping-cart-shopping.gif" width="90vw"
        height="90vh" alt=""></a>
        <div class="cart-quantity" id="cart-quantity"></div>`
}

// chuyển đến trang đăng nhập
function loginPage() {
    window.location.href = "./login.html";
}

// chuyển đến trang đăng ký
function registerPage() {
    window.location.href = "./register.html";
}

// log-out
function indexPages() {
    localStorage.removeItem("loginFlag");
    window.location.href = "/index.html";
}

// lấy số lượng trong giỏ hàng
let arrCart = JSON.parse(localStorage.getItem("listProductCart"));
function quantityCartUser() {
    
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
quantityCartUser();



