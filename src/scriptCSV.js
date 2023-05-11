google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  // Загружаем файл CSV
  const url = 'data.csv';
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Анализируем файл CSV и создаем массив данных для таблицы
      const csv = this.responseText;
      const data = new google.visualization.DataTable();
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      for (let i = 0; i < headers.length; i++) {
        data.addColumn('string', headers[i]);
      }
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        data.addRow(values);
      }
      // Создаем таблицу
      const table = new google.visualization.Table(document.getElementById('table_div'));
      table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}
