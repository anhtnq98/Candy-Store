let listUsers = JSON.parse(localStorage.getItem("listRegister"));
function searchUser() {
    let searchValue = document.getElementById("search").value;
    document.getElementById("search").value = "";
    let total = `
        <tr>
        <td id="td-title">Tên người dùng</td>
        <td id="td-title">Giới tính</td>
        <td id="td-title">Email</td>
        <td id="td-title">Số điện thoại</td>
        <td id="td-title">Ngày sinh</td>
        <td id="td-title">Trạng thái</td>
        <td id="td-title" colspan=2>Đổi/Xóa</td>
    </tr>
        `  ;
    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].userName.toLowerCase().includes(searchValue.toLowerCase())) {
            total += `
    <tr>
        <td>${listUsers[i].userName}</td>
        <td>${listUsers[i].gender}</td>
        <td>${listUsers[i].email}</td>
        <td>${listUsers[i].tel}</td>
        <td>${listUsers[i].birth}</td>
        <td>${listUsers[i].status}</td>
        <td class = "edit-delete"><button onclick="editProduct(${i})">Đổi</button></td>
        <td class = "edit-delete"><button onclick="deleteProduct(${i})">Xóa</button></td>
    </tr>
        `;
        }
    }
    document.getElementById("table-user").innerHTML = total;
}
searchUser()

function editProduct(id) {
    listUsers[id].status = document.getElementById("active").value;
    localStorage.setItem("listRegister", JSON.stringify(listUsers));
    searchUser();
}

/////////

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
