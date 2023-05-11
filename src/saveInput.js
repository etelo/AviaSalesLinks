const resetButton = document.getElementById("reset-button");
resetButton.style.display = "none";

resetButton.addEventListener("click", () => {
  localStorage.clear(); // Очистить localStorage
  location.reload(); // Перезагрузить страницу
});

// Получаем ссылки на поля ввода
const cityFromInput = document.getElementById("departureCity");
const cityToSelect = document.getElementById("arrivalCity");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const daysBetween = document.getElementById("daysBetween");
const daysCorrect = document.getElementById("daysCorrect");

// Функция для сохранения значений в Local Storage
function saveToLocalStorage() {
  localStorage.setItem("departureCity", cityFromInput.value);
  localStorage.setItem("arrivalCity", cityToSelect.value);

  localStorage.setItem("startDate", startDate.value);
  localStorage.setItem("endDate", endDate.value);
  localStorage.setItem("daysBetween", daysBetween.value);
  localStorage.setItem("daysCorrect", daysCorrect.value);
}

// Функция для восстановления значений из Local Storage
function restoreFromLocalStorage() {
  if (localStorage.getItem("departureCity")) {
    cityFromInput.value = localStorage.getItem("departureCity");
  }
  if (localStorage.getItem("arrivalCity")) {
    cityToSelect.value = localStorage.getItem("arrivalCity");
  }

  if (localStorage.getItem("startDate")) {
    startDate.value = localStorage.getItem("startDate");
  }
  if (localStorage.getItem("endDate")) {
    endDate.value = localStorage.getItem("endDate");
  }
  if (localStorage.getItem("daysBetween")) {
    daysBetween.value = localStorage.getItem("daysBetween");
  }
  if (localStorage.getItem("daysCorrect")) {
    daysCorrect.value = localStorage.getItem("daysCorrect");
  }
}

// Добавляем обработчики событий изменения для полей ввода
cityFromInput.addEventListener("change", saveToLocalStorage);
cityToSelect.addEventListener("change", saveToLocalStorage);

startDate.addEventListener("change", saveToLocalStorage);
endDate.addEventListener("change", saveToLocalStorage);
daysBetween.addEventListener("change", saveToLocalStorage);
daysCorrect.addEventListener("change", saveToLocalStorage);
daysBetween.addEventListener("wheel", saveToLocalStorage);
daysCorrect.addEventListener("wheel", saveToLocalStorage);

// Восстанавливаем значения из Local Storage при загрузке страницы
restoreFromLocalStorage();
