let menuButton = document.querySelector('.navigation__button');
let mobileNav = document.querySelector('.navigation__list');

let popupSms = document.querySelector('.popup-sms');
let popupSuccess = document.querySelector('.popup-success');
let popupFail = document.querySelector('.popup-fail');

let formError = document.querySelector('.form__error');

let pass = document.querySelector('#pass');
let passReq = document.querySelector('#pass-req');

let popupSubmit = document.querySelector('.popup__button--submit');
let popupSuccessButton = document.querySelector('.popup__button--success');

let phoneIncoreect = document.querySelector('.form__error-phone');
let codeIncorrect = document.querySelector('.form__error-code');


document.querySelector('#show').onclick = function () {
    if (document.querySelector('#tel').value <= '') {
        phoneIncoreect.classList.add('form__error-phone--invalid')
    }

    let result = document.querySelector('#tel').checkValidity();

    let passCheck = pass.checkValidity();
    let passReqCheck = passReq.checkValidity();
    if (pass.value !== passReq.value) {
        formError.classList.add('form__error--invalid')
        return false;
    }

    if (result == true && passCheck == true && passReqCheck == true) {
        popupSms.showModal();
    }
};
document.querySelector('#close').onclick = function () {
    popupSms.close();
};

popupSubmit.onclick = function () {
    let result = document.querySelector('#code').checkValidity();

    if (result) {
        popupSms.close();
        popupSuccess.showModal();
    } else {
        codeIncorrect.classList.add('form__error-code--invalid');

        popupSms.close();
        popupFail.showModal();
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
