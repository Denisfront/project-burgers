// const leftbutton = document.querySelector('.button-prev');
// const rightbutton = document.querySelector('.button-next');
// const itemlist = document.querySelector('.menu-slider__list');


// rightbutton.addEventListener('click', function (e) {
//     loop('rightbutton', e);
// });

// leftbutton.addEventListener('click', function (e) {
//     loop('leftbutton', e);
// });

// function loop(direction, e) {
//     e.preventDefault();
//     if (direction == rightbutton) {
//         itemlist.appendChild(itemlist.firstElementChild);
//     } else {
//         itemlist.insertBefore(itemlist.lastElementChild, itemlist.firstElementChild);
//     }
// }

$(function () {

    let moveSlide = function (item, slideNum) {
        var activeSlide = item.filter('.active'),
            reqItem = item.eq(slideNum),
            reqIndex = reqItem.index(),
            duration = 500;

        if (reqItem.length) {
            item.animate({
                'left': -reqIndex * 100 + '%'
            }, duration, function () {
                activeSlide.removeClass('active');
                reqItem.addClass('active');
            })
        }
    }

    $('.button-slider').on('click', function (e) {
        e.preventDefault();

        let item = $('.menu-slider__content'),
            activeItem = item.filter('.active'),
            existedItem, edgeItem, reqItem;

        if ($(this).hasClass('button-next')) { // вперёд
            existedItem = activeItem.next();
            edgeItem = item.first();
        }

        if ($(this).hasClass('button-prev')) { // назад
            existedItem = activeItem.prev();
            edgeItem = item.last();
        }

        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlide(item, reqItem);
        if (existedItem.length) {
            moveSlide(item, existedItem);
        } else {
            moveSlide(item, edgeItem);
        }
    });
});