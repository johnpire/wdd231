const membersData = 'data/members.json';
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const cards = document.querySelector('#cards');

gridbutton.addEventListener("click", () => {
	cards.classList.add("grid");
	cards.classList.remove("list");

    gridbutton.classList.add("active");
    listbutton.classList.remove("active");
});



listbutton.addEventListener("click", showList);

function showList() {
	cards.classList.add("list");
	cards.classList.remove("grid");

    listbutton.classList.add("active");
    gridbutton.classList.remove("active");
}   

const getMemberData = async () => {
  try {
    const response = await fetch(membersData);
    const data = await response.json();
    displayMembers(data.companies);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getMemberData();

const displayMembers = (companies) => {
  companies.forEach((company) => {
    let card = document.createElement('section');
    let companyImage = document.createElement('img');
    let companyName = document.createElement('h3');
    let companyAddress = document.createElement('p');
    let companyPhone = document.createElement('p');
    let companyWebsite = document.createElement('a');

    // Image
    companyImage.setAttribute('src', `images/company_logos/${company.image}`);
    companyImage.setAttribute('alt', `Portrait of ${company.name}`);
    companyImage.setAttribute('loading', 'lazy');
    companyImage.setAttribute('width', '200');
    companyImage.setAttribute('height', '200');

    // Text fields
    companyName.textContent = company.name;
    companyAddress.textContent = company.address;
    companyPhone.textContent = company.phone;

    // Website link
    companyWebsite.textContent = "Visit Website";
    companyWebsite.href = company.website;
    companyWebsite.target = "_blank";
    companyWebsite.rel = "noopener noreferrer";

    // Append everything
    card.appendChild(companyImage);
    card.appendChild(companyName);
    card.appendChild(companyAddress);
    card.appendChild(companyPhone);
    card.appendChild(companyWebsite);

    cards.appendChild(card);
  });
}