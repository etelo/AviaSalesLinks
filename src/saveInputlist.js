// Получаем элементы формы
const departureCityInput = document.getElementById('departureCity');
const destinationCityInput = document.getElementById('destinationCity');
const daysBetweenInput = document.getElementById('daysBetween');

// Получаем кнопку "Сохранить"
const saveButton = document.getElementById('save-button');

// Получаем выпадающий список сохраненных полетов
const savedFlightsSelect = document.getElementById('saved-flights');

// Обработчик события "click" на кнопке "Сохранить"
saveButton.addEventListener('click', () => {
  // Считываем значения полей формы
  const departureCity = departureCityInput.value;
  const destinationCity = destinationCityInput.value;
  const daysBetween = daysBetweenInput.value;

  // Создаем объект с данными формы
  const flightData = { departureCity, destinationCity, daysBetween };

  // Получаем массив сохраненных полетов из Local Storage
  const savedFlights = JSON.parse(localStorage.getItem('savedFlights')) || [];

  // Добавляем новый полет в массив сохраненных полетов
  savedFlights.push(flightData);

  // Сохраняем обновленный массив сохраненных полетов в Local Storage
  localStorage.setItem('savedFlights', JSON.stringify(savedFlights));

  // Обновляем выпадающий список сохраненных полетов
  updateSavedFlightsSelect(savedFlights);
