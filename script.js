// --- Управление активности кнопок прокрутки слайдера "Живая лента" ---
window.addEventListener("resize", () => {
    const viewWidth = window.innerWidth;
    const feedSliderPrevBtn = document.querySelector('#feedSliderPrevBtn');
    const feedSliderNextBtn = document.querySelector('#feedSliderNextBtn');

    if (viewWidth < 1280) {
        feedSliderPrevBtn.disabled = false;
        feedSliderNextBtn.disabled = false;
    } else {
        feedSliderPrevBtn.disabled = true;
        feedSliderNextBtn.disabled = true;
    }
});

// --- Логика работы прокрутки слайдера "Наши ценности" ---
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('#valuesSliderWrapper');
    const slider = document.querySelector('#valuesSliderItemContainer');
    const prevBtn = document.querySelector('#valuesSliderPrevBtn');
    const nextBtn = document.querySelector('#valuesSliderNextBtn');

    let currentPosition = 0;
    const itemWidth = slider.querySelector('.main__values-section__item').offsetWidth + 37; // Ширина элемента + gap
    const visibleWidth = wrapper.offsetWidth; // Ширина видимой области
    const totalWidth = slider.scrollWidth; // Полная ширина всех элементов

    // Максимальный сдвиг вправо: когда правый край слайдера достигает правого края врапера
    const maxScroll = -(totalWidth - visibleWidth); // Текущий максимум (весь контент уходит влево)
    const newMaxScroll = 0; // Правый край контента не уходит левее правой границы wrapper

    nextBtn.addEventListener('click', () => {
        // Ограничиваем сдвиг так, чтобы правый край не уходил дальше видимой области
        if (currentPosition > maxScroll) {
            currentPosition -= itemWidth;
            // Убеждаемся, что не превышаем максимальный сдвиг
            currentPosition = Math.max(currentPosition, maxScroll);
            slider.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            // Убеждаемся, что не уходим левее начальной позиции
            currentPosition = Math.min(currentPosition, newMaxScroll);
            slider.style.transform = `translateX(${currentPosition}px)`;
        }
    });
});

// --- Логика работы прокрутки слайдера "Живая лента" ---
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('#feedSliderWrapper');
    const slider = document.querySelector('#feedSliderItemContainer');
    const feedSliderPrevBtn = document.querySelector('#feedSliderPrevBtn');
    const feedSliderNextBtn = document.querySelector('#feedSliderNextBtn');

    let currentPosition = 0;
    const itemWidth = slider.querySelector('.main__feed-section__item').offsetWidth + 75; // Ширина элемента + gap
    const visibleWidth = wrapper.offsetWidth; // Ширина видимой области
    const totalWidth = slider.scrollWidth; // Полная ширина всех элементов

// Максимальный сдвиг вправо: когда правый край слайдера достигает правого края врапера
    const maxScroll = -(totalWidth - visibleWidth + 100); // Текущий максимум (весь контент уходит влево)
    const newMaxScroll = 0; // Правый край контента не уходит левее правой границы wrapper

    feedSliderNextBtn.addEventListener('click', () => {
        // Ограничиваем сдвиг так, чтобы правый край не уходил дальше видимой области
        if (currentPosition > maxScroll) {
            currentPosition -= itemWidth;
            // Убеждаемся, что не превышаем максимальный сдвиг
            currentPosition = Math.max(currentPosition, maxScroll);
            slider.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    feedSliderPrevBtn.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            // Убеждаемся, что не уходим левее начальной позиции
            currentPosition = Math.min(currentPosition, newMaxScroll);
            slider.style.transform = `translateX(${currentPosition}px)`;
        }
    });
});

