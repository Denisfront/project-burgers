const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const performTransition = sectionEq => {
    if (inScroll) return;

    inScroll = true;
    const transitionIsOver = 1000;
    const mouseInertionIsOver = 300;
    const position = sectionEq * -100;
    if (isNaN(position))
        console.error('передли неверное значение в performTransition');

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
    }, transitionIsOver + mouseInertionIsOver);

    if (sectionEq > 0) {
        $('.header').css({
            display: 'none'
        })
    } else {
        $('.header').css({
            display: 'block'
        })
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
    const usersTypingInInpust = tagName === 'input' || tagName === 'textarea'
    if (usersTypingInInpust) return;
    switch (e.keyCode) {
        case 38:
            scrollToSection('prev');
            break;
        case 40:
            scrollToSection('next');
            break;
    }
});

$('[data-scroll-to]').on('click', e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');

    performTransition(target);
});

if (isMobile) {
    $("body").swipe({
        swipe: function (event,
            direction,
            distance,
            duration,
            fingerCount,
            fingerData) {
            const scrollDirection = direction === 'up' ? 'next' : 'prev';

            scrollToSection(scrollDirection);
        }
    });
}