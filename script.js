// Получаем ссылки на поля формы
var departureDateInput = document.getElementById('departureDate');
var returnDateInput = document.getElementById('returnDate');
var numberOfDaysInput = document.getElementById('numberOfDays');

// Получаем ссылку на кнопку генерации ссылок
var generateLinksButton = document.getElementById('generateLinksButton');

// Получаем ссылку на контейнер для вывода ссылок
var linksContainer = document.getElementById('linksContainer');


function generateLinks() {
  // Получаем значения полей формы
  const dateFrom = document.getElementById("date-from").value;
  const dateTo = document.getElementById("date-to").value;
  const days = parseInt(document.getElementById("days").value);

  // Создаем массив ссылок
  const links = [];
  let currentDate = dateFrom;
  while (currentDate <= dateTo) {
    const year = currentDate.substr(2);
    const link = `https://www.aviasales.ru/search/LED${currentDate}BKK${currentDate.slice(0, 2)}${parseInt(currentDate.slice(2)) + days}${year}`;
    links.push(link);

    // Увеличиваем дату на 1 месяц
    const month = parseInt(currentDate.slice(2, 4));
    if (month == 12) {
      currentDate = `${parseInt(currentDate) + 89}`; // Начинаем следующий год
    } else {
      currentDate = currentDate.slice(0, 2) + `${month + 1}`.padStart(2, "0"); // Увеличиваем месяц
    }
  }

  // Выводим ссылки на страницу
  const linksContainer = document.getElementById("links-container");
  linksContainer.innerHTML = "";
  for (let link of links) {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.innerText = link;
    linksContainer.appendChild(linkElement);
    linksContainer.appendChild(document.createElement("br"));
  }
}
