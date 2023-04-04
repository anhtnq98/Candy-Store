let dataCart = JSON.parse(localStorage.getItem("listProductCart"));
let dataFlag = JSON.parse(localStorage.getItem("loginFlag"));
let sum = 0;
const VND1 = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

renderCart()

function renderCart() {
    let cartCount = 0;
    if (dataCart == null) {
        dataCart = [];
    }
    let dataCartResult =
        `
        <div class="cart-title">
            <span class = "cart-infor">Ảnh</span>
            <span class = "cart-infor">Tên sản phẩm</span>
            <span class = "cart-infor">Loại kẹo</span>
            <span class = "cart-infor">Xuất xứ</span>
            <span class = "minus-add">Số lượng</span>
            <span class = "cart-infor">Giá tiền</span>
            <span class = "cart-delete">Xóa</span>
        </div>
            `;
    let total = 0;
    for (let i = 0; i < dataCart.length; i++) {
        if (dataCart[i].userLogin == dataFlag.name) {
            cartCount++;
            sum = dataCart[i].price * dataCart[i].quantity;
            total += sum;
            dataCartResult +=
                `
    <div class="cart-table">
        <span class = "cart-infor"><img src="${dataCart[i].productImage}" alt="${dataCart[i].productName}" width= "100%" height = "100%" /></span>
        <span class = "cart-infor">${dataCart[i].productName}</span>
        <span class = "cart-infor">${dataCart[i].productGenre}</span>
        <span class = "cart-infor">${dataCart[i].madeIn}</span>
        <span class = "minus-add"><button onclick = "minusQuantity(${i})">-</button> ${dataCart[i].quantity} <button onclick ="addQuantity(${i})">+</button></span>
        <span style = "word-break: break-all;" class = "cart-infor">${sum}</span>
        <span class = "cart-delete"><button onclick="deleteData(${i})">Xóa</button></span>
    </div>
            `
        }

    }
    let totalMoney = VND1.format(total);

    document.getElementById("cart-quantity").innerHTML = cartCount;
    document.getElementById("cart-table").innerHTML = dataCartResult;
    document.getElementById("total-money").innerHTML = `Tổng tiền: ${totalMoney}`;

}

function deleteData(id) {
    if (confirm("Bạn có muốn xóa sản phẩm khỏi giỏ không?") == true) {
        dataCart.splice(id, 1);
        localStorage.setItem("listProductCart", JSON.stringify(dataCart));
        renderCart();
    }
}

function addQuantity(index) {
    dataCart[index].quantity++;
    localStorage.setItem("listProductCart", JSON.stringify(dataCart));
    renderCart();
}

function minusQuantity(index) {
    if (dataCart[index].quantity > 1) {
        dataCart[index].quantity--;
        localStorage.setItem("listProductCart", JSON.stringify(dataCart));
        renderCart();
    } else {
        if (confirm("Bạn có muốn xóa sản phẩm khỏi giỏ không?") == true) {
            dataCart.splice(index, 1);
            localStorage.setItem("listProductCart", JSON.stringify(dataCart));
            renderCart();
        }
    }
}

function payConfirm() {
    let x = document.getElementById("pay-input");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    let y = document.getElementById("pay-confirm-container");
    if (y.innerHTML === `<button class="pay-confirm" onclick="payConfirm()">Xác nhận đơn hàng</button>`) {
        y.innerHTML = `<button class="pay-confirm" onclick="payConfirm()">Đóng xác nhận đơn hàng</button>`;
    } else {
        y.innerHTML = `<button class="pay-confirm" onclick="payConfirm()">Xác nhận đơn hàng</button>`;
    }

    //////
    let total = 0;
    let allTotal = 0;
    let result = "";
    for (i = 0; i < dataCart.length; i++) {
        if (dataCart[i].userLogin == dataFlag.name) {
            sum = dataCart[i].price * dataCart[i].quantity;
            total += sum;
            allTotal = VND1.format(total);
            result =
                `
    <div>
        <label for="">Địa chỉ</label><br>
        <textarea name="address" id="address" cols="30" rows="3"></textarea>
    </div>
    <div>
        <div style="margin: 10px 0px 10px 0px; color: white;">Tổng tiền:</div>
        <div style="margin: 10px 0px 10px 0px; color: white;">${allTotal}</div>
        <button onclick="addPayConfirm()">Thanh toán</button>
    </div>
</div>
            `
        }
        document.getElementById("pay-input").innerHTML = result;
    }
}


payConfirm();

let listPayConfirm = JSON.parse(localStorage.getItem("listPayConfirm"));
function addPayConfirm() {
    popUpPay();
    let inputAddress = document.getElementById("address").value;
    let listUserName = dataFlag.name;
    let listProductName = [];
    let listMadeIn = [];
    let listQuantity = [];
    let listPrice = [];
    if (inputAddress == "") {
        popUpAddress();
    } else {
        for (i = 0; i < dataCart.length; i++) {
            if (dataCart[i].userLogin == dataFlag.name) {
                listProductName.push(dataCart[i].productName);
                listMadeIn.push(dataCart[i].madeIn);
                listQuantity.push(dataCart[i].quantity);
                listPrice.push(Number(dataCart[i].price));
            }
        }

        let newOder = {
            userName: listUserName,
            name: listProductName,
            madeIn: listMadeIn,
            quantity: listQuantity,
            price: listPrice,
            address: inputAddress,
        };
        console.log("DS SP MỚI", newOder);

        if (listPayConfirm == null) {
            listPayConfirm = [];
        }

        let newDataCart = "";

        listPayConfirm.push(newOder);
        localStorage.setItem("listPayConfirm", JSON.stringify(listPayConfirm));

        // Xóa sản phẩm đã thanh toán
        newDataCart = dataCart.filter(item => item.userLogin !== dataFlag.name);
        localStorage.setItem("listProductCart", JSON.stringify(newDataCart));
    }
}

// hiện pop up thanh toán thành công
function popUpPay() {
    document.getElementById("snack-bar").innerHTML = "Đã đăng ký đơn hàng, chờ xá nhận!";
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}

// hiện pop up không để trống ô address
function popUpAddress() {
    document.getElementById("snack-bar").innerHTML = "Mời nhập địa chỉ.";
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}




