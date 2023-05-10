const { spawn } = require('child_process');

const openAllLinksButton = document.getElementById("openAllLinks");

openAllLinksButton.addEventListener("click", (event) => {
  event.preventDefault();
  const allLinks = document.querySelectorAll("a");
  const linkUrls = [];
  allLinks.forEach((link) => {
    linkUrls.push(link.href);
    link.setAttribute("rel", "noopener"); // добавляем атрибут rel="noopener" к ссылке
  });

  const newTab = window.open();
  linkUrls.forEach((url) => {
    newTab.location.href = url; 
  });
});
