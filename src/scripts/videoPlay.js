const vid = document.getElementsByTagName('video')[0];
const playBtn = document.getElementById('player__start');
const playBtnStart = document.getElementById('player__button-start');
const svgIcon = $('.icon-play');
const btnPaused = $('.player__start');
const volumeControl = $('.player__playsound');
const playTime = $('.player__duratipn-completed');

playBtn.addEventListener('click', function () {
    if (vid.paused) {
        btnPaused.addClass('paused');
        playBtnStart.classList.add('play__button-none');
        svgIcon.css({
            display: 'none'
        });
        vid.play();
    } else {
        vid.pause();
        btnPaused.removeClass('paused');
        svgIcon.css({
            display: 'block'
        });
    }
}, false);

playBtnStart.addEventListener('click', function () {
    if (vid.paused) {
        playBtnStart.classList.add('paused');
        vid.play();
    } else {
        vid.pause();
    }
}, false);