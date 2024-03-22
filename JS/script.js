'use strict';
const elToggleButton = document.querySelector('.site-header__menu-toggler');
const elSiteHeader = document.querySelector('.site-header');
const elModal = document.querySelector('#modal');
const elModalOpenerBtns = document.querySelectorAll('.modal-opener-btns');
const elModalForm = document.querySelector('.modal-form');

if (elToggleButton) {
    elToggleButton.addEventListener("click", function() {
        elSiteHeader.classList.toggle("site-header--open");
    });
}

// Remove on ESC
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        elSiteHeader.classList.remove("site-header--open");
        elModal.classList.remove("modal--open");
    }
});

// Remove on click outside
function closeMenuOutside(e) {
    if (!elToggleButton.contains(e.target) && !elSiteHeader.contains(e.target)) {
        elSiteHeader.classList.remove("site-header--open");
    }
    if (elModal.contains(e.target) && !elModalForm.contains(e.target)) {
        elModal.classList.remove("modal--open");
    }
}

document.addEventListener('click', closeMenuOutside);

// Open modal
elModalOpenerBtns.forEach((item) => {
    item.addEventListener('click', () => {
        elModal.classList.add('modal--open');
    });
});

elModalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userName = document.querySelector('#name').value;
    let userPhone = document.querySelector('#phone').value;

    // Добавляем символ плюса в начало номера телефона
    // var formattedPhone = '+' + userPhone;

    // Формируем сообщение, включая имя и отформатированный номер телефона пользователя
    let message = `${userName} - ${userPhone}`;

    // Bot token
    let token = '6402112095:AAEiMcLy4raZiGg2a9SYYT1-noqKX-Qyne8';
    let chat_id = '-4097526078';

    // URL запроса, включая сообщение
    let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`;

    let api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();

    // Очищаем значения полей формы
    document.querySelector('#name').value = '';
    document.querySelector('#phone').value = '';

    elModal.classList.remove('modal--open');
});