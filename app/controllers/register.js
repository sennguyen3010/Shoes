import { User } from "../models/User.js";

document.querySelector('#btnSubmit').onclick = function () {
    let valid = true;
    valid &= kiemTraEmail(document.querySelector('#email').value, '#errEmail')
        & kiemTraKyTu(document.querySelector('#name').value, '#errName')
        & kiemTraRong(document.querySelector('#password').value, '#errPassword')
        & kiemTraTatCaSo(document.querySelector('#phone').value, '#errPhone')
        & kiemTraConfirmPassword(document.querySelector('#password').value, document.querySelector('#passwordConfirm').value, '#errPasswordConfirm');
    console.log(valid);
    if (valid) {
        let user = new User();
        let arrInput = document.querySelectorAll('#email,#name,#password,#phone')
        for (let input of arrInput) {
            let { id, value } = input;
            user[id] = value;
        }

        let checkBoxFemale = document.querySelector('#female');
        if (checkBoxFemale.checked) {
            user.gender = false;
        }

        // gọi API
        var promise = axios({
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            method: 'POST',
            data: user
        });

        //Xử lý thành công 
        promise.then(function (result) {
            console.log('result', result.data.content);
        });


        //Xử lý thất bại
        promise.catch(function (error) {
            console.log('error', error.response.data);
        })
    }
}

window.kiemTraRong = function (value, selectorError) {
    if (value.trim() === '') {
        document.querySelector(selectorError).innerHTML = 'Không được bỏ trống !';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '(*)';
    return true;
}

window.kiemTraKyTu = function (value, selectorError) {
    var regexLetter = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \\s]+$/;
    if (regexLetter.test(value)) {
        document.querySelector(selectorError).innerHTML = '(*)';
        return true;
    }
    document.querySelector(selectorError).innerHTML = 'Tất cả là ký tự!';
    return false;
}

window.kiemTraEmail = function (value, selectorError) {
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regexEmail.test(value)) {
        document.querySelector(selectorError).innerHTML = '(*)';
        return true;
    }
    document.querySelector(selectorError).innerHTML = 'Email không hợp lệ!';
    return false;
}

window.kiemTraTatCaSo = function (value, selectorError) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = '(*)';
        return true;
    }
    document.querySelector(selectorError).innerHTML = 'Tất cả phải là số';
    return false;
}

window.kiemTraConfirmPassword = function (password, confirmPassword, selectorError) {
    if (confirmPassword === password) {
        document.querySelector(selectorError).innerHTML = '(*)';
        return true;
    }
    document.querySelector(selectorError).innerHTML = 'Xác nhận không đúng';
    return false;
}