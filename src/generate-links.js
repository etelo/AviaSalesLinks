function generateLinks() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const daysBetween = document.getElementById("daysBetween").value+1;

  const startDateObject = new Date(`1910-${startDate.slice(2)}-${startDate.slice(0, 2)}`);
  const endDateObject = new Date(`1910-${endDate.slice(2)}-${endDate.slice(0, 2)}`);

  const linksContainer = document.getElementById("links");
  while (linksContainer.firstChild) {
    linksContainer.removeChild(linksContainer.firstChild);
  }

  let currentDateObject = startDateObject;
  while (currentDateObject <= endDateObject) {
    const formattedStartDate = formatDate(currentDateObject);
    const formattedEndDate = formatDate(
      new Date(currentDateObject.getTime() + daysBetween * 24 * 60 * 60 * 1000)
    );
    const link = `https://www.aviasales.ru/search/LED${formattedStartDate}BKK${formattedEndDate}1`;
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.textContent = link;
    linksContainer.appendChild(linkElement);
    linksContainer.appendChild(document.createElement("br"));
    currentDateObject = new Date(currentDateObject.getTime() + 24 * 60 * 60 * 1000);
  }
}

function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}${month}`;
}


