const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

const today = new Date();
const year = document.querySelector("#currentyear");
year.textContent = today.getFullYear();

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');  
});

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modification: ${document.lastModified}`;