// --- Логика работы формы ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const inputs = {
        name: document.getElementById('nameInput'),
        phone: document.getElementById('phoneInput'),
        email: document.getElementById('emailInput'),
        vacancy: document.getElementById('vacancyInput'),
    };
    const uploadButton = document.querySelector('.main__contact-section__form__button-group--upload');

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    form.appendChild(fileInput);

    // Функция валидации одного поля
    function validateField(input) {
        const value = input.value.trim();
        const pattern = input.pattern ? new RegExp(input.pattern) : null;
        let isValid = true;

        switch (input.id) {
            case 'nameInput':
                isValid = value.length >= 2 && pattern.test(value);
                break;
            case 'phoneInput':
                isValid = pattern.test(value);
                break;
            case 'emailInput':
                isValid = pattern.test(value);
                break;
            case 'vacancyInput':
                isValid = value.length >= 2 && pattern.test(value);
                break;
        }

        return isValid;
    }

    // Функция обновления стилей
    function updateFieldState(input, isValid) {
        const wrapper = input.closest('.main__contact-section__form-field-wrapper');
        if (isValid) {
            wrapper.classList.remove('main__contact-section__form-field-wrapper--error');
            wrapper.classList.add('main__contact-section__form-field-wrapper--clear'); // на обертке значок
            input.classList.remove('main__contact-section__form-fields_text-input--error');
            input.classList.add('main__contact-section__form-fields_text-input--clear'); // на поле ввода рамка
        } else {
            wrapper.classList.remove('main__contact-section__form-field-wrapper--clear');
            wrapper.classList.add('main__contact-section__form-field-wrapper--error');
            input.classList.remove('main__contact-section__form-fields_text-input--clear');
            input.classList.add('main__contact-section__form-fields_text-input--error');
        }
    }

    // Валидация при потере фокуса
    Object.values(inputs).forEach(input => {
        input.addEventListener('blur', () => {
            const isValid = validateField(input);
            updateFieldState(input, isValid);
        });

        // Проверка при вводе после ошибки
        input.addEventListener('input', () => {
            if (input.classList.contains('main__contact-section__form-fields_text-input--error')) {
                const isValid = validateField(input);
                updateFieldState(input, isValid);
            }
        });
    });

    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            uploadButton.innerHTML = `Прикреплено: ${fileName} <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 20.2553C27.9066 20.8533 27.7731 21.4445 27.6004 22.0251C27.2217 23.2159 26.5251 24.2853 25.5831 25.1221C24.6411 25.959 23.488 26.5326 22.2438 26.7835C21.0064 27.0926 19.7074 27.0704 18.4817 26.7192C17.2561 26.368 16.1486 25.7006 15.2747 24.7865C10.7454 20.3655 6.2302 15.9308 1.729 11.4823C0.793851 10.611 0.196928 9.4469 0.0408276 8.1902C-0.115273 6.9335 0.179199 5.66264 0.873631 4.59605C1.37057 3.76237 2.09107 3.07873 2.95653 2.61971C3.82199 2.16069 4.79917 1.94393 5.78148 1.99306C6.52065 1.99805 7.25121 2.14943 7.92945 2.43814C8.60769 2.72684 9.21967 3.14694 9.72879 3.6733C13.6177 7.48827 17.5042 11.3055 21.3884 15.1251C22.0966 15.786 22.5137 16.6926 22.5507 17.6513C22.5878 18.6101 22.2418 19.5451 21.5867 20.2568C20.9316 20.9685 20.0192 21.4006 19.0443 21.4608C18.0694 21.521 17.1091 21.2045 16.3684 20.579L16.0669 20.3035L5.92871 10.3736C5.77245 10.2567 5.65551 10.0964 5.59301 9.91344C5.53051 9.73052 5.52534 9.53339 5.57815 9.34755C5.61987 9.21128 5.69381 9.08663 5.79395 8.9838C5.89408 8.88096 6.01756 8.80285 6.15431 8.75584C6.29105 8.70884 6.43718 8.69427 6.58075 8.71333C6.72432 8.73239 6.86126 8.78453 6.98039 8.86551C7.07891 8.94493 7.17256 9.03001 7.26084 9.1203C10.6496 12.4119 14.008 15.7035 17.3359 18.9952C17.584 19.279 17.9127 19.4837 18.2799 19.5831C18.6471 19.6824 19.0361 19.672 19.3972 19.5529C19.6785 19.4601 19.9333 19.3029 20.1406 19.0943C20.3478 18.8857 20.5017 18.6317 20.5893 18.3532C20.677 18.0748 20.696 17.7798 20.6447 17.4927C20.5935 17.2056 20.4735 16.9346 20.2947 16.702C20.1965 16.585 20.0914 16.4679 19.9862 16.3646L8.4247 5.00922C7.75095 4.32315 6.83389 3.91853 5.8642 3.8795C4.8945 3.84047 3.94681 4.17004 3.21817 4.79968C2.48952 5.42931 2.036 6.31056 1.95191 7.26018C1.86782 8.2098 2.15963 9.15471 2.76666 9.89844C2.87884 10.0224 2.99803 10.1463 3.12423 10.2703C7.58336 14.6545 12.0472 19.0388 16.5156 23.423C17.3119 24.2591 18.3576 24.8257 19.5024 25.0413C20.4551 25.2208 21.439 25.152 22.3562 24.8419C23.2734 24.5318 24.0919 23.9911 24.7301 23.2736C25.3684 22.5562 25.8042 21.6871 25.9941 20.7528C26.184 19.8185 26.1214 18.8516 25.8125 17.9484C25.5168 17.0981 25.0165 16.3303 24.3542 15.7104L10.0934 1.68318C9.94191 1.56827 9.8271 1.4132 9.76249 1.23626C9.69789 1.05933 9.68619 0.867927 9.72879 0.684673C9.7671 0.536924 9.84262 0.401012 9.94843 0.289447C10.0542 0.177881 10.1869 0.0942455 10.3342 0.046238C10.4816 -0.00176947 10.6388 -0.0126066 10.7915 0.0147239C10.9443 0.0420544 11.0875 0.106675 11.2082 0.202637C11.2853 0.264613 11.3554 0.340361 11.4255 0.409224L25.7143 14.4365C26.7918 15.4812 27.5247 16.82 27.8177 18.279C27.8738 18.5613 27.9159 18.8437 27.9649 19.126L28 20.2553Z" fill="#9BCC37"/></svg>`;
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем отправку по умолчанию

        let allValid = true;
        Object.values(inputs).forEach(input => {
            const isValid = validateField(input);
            updateFieldState(input, isValid);
            if (!isValid) allValid = false;
        });

        if (allValid) {
            const formData = new FormData(form);
            formData.append('file', fileInput.files[0]);

            alert('Заявка отправлена');
            form.reset();
            fileInput.value = '';
            uploadButton.innerHTML = `Прикрепить резюме <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 20.2553C27.9066 20.8533 27.7731 21.4445 27.6004 22.0251C27.2217 23.2159 26.5251 24.2853 25.5831 25.1221C24.6411 25.959 23.488 26.5326 22.2438 26.7835C21.0064 27.0926 19.7074 27.0704 18.4817 26.7192C17.2561 26.368 16.1486 25.7006 15.2747 24.7865C10.7454 20.3655 6.2302 15.9308 1.729 11.4823C0.793851 10.611 0.196928 9.4469 0.0408276 8.1902C-0.115273 6.9335 0.179199 5.66264 0.873631 4.59605C1.37057 3.76237 2.09107 3.07873 2.95653 2.61971C3.82199 2.16069 4.79917 1.94393 5.78148 1.99306C6.52065 1.99805 7.25121 2.14943 7.92945 2.43814C8.60769 2.72684 9.21967 3.14694 9.72879 3.6733C13.6177 7.48827 17.5042 11.3055 21.3884 15.1251C22.0966 15.786 22.5137 16.6926 22.5507 17.6513C22.5878 18.6101 22.2418 19.5451 21.5867 20.2568C20.9316 20.9685 20.0192 21.4006 19.0443 21.4608C18.0694 21.521 17.1091 21.2045 16.3684 20.579L16.0669 20.3035L5.92871 10.3736C5.77245 10.2567 5.65551 10.0964 5.59301 9.91344C5.53051 9.73052 5.52534 9.53339 5.57815 9.34755C5.61987 9.21128 5.69381 9.08663 5.79395 8.9838C5.89408 8.88096 6.01756 8.80285 6.15431 8.75584C6.29105 8.70884 6.43718 8.69427 6.58075 8.71333C6.72432 8.73239 6.86126 8.78453 6.98039 8.86551C7.07891 8.94493 7.17256 9.03001 7.26084 9.1203C10.6496 12.4119 14.008 15.7035 17.3359 18.9952C17.584 19.279 17.9127 19.4837 18.2799 19.5831C18.6471 19.6824 19.0361 19.672 19.3972 19.5529C19.6785 19.4601 19.9333 19.3029 20.1406 19.0943C20.3478 18.8857 20.5017 18.6317 20.5893 18.3532C20.677 18.0748 20.696 17.7798 20.6447 17.4927C20.5935 17.2056 20.4735 16.9346 20.2947 16.702C20.1965 16.585 20.0914 16.4679 19.9862 16.3646L8.4247 5.00922C7.75095 4.32315 6.83389 3.91853 5.8642 3.8795C4.8945 3.84047 3.94681 4.17004 3.21817 4.79968C2.48952 5.42931 2.036 6.31056 1.95191 7.26018C1.86782 8.2098 2.15963 9.15471 2.76666 9.89844C2.87884 10.0224 2.99803 10.1463 3.12423 10.2703C7.58336 14.6545 12.0472 19.0388 16.5156 23.423C17.3119 24.2591 18.3576 24.8257 19.5024 25.0413C20.4551 25.2208 21.439 25.152 22.3562 24.8419C23.2734 24.5318 24.0919 23.9911 24.7301 23.2736C25.3684 22.5562 25.8042 21.6871 25.9941 20.7528C26.184 19.8185 26.1214 18.8516 25.8125 17.9484C25.5168 17.0981 25.0165 16.3303 24.3542 15.7104L10.0934 1.68318C9.94191 1.56827 9.8271 1.4132 9.76249 1.23626C9.69789 1.05933 9.68619 0.867927 9.72879 0.684673C9.7671 0.536924 9.84262 0.401012 9.94843 0.289447C10.0542 0.177881 10.1869 0.0942455 10.3342 0.046238C10.4816 -0.00176947 10.6388 -0.0126066 10.7915 0.0147239C10.9443 0.0420544 11.0875 0.106675 11.2082 0.202637C11.2853 0.264613 11.3554 0.340361 11.4255 0.409224L25.7143 14.4365C26.7918 15.4812 27.5247 16.82 27.8177 18.279C27.8738 18.5613 27.9159 18.8437 27.9649 19.126L28 20.2553Z" fill="#9BCC37"/></svg>`;
            Object.values(inputs).forEach(input => {
                const wrapper = input.closest('.main__contact-section__form-field-wrapper');
                wrapper.classList.remove('main__contact-section__form-field-wrapper--clear');
                wrapper.classList.remove('main__contact-section__form-field-wrapper--error');
                input.classList.remove('main__contact-section__form-fields_text-input--clear');
                input.classList.remove('main__contact-section__form-fields_text-input--error');
            });

            console.log('Form Data:', Object.fromEntries(formData));
        } else {
            alert('Пожалуйста, заполните обязательные поля');
        }
    });
});