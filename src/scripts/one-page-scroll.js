const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;

const performTransition = sectionEq => {
    if (inScroll === false) {
        inScroll = true;
        const position = sectionEq * -100;
        sections
            .eq(sectionEq)
            .addClass('active')
            .siblings()
            .removeClass('active');

        display.css({
            transform: `translateY(${position}%)`
        });

        setTimeout(() => {
            inScroll = false;

            $('.column__item')
                .eq(sectionEq)
                .addClass('column__dot--active')
                .siblings()
                .removeClass('column__dot--active');
        }, 1300);
    }
};

const scrollToSection = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === 'next' && nextSection.length) {
        performTransition(nextSection.index());
    }

    if (direction === 'prev' && prevSection.length) {
        performTransition(prevSection.index());
    }
};

$(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollToSection('next');
    }

    if (deltaY < 0) {
        scrollToSection('prev');
    }
});

$(window).on('keydown', e => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName != 'input' && tagName != 'textarea') {
        switch (e.keyCode) {
            case 38:
                scrollToSection('prev');
                break;
            case 40:
                scrollToSection('next');
                break;
        }
    };

});

$('[data-scroll-to]').on('click', e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');

    performTransition(target);
});

$("body").swipe({
    swipe: function 
    (event,
    direction, 
    distance, 
    duration,
    fingerCount, 
    fingerData) {
        const scrollDirection = direction === 'up' ? 'next' : 'prev';

        scrollToSection(scrollDirection);
    }
});