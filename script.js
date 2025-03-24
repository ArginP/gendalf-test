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