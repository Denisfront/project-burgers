const acco = document.getElementsByClassName('accordeon__item');
const content = document.getElementsByClassName('accordeon-content');

for (let index = 0; index < acco.length; index++) {
    const element = acco[index];
    element.addEventListener('click', function(e) {
        e.preventDefault();
        for (let i = 0; i < acco.length; i++) {
            if(i !== index) {
                acco[i].classList.remove('accordeon-content--color--positoin--overflow');
            }
        }

        if(element.classList.contains('accordeon-content--color--positoin--overflow')) {
            element.classList.remove('accordeon-content--color--positoin--overflow');
        } else {
            element.classList.add('accordeon-content--color--positoin--overflow');
        }
    })
}