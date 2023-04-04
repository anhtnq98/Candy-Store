let listRegister = JSON.parse(localStorage.getItem("listRegister"));
let count = 0;
function register(e) {
    e.preventDefault();
    let valueName = document.getElementById("userName").value;
    // lấy giá trị từ radio
    let valueGender = document.querySelectorAll("input[type='radio']");
    let genderCheck;
    for (const keyGender of valueGender) {
        if (keyGender.checked) {
            genderCheck = keyGender.value;
            break;
        }
    }
    //
    let valueEmail = document.getElementById("email").value;
    let valueTel = document.getElementById("tel").value;
    let valueBirth = document.getElementById("birth").value;
    let valuePassword = document.getElementById("password").value;
    let valueConfirmPassword = document.getElementById("confirm-password").value;
    let valueSecretQuestion = document.getElementById("secret-question").value;
    let status = "Hoạt động";
    let flag = true;

    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("birth").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
    document.getElementById("secret-question").value = "";

    let loginPerson = {

        userName: valueName,
        gender: genderCheck,
        email: valueEmail,
        tel: valueTel,
        birth: valueBirth,
        password: valuePassword,
        secretQuestion: valueSecretQuestion,
        status: status,

    }

    if (listRegister == null) {
        listRegister = [];
    }

    // check xem có điền đầy đủ thông tin bắt buộc hay không
    if (valueName == "" || valueEmail == "" || valueTel == "" || valuePassword == "" || valueSecretQuestion == "") {
        document.getElementById("error1").innerHTML = "Thông tin bắt buộc chưa đầy đủ.";
        document.getElementById("error2").innerHTML = "";
        flag = false;
    }

    //check tên đăng nhập xem có trùng hay không
    let checkSameName = listRegister.find(
        user => user.userName == valueName
    )

    if (checkSameName) {
        document.getElementById("error1").innerHTML = "Tên đăng nhập đã được sử dụng";
        flag = false;
    }

    // check điều kiện email
    /* Địa chỉ email phải chứa ít nhất dấu ‘@’ và dấu chấm(.).Ngoài ra, ‘@’ không được là ký tự đầu tiên 
    của địa chỉ email và dấu chấm cuối cùng ít nhất phải là một ký tự sau dấu ‘@’. */
    atpos = valueEmail.indexOf("@");
    dotpos = valueEmail.lastIndexOf(".");

    if (atpos < 1 || (dotpos - atpos < 2)) {
        if (valueEmail != "") {
            document.getElementById("error1").innerHTML = "Nhập lại email dưới dạng: email@address.com";
        }
        flag = false;
    }

    //check email xem có trùng hay không
    let checkSameEmail = listRegister.find(
        user => user.email == valueEmail
    )

    if (checkSameEmail) {
        document.getElementById("error1").innerHTML = "Email mà bạn nhập đã được sử dụng.";
        flag = false;
    }

    //check password
    if (valuePassword != valueConfirmPassword) {
        document.getElementById("error2").innerHTML = "Mật khẩu xác nhận không khớp.";
        flag = false;
    }

    // thỏa mãn mọi điều kiện, cho phép lưu dữ liệu
    if (flag == true) {
        popUpR();
        listRegister.push(loginPerson);
        localStorage.setItem("listRegister", JSON.stringify(listRegister));
        setTimeout(() => { window.location.href = "login.html"; }, 2000);
    }

}

function login(e) {
    e.preventDefault();
    let valueNameOrEmail = document.getElementById("name-or-email").value;
    let valueCheckPassword = document.getElementById("check-password").value;
    count++;
    let getUser = listRegister.find(
        user =>
            (user.userName === valueNameOrEmail && user.password === valueCheckPassword) ||
            (user.email === valueNameOrEmail && user.password === valueCheckPassword));
    if (getUser) {
        for (let i = 0; i < listRegister.length; i++) {
            if (listRegister[i].userName == valueNameOrEmail || listRegister[i].email == valueNameOrEmail) {
                if (listRegister[i].status == "Bị khóa") {
                    popUpBan()
                    return;
                }
                let userName = {
                    name: listRegister[i].userName,
                }
                popUpL(i);        
                localStorage.setItem("loginFlag", JSON.stringify(userName));
                setTimeout(() => { window.location.href = "/index.html"; }, 2000);
            }
        }
    } else if (valueNameOrEmail == "" || valueCheckPassword == "") {
        count = 0;
        document.getElementById("error1").innerHTML = `Tên đăng nhập, email hoặc mật khẩu đang bỏ trống!`;
    } else if (count == 1) {
        document.getElementById("error1").innerHTML = `Tên đăng nhập, email hoặc mật khẩu không đúng. <br> Bạn còn 2 lần nhập`;
    } else if (count == 2) {
        document.getElementById("error1").innerHTML = `Tên đăng nhập, email hoặc mật khẩu không đúng. <br> Bạn còn 1 lần nhập`;
    } else if (count == 3) {
        deepConfirm();
        setTimeout(() => {
            document.getElementById("error1").innerHTML = `Email hoặc câu trả lời bí mật của bạn không đúng. <br> Vô vọng rồi! <br>
        Mời bạn đăng ký lại!`;
        }, 3000)
    }
}

// trả lời sai 3 lần thì qua câu trả lời bí mật
function deepConfirm() {
    popUpError();
    setTimeout(() => {
        let confirmEmail = prompt("Nhập email đã đăng ký:");
        let answer = prompt("CÂU HỎI BÍ MẬT: (Tên ca sĩ mà bạn yêu thích)");
        let getAnswer = listRegister.find(
            user => user.email === confirmEmail && user.secretQuestion === answer
        );
        if (getAnswer) {
            for (let i = 0; i < listRegister.length; i++) {
                if (listRegister[i].email == confirmEmail || listRegister[i].secretQuestion == answer) {
                    popUpL(i);
                    localStorage.setItem("loginFlag", listRegister[i].userName);
                    setTimeout(() => { window.location.href = "/index.html"; }, 2000);
                }
            }
        }
    }, 2000);

}

// hiện pop up đăng ký thành công 
function popUpR() {
    var x = document.getElementById("snack-bar-register");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}

// hiện pop up đăng nhập thành công 
function popUpL(id) {
    document.getElementById("snack-bar-login").innerHTML = `Đăng nhập thành công! Chào mừng ${listRegister[id].userName}!`;
    var x = document.getElementById("snack-bar-login");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}

// hiện pop up sai mật khẩu
function popUpError() {
    document.getElementById("snack-bar-login").innerHTML = `Nhập lại EMAIL và CÂU TRẢ LỜI BÍ MẬT để đăng nhập`;
    var x = document.getElementById("snack-bar-login");
    x.className = "show";
    setTimeout(function () {x.className = x.className.replace("show", ""); }, 2000);
}

// hiện pop up sai mật khẩu
function popUpBan() {
    document.getElementById("snack-bar-login").innerHTML = `Tài khoản của bạn đã bị khóa, không thể đăng nhập T.T`;
    var x = document.getElementById("snack-bar-login");
    x.className = "show";
    setTimeout(function () {x.className = x.className.replace("show", ""); }, 2000);
}


// về trang chủ
function backToIndex() {
    window.location.href = "/index.html";
}
