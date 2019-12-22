const buttonOpen = document.querySelector('#buttonOpen');
const body1 = document.querySelector('body');
const reviews = document.querySelector('#reviewsjs');
const openOverlay = reviewOverlay('Константин Спилберг', 'Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным. Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.');

$('.buttonOpen').on('click', () => {
    reviews.appendChild(openOverlay);
    body1.classList.add('body_closed');
})

function reviewOverlay(username, content) {
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay');
    overlayElement.addEventListener('click', e => {

        if (e.target === overlayElement) {
            closeElement.click();
        }
    });
    const conainerElement = document.createElement('div');
    conainerElement.classList.add('overlay__container');

    const usermaeElement = document.createElement('div');
    usermaeElement.classList.add('overlay__username');
    usermaeElement.innerHTML = username;

    const contentElement = document.createElement('div');
    contentElement.classList.add('overlay-content');
    contentElement.innerHTML = content;

    const closeElement = document.createElement('a');
    closeElement.classList.add('close');
    closeElement.href = "#";
    closeElement.addEventListener('click', e => {
        e.preventDefault();
        reviews.removeChild(openOverlay);
        body1.classList.remove('body_closed');
    });

    overlayElement.appendChild(conainerElement);
    conainerElement.appendChild(usermaeElement);
    conainerElement.appendChild(contentElement);
    conainerElement.appendChild(closeElement);

    return overlayElement;
}