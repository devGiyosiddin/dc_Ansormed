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
