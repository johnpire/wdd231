const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');
const allLinks = document.querySelectorAll('a[href="index.html"], a[href="directory.html"], a[href="join.html"], a[href="discover.html"]');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');  
});

allLinks.forEach(link => {
  link.addEventListener("click", () => {
    localStorage.setItem("activeLink", link.href);
  });
});

const activeHref = localStorage.getItem("activeLink");
if (activeHref) {
  allLinks.forEach(link => {
    if (link.href === activeHref) {
      link.style.backgroundColor = "#eee";
    }
  });
}