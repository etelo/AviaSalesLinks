function generateLinks() {
  // Получаем значения из элементов формы
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const daysBetween = document.getElementById("daysBetween").value+1;

  // Преобразуем введенные даты в объекты типа Date
  const startDateObject = new Date(`1910-${startDate.slice(2)}-${startDate.slice(0, 2)}`);
  const endDateObject = new Date(`1910-${endDate.slice(2)}-${endDate.slice(0, 2)}`);

  // Получаем ссылку на контейнер, куда будут добавляться ссылки
  const linksContainer = document.getElementById("links");

  // Удаляем все ранее созданные элементы ссылок
  while (linksContainer.firstChild) {
    linksContainer.removeChild(linksContainer.firstChild);
  }

  // Создаем цикл для создания ссылок на каждый день между указанными датами
  let currentDateObject = startDateObject;
  while (currentDateObject <= endDateObject) {
    // Форматируем текущую дату и дату через заданное количество дней
    const formattedStartDate = formatDate(currentDateObject);
    const formattedEndDate = formatDate(
      new Date(currentDateObject.getTime() + daysBetween * 24 * 60 * 60 * 1000)
    );
    // Формируем ссылку на страницу Aviasales с заданными параметрами
    const link = `https://www.aviasales.ru/search/LED${formattedStartDate}BKK${formattedEndDate}1`;
    // Создаем элемент ссылки и добавляем ее в контейнер
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.textContent = link;
    linksContainer.appendChild(linkElement);
    linksContainer.appendChild(document.createElement("br"));
    // Увеличиваем текущую дату на 1 день
    currentDateObject = new Date(currentDateObject.getTime() + 24 * 60 * 60 * 1000);
  }
}

// Функция форматирования даты в нужный формат
function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}${month}`;
}
