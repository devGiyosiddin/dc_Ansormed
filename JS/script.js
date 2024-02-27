'use strict';
const elToggleButton = document.querySelector('.site-header__menu-toggler');
const elSiteHeader = document.querySelector('.site-header');
if (elToggleButton) {
    elToggleButton.addEventListener("click", function() {
    elSiteHeader.classList.toggle("site-header--open")
    });
};

// Remove on ESC
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        elSiteHeader.classList.remove("site-header--open")
    }
})

// Remove on click outside
// Функция, которая будет вызываться при клике в любом месте документа
function closeMenuOutside(e) {
    // Проверяем, был ли клик сделан вне меню и кнопки
    if (!elToggleButton.contains(e.target) && !elSiteHeader.contains(e.target)) {
        // Если да, закрываем меню
        elSiteHeader.classList.remove("site-header--open");
    }
}

// Добавляем обработчик события на клик по документу
document.addEventListener('click', closeMenuOutside);
