const cityCodeMap = {
  moscow: "MOW",
  stpetersburg: "LED",
  bangkok: "BKK",
  samui: "USM",
  phuket: "HKT",
  pattaya: "UTP",
  minsk: "MSQ",
  haikou: "HAK",
};
// получаем элемент чекбокса
const myCheckbox = document.getElementById("myCheckbox");
const forParser = myCheckbox.checked ? "option1" : "option2"; // устанавливаем переменную forParser в зависимости от состояния чекбокса
const myCheckbox2 = document.getElementById("myCheckbox2");

// function handleClick() {
//   const forParser = myCheckbox.checked ? "option1" : "option2";
//   console.log(forParser); // выводим значение переменной forParser в консоль
// }

let i_count_let = 0;

function generateLinks() {
  // Получаем значения из элементов формы
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const daysBetween = parseInt(document.getElementById("daysBetween").value);
  const daysCorrect = parseInt(document.getElementById("daysCorrect").value);
  const cityFromInput = document.getElementById("departureCity");
  const cityToSelectInput = document.getElementById("arrivalCity");
  const i_count = document.getElementById("i_count");

  // Преобразуем введенные даты в объекты типа Date
  const startDateObject = new Date(startDate);
  // console.log(startDateObject);
  // console.log(convertDateToDDMM(startDateObject));

  const endDateObject = new Date(endDate);
  // console.log(endDateObject);

  // Получаем ссылку на контейнер, куда будут добавляться ссылки
  const linksContainer = document.getElementById("links");

  // Удаляем все ранее созданные элементы ссылок
  if (!myCheckbox2.checked) {
    while (linksContainer.firstChild) {
      linksContainer.removeChild(linksContainer.firstChild);
    }
  }

  // Создаем цикл для создания ссылок на каждый день между указанными датами
  let currentDateObject = startDateObject;
  let i = getDaysBetweenDates(startDateObject, endDateObject);
  if (myCheckbox2.checked) {
    i_count_let += 1;
  }
  else{
    i_count_let = 0;
  }

  

  while (i > 0) {

    // console.log("i", i);
    i--;
    // Форматируем текущую дату и дату через заданное количество дней
    const formattedStartDate = convertDateToDDMM(currentDateObject);
    const endDate = dataPlusDay(currentDateObject, parseInt(daysBetween));

    for (let index = 0; index <= daysCorrect; index++) {
      i_count_let += 1;
      i_count.innerHTML = ` Ссылок: ${i_count_let}`;
      const formattedEndDate = convertDateToDDMM(dataMinusDay(endDate, index));
      const from = cityCodeMap[cityFromInput.value];
      const to = cityCodeMap[cityToSelectInput.value];
      // Формируем ссылку на страницу Aviasales с заданными параметрами
      const link = `https://www.aviasales.ru/search/${from}${formattedStartDate}${to}${formattedEndDate}1`;
      // Создаем элемент ссылки и добавляем ее в контейнер
      const linkElement = document.createElement("a");
      linkElement.href = link;
      linkElement.rel = "noopener noreferrer";
      linkElement.target = "_blank";
      // !myCheckbox.checked
      //   ? (linkElement.textContent = link + ` (${daysBetween - index}дней)`)
      //   : (linkElement.textContent = link);
      linkElement.textContent = link + ` (${daysBetween - index}days)`;
      linksContainer.appendChild(linkElement);
      linksContainer.appendChild(document.createElement("br"));
      linkElement.addEventListener("mousedown", function () {
        linkElement.style.color = "red";
      });
    }
    if (daysCorrect > 0 && !myCheckbox.checked) {
      linksContainer.appendChild(document.createElement("br"));
    }

    // // Увеличиваем текущую дату на 1 день
    currentDateObject = dataPlusDay(currentDateObject, 1);
  }
}

// Функция форматирования даты в нужный формат
function convertDateToDDMM(dateString) {
  const date = new Date(dateString); // создаем объект даты из переданной строки
  const day = date.getDate().toString().padStart(2, "0"); // получаем день месяца и преобразуем в строку с добавлением нуля в начале, если нужно
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // получаем номер месяца (начинается с 0) и добавляем 1, чтобы получить корректный номер месяца, затем преобразуем в строку с добавлением нуля в начале, если нужно
  return day + month; // объединяем день и месяц в одну строку
}

function dataPlusDay(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toString();
}

function dataMinusDay(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - days);
  return date.toString();
}

function getDaysBetweenDates(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

const daysBetweenInput = document.getElementById("daysBetween");
daysBetweenInput.addEventListener("wheel", function (e) {
  e.preventDefault();
  const delta = -Math.sign(e.deltaY);
  this.value = Math.max(Number(this.min), Math.min(Number(this.max), Number(this.value) + delta));
});
const daysCorrectInput = document.getElementById("daysCorrect");
daysCorrectInput.addEventListener("wheel", function (e) {
  e.preventDefault();
  const delta = -Math.sign(e.deltaY);
  this.value = Math.max(Number(this.min), Math.min(Number(this.max), Number(this.value) + delta));
});
