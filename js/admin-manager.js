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
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    let result = 
    `
    <tr>
        <td>Số thứ tự</td>
        <td style ="width: 100px">Tên khách hàng</td>
        <td>Nội dung đơn hàng</td>
        <td style ="width: 200px">Địa chỉ khách hàng</td>
        <td style ="width: 150px">Thành giá</td>
        <td>Trạng thái đơn hàng</td>
        <td>Xóa</td>
    </tr>
    `;
    let resultAll = 
    `
    
    `;

    if (listPayConfirm == null) {
        listPayConfirm = [];
    }

    if (loginFlag.name == "Admin") {
        for (i = 0; i < listPayConfirm.length; i++) {
            let total = 0;
            let sum = 0;
            for (j = 0; j < listPayConfirm[i].price.length; j++) {
                sum += listPayConfirm[i].quantity[j] * listPayConfirm[i].price[j];
                total = VND.format(sum)
                resultAll += `
                <div style ="padding: 10px; border-bottom: solid pink 2px;">
                <div>${listPayConfirm[i].name[j]}</div>
                <div>Số lượng: ${listPayConfirm[i].quantity[j]}</div>
                <div>Giá tiền: ${listPayConfirm[i].quantity[j] * listPayConfirm[i].price[j]}đ</div>
                </div>
                `;
            }
            result +=
                `
            <tr>
                <td>${i + 1}</td>
                <td>${listPayConfirm[i].userName}</td>
                <td>${resultAll}</td>
                <td>${listPayConfirm[i].address}</td>
                <td>${total}</td>
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
        document.getElementById("renderlistOder").innerHTML = result;
    }
}
renderDonHang();


function deleteOder(id) {
    listPayConfirm.splice(id, 1);
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


