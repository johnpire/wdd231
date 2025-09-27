const membersData = 'data/members.json';

// randomizes 3 members
async function randomizeMembers() {
  try {
    const response = await fetch(membersData);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const companies = data.companies;

      // get companies with membership level of gold/silver | 3 = gold / 2 = silver / 1 = bronze
      const goldSilverMembers = companies.filter(company =>
        company.membership === 3 || company.membership === 2
      );

      // if the num of companies with silver and gold mimbership is < 3
      const maxMembers = Math.min(goldSilverMembers.length, 3);

      // randomize
      const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());
      const randomizedMembers = shuffled.slice(0, maxMembers);
      return randomizedMembers;
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
} 

let randomizedMembers = [];
randomizeMembers().then(members => {
  randomizedMembers = members;
  createSpotlightCard(randomizedMembers);
});

function createSpotlightCard(randomizedMembers) {
  document.querySelector("#spotlight").innerHTML = "";
  randomizedMembers.forEach(member => {
    let card = document.createElement("section");
    let name = document.createElement("h3");
    let logo = document.createElement("img")

    let infoDiv = document.createElement("div"); // div for the variables below
    let phone = document.createElement("p");
    let address =  document.createElement("p");
    let website = document.createElement("a");
    let membership = document.createElement("p");
    
    // name
    name.textContent = member.name
    // logo
    logo.setAttribute('src', `images/company_logos/${member.image}`);
    logo.setAttribute('alt', `Portrait of ${member.name}`);
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('width', '100');
    logo.setAttribute('height', '100');
    // info
    phone.innerHTML = `<b>Phone:</b> ${member.phone}`;
    address.innerHTML = `<b>Address:</b> ${member.address}`;
      // website
    website.textContent = `Visit Website`;
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    membership.innerHTML = setMembership(member.membership);

    // append to 'infoDiv' parent
    infoDiv.appendChild(phone);
    infoDiv.appendChild(address);
    infoDiv.appendChild(website);
    infoDiv.appendChild(membership);

    // append to 'card' parent
    card.appendChild(name);
    card.appendChild(logo);
    card.appendChild(infoDiv);

    document.querySelector("#spotlight").appendChild(card);
  });
}

function setMembership(membershipNum) { // 1 = bronze | 2 = silver | 3 = gold
  if (membershipNum === 1) return '<span class="bronze">Bronze</span>';
  if (membershipNum === 2) return '<span class="silver">Silver</span>';
  if (membershipNum === 3) return '<span class="gold">Gold</span>';
  return '<span>Unknown</span>';
}