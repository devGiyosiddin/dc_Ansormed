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
    let message = `${userName} - ${userPhone}`;
    let token = '6402112095:AAEiMcLy4raZiGg2a9SYYT1-noqKX-Qyne8';
    let chat_id = '-1002135294576'; // Используйте начальное значение ID

    let url = `https://api.telegram.org/bot${token}/sendMessage`;
    let formData = new FormData();
    formData.append('chat_id', chat_id);
    formData.append('text', message);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Парсим JSON ответ
    .then(data => {
        if (data.ok) {
            // Если запрос успешен, обновляем chat_id с полученным ID из ответа
            chat_id = data.result.chat.id;
            console.log('Updated chat_id:', chat_id);
        } else {
            console.error('Error occurred:', data.description);
        }
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });

    document.querySelector('#name').value = '';
    document.querySelector('#phone').value = '';

    elModal.classList.remove('modal--open');
});
