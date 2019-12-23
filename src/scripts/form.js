// Доступ к инпуту с номером телефона
const form__inputjs = document.querySelector('.form__inputjs');

form__inputjs.addEventListener('keydown', function (e) {
    let isDigit = false;
    let isDash = false;
    let isControl = false;

    if (event.key >= 0 || event.ket <= 9) {
        isDigit = true;
    }

    if (event.key == '-') {
        isDash = true;
    }

    if (event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'Backspace' || event.key == 'Tab') {
        isControl = true;
    }
    if (!isDigit && !isDash && !isControl) {
        e.preventDefault();
    }
    // console.log(event);
});


const Myform = document.querySelector('.form'); // Доступ к тегу форм
let form = new FormData;
const btnform = document.querySelector('#btn-form'); // Доступ к кнопке
const overlayform = document.querySelector('.overlay-form');
const overlaycontent = document.querySelector('.overlay-form__conent');
const overlayformclouse = document.querySelector('.overlay-form__clouse');
btnform.addEventListener('click', e => { // Запрещаем перезагрузку сраницы при нажатии на кнопку
    e.preventDefault();

    if (validateForm(Myform)) {
        const data = {
            name: Myform.elements.name.value,
            phone: Myform.elements.phone.value,
            street: Myform.elements.street.value,
            comment: 'commetn',
            house: Myform.elements.house.value,
            apartament: Myform.elements.apartament.value,
            floor: Myform.elements.floor.value,
            to: 'kaktus.Zzzz@mail.ru'
        };
        for (const key in data) {
            form.append(key, data[key]);
        }
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = processReqChange;

        function processReqChange() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const message = JSON.parse(xhr.response);
                    console.log(message);
                } else {
                    // ошибка
                }
            }
        }
        xhr.open('POST', "https://webdev-api.loftschool.com/sendmail");
        xhr.send(form);
        xhr.addEventListener('load', () => {
            overlayform.style.display = 'flex';
            if (xhr.status === 200) {
                overlaycontent.innerText = 'Сообщение отправильно';
            } else {
                overlaycontent.innerText = 'Отправить письмо не удалось, повторите запрос позже';
            }

            overlayformclouse.addEventListener('click', e => {
                e.preventDefault();
                overlayform.style.display = 'none';
                body.classList.remove('body_closed');
                Myform.reset();
            });

            body.classList.add('body_closed');
            overlayform.addEventListener('click', e => {

                if (e.target === overlayform) {
                    overlayform.style.display = 'none';
                    body.classList.remove('body_closed');
                    Myform.reset();
                }
            });
        });
    }

});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }

    if (!validateField(form.elements.phone)) {
        valid = false;
    }

    if (!validateField(form.elements.street)) {
        valid = false;
    }

    if (!validateField(form.elements.house)) {
        valid = false;
    }

    if (!validateField(form.elements.apartament)) {
        valid = false;
    }

    if (!validateField(form.elements.floor)) {
        valid = false;
    }

    return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
}

$(function(){
    //2. Получить элемент, к которому необходимо добавить маску
    $("#phone").mask("8(999) 999-9999"); // Маска для input с номером телефона
  });