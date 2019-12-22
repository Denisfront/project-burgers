const hamburger = document.querySelector('#hamburger');
const arrowscroww = document.querySelector('#arrowscroll');
const computed = getComputedStyle(navtablets);
const computedscroll = getComputedStyle(arrowscroll);
const body = document.querySelector('body');

hamburger.addEventListener('click', function(e) {
    e.preventDefault();
   
    // console.log(computed.display);
    let displaynone = computed.display;
    let arrowscrollblock = computedscroll.display;
    

    if (displaynone == 'none') {
        navtablets.style.display = 'flex';
        body.classList.add('body_closed');
    } else {
        navtablets.style.display = 'none';
        body.classList.remove('body_closed');
    }

    if ( arrowscrollblock == 'block') {
        arrowscroll.style.display = 'none';
    } else {
        arrowscroll.style.display = 'block';
    }
});