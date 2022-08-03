document.querySelector('#btnSubmit').onclick = function () {
    let valid = true;
    console.log('first')
    console.log(kiemTraRong(document.querySelector('#email').value, '#errEmail'));
}

window.kiemTraRong = function (value, selectorError) {
    if (value.trim() === '') {
        document.querySelector(selectorError).innerHTML = 'Không được bỏ trống !';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '(*)';
    return true;
}