let menuButton = document.querySelector('.navigation__button');
let mobileNav = document.querySelector('.navigation__list');

let popupSms = document.querySelector('.popup-sms');
let popupSuccess = document.querySelector('.popup-success');
let popupFail = document.querySelector('.popup-fail');

let pass = document.querySelector('#pass');
let passReq = document.querySelector('#pass-req');

let popupSubmit = document.querySelector('.popup__button--submit');

let form = document.querySelector('.form');

document.querySelector('#show').onclick = function () {
    if (document.querySelector('#tel').value <= '') {
        document.querySelector('#tel').classList.add('form__input--error')
    } else {
        document.querySelector('#tel').classList.remove('form__input--error')
    }

    let result = document.querySelector('#tel').checkValidity();

    let passCheck = pass.checkValidity();
    let passReqCheck = passReq.checkValidity();
    if (pass.value !== passReq.value || pass.value <= '') {
        pass.classList.add('form__input--error');
        passReq.classList.add('form__input--error');
        return false;
    }

    if (result == true && passCheck == true && passReqCheck == true) {
        popupSms.classList.add('popup--visible');
        form.classList.add('form--disable');
    }
};
document.querySelector('#close').onclick = function () {
    popupSms.classList.remove('popup--visible');
    form.classList.remove('form--disable');
};

popupSubmit.onclick = function () {
    let result = document.querySelector('#code').checkValidity();

    if (result) {
        popupSms.classList.remove('popup--visible');
        popupSuccess.classList.add('popup--visible');
    } else {

        popupSms.classList.remove('popup--visible');
        popupFail.classList.add('popup--visible');
    }
}

menuButton.onclick = function () {
    mobileNav.classList.toggle('navigation__list--open');
    menuButton.classList.toggle('navigation__button--open');
}

window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('#tel'), function (input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5) this.value = "";
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);

    });
});
