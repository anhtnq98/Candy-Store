let lFlag = JSON.parse(localStorage.getItem("loginFlag"));
let listPayConfirm = JSON.parse(localStorage.getItem("listPayConfirm"));
function renderPayCheck() {
    let result = "";
    let resultAll = "";

    if (listPayConfirm == null) {
        listPayConfirm = [];
    }

    if (lFlag.name == "Admin") {
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
                <td>Người dùng:${listPayConfirm[i].userNames}</td>
                <td>${listPayConfirm[i].name}</td>
                <td>${listPayConfirm[i].address}</td>
                <td>${resultAll}</td>
                <td>${total}đ</td>
                <td><button class="btn btn-danger" onclick="deleteOder(${i})">Xóa đơn hàng</button></td>
            </tr>
            `;
        }
        document.getElementById("renderPayCheck").innerHTML = result;
    }
}
renderPayCheck();


function deleteOder(id) {
    listPayConfirm.splice(id,1);
    localStorage.setItem("listPayConfirm", JSON.stringify(listPayConfirm));
    renderPayCheck();
}



