const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');
const navLinks = document.querySelectorAll(".navigation a");

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');  
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    localStorage.setItem("activeLink", link.href);
  });
});

const activeHref = localStorage.getItem("activeLink");
if (activeHref) {
  navLinks.forEach(link => {
    if (link.href === activeHref) {
      link.style.backgroundColor = "#eee";
    }
  });
}