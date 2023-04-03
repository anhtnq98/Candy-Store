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
        ` <a href="./admin-manager.html"><img src="../img/pin.png" alt="Ảnh khá lỗi" width="40px">&nbsp;<i class="fa-solid fa-crown"></i>Quản &nbsp; lý trang web</a>`
    document.getElementById("register-login").innerHTML =
        `<p class = "welcome">Xin chào, ${loginFlag.name}!</p>
<div onclick="indexPage()" ><button class="login">Đăng xuất <i class="fa-sharp fa-solid fa-right-from-bracket"></i></button></div>`;
} else {
    document.getElementById("register-login").innerHTML =
        `<p class = "welcome">Xin chào, ${loginFlag.name}!</p>
        <div onclick="indexPage()" ><button class="login">Đăng xuất <i class="fa-sharp fa-solid fa-right-from-bracket"></i></button></div>`;
    document.getElementById("edit-infor").innerHTML =
        ` <a href=""><img src="../img/pin.png" alt="Ảnh khá lỗi" width="40px">&nbsp;&nbsp;<i class="fa-solid fa-user-pen"></i>Thay &nbsp; đổi thông &nbsp; tin</a>`
    document.getElementById("my-cart").innerHTML =
        `<a href="../html/cart.html"><img src="../img/shopping-cart-shopping.gif" width="90vw"
        height="90vh" alt=""></a>
        <div class="cart-quantity" id="cart-quantity"></div>`
}


let listPayConfirm = JSON.parse(localStorage.getItem("listPayConfirm"));
function renderDonHang() {
    let result = "";
    let resultAll = "";

    if (listPayConfirm == null) {
        listPayConfirm = [];
    }

    if (loginFlag.name == "Admin") {
        for (i = 0; i < listPayConfirm.length; i++) {
            let total = 0;
            for (j = 0; j < listPayConfirm[i].price.length; j++) {
                total += listPayConfirm[i].quantity[j] * listPayConfirm[i].price[j];
                resultAll += `${listPayConfirm[i].name[j]}: ${listPayConfirm[i].quantity[j]} cái; ${listPayConfirm[i].quantity[j] * listPayConfirm[i].price[j]}đ<br>`;
            }
            result +=
                `
            <tr>
                <td>${i + 1}</td>
                <td>${listPayConfirm[i].userName}</td>
                <td>${listPayConfirm[i].name}</td>
                <td>${listPayConfirm[i].address}</td>
                <td>${resultAll}</td>
                <td>${total}đ</td>
                <td><select>
                <option>Chờ xác nhận</option>
                <option>Đã xác nhận</option>
                <option>Đang giao hàng</option>
                <option>Xóa đơn(xóa sau x ngày)</option>
                </select></td>
                <td><button class="btn btn-danger" onclick="deleteOder(${i})">Xóa đơn hàng</button></td>
            </tr>
            `;
        }
        document.getElementById("renderDonHang").innerHTML = result;
    }
}
renderDonHang();


function deleteOder(id) {
    listPayConfirm.splice(id,1);
    localStorage.setItem("listPayConfirm", JSON.stringify(listPayConfirm));
    renderDonHang();
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
function indexPage() {
    localStorage.removeItem("loginFlag");
    window.location.href = "/index.html";
}


