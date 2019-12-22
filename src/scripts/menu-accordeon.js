const item = document.getElementsByClassName('accordeon-menu__item');

for (let index = 0; index < item.length; index++) {
    const element = item[index];
    element.addEventListener('click', function (e) {
        e.preventDefault();
        for (let i = 0; i < item.length; i++) {
            if (i !== index) {
                item[i].classList.remove('accordeon-menu__content--active--color');
            }
        }

        if (element.classList.contains('accordeon-menu__content--active--color')) {
            element.classList.remove('accordeon-menu__content--active--color');
        } else {
            element.classList.add('accordeon-menu__content--active--color');
        }
    })
}
