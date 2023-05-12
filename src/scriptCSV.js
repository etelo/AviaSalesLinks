// Получаем ссылку на элемент input типа file
const fileInput = document.getElementById('csv-file');
// Получаем ссылку на элемент div для таблицы
const tableDiv = document.getElementById('table');
// Определяем функцию для загрузки файла
fileInput.addEventListener('change', (event) => {
  // Получаем ссылку на выбранный файл
  const file = event.target.files[0];
  // Создаем объект FileReader для чтения файла
  const reader = new FileReader();
  // Определяем функцию для чтения файла
  reader.addEventListener('load', (event) => {
    // Получаем содержимое файла в виде строки
    const csvData = event.target.result;
    // Анализируем CSV-данные с помощью библиотеки Papa Parse
    const parsedData = Papa.parse(csvData, { header: true });
    // Строим таблицу с помощью библиотеки Tabulator
    const table = new Tabulator(tableDiv, {
      data: parsedData.data,
      columns: parsedData.meta.fields.map(field => ({ title: field, field })),
      layout: 'fitColumns',
      pagination: 'local',
      paginationSize: 2000,
      movableColumns: true,
      resizableColumns: true,
      initialSort: [{ column: parsedData.meta.fields[0], dir: 'asc' }]
    });

    // Добавляем обработчики событий для фильтрации таблицы
    const filterInputs = tableDiv.querySelectorAll('.filter-input');
    filterInputs.forEach(input => {
      input.addEventListener('keyup', () => {
        const filters = [];
        filterInputs.forEach(input => {
          const column = input.getAttribute('data-column');
          const value = input.value;
          if (value) {
            filters.push({ field: column, type: 'like', value: `%${value}%` });
          }
        });
        table.setFilter(filters);
      });
    });
  });
  // Читаем файл как текстовый файл
  reader.readAsText(file);
});
