const memberships = [
  {
    level: "Non-Profit",
    color: "beige",
    subtitle: "Non-Profit Organization Pack",
    cost: 0,
    description: "Designed for registered non-profit organizations. Enjoy essential membership access with no fee.",
    benefits: [
      "Access to community events",
      "Listing in member directory",
      "Networking opportunities"
    ],
  },
  {
    level: "Bronze",
    color: "bronze",
    subtitle: "Starter Pack",
    cost: 100,
    description: "Perfect for small businesses starting out. Gain visibility and basic member benefits.",
    benefits: [
      "Business listing on chamber website",
      "Discounts on select events",
      "Monthly newsletter access"
    ]
  },
  {
    level: "Silver",
    color: "silver",
    subtitle: "Growth Pack",
    cost: 250,
    description: "Ideal for growing businesses that want more exposure and networking opportunities.",
    benefits: [
      "Priority business listing with logo",
      "Access to workshops and training",
      "Invitations to networking luncheons",
      "Social media promotion"
    ]
  },
  {
    level: "Gold",
    color: "gold",
    subtitle: "Premium Pack",
    cost: 500,
    description: "Exclusive benefits for established businesses seeking maximum visibility and influence.",
    benefits: [
      "Featured placement on chamber website",
      "Free booth at annual expo",
      "One-on-one business consulting",
      "Priority sponsorship opportunities",
      "Full access to premium networking events"
    ]
  }
];

function createMembershipTemplate(memberships) {
  const container = document.querySelector("#membership-section");

  memberships.forEach(membership => {
    let membershipDiv = document.createElement("button");
    let name = document.createElement("h3");

    name.textContent = `${membership.level}`;
    membershipDiv.appendChild(name);

    membershipDiv.classList.add(`${membership.color}`);

    container.appendChild(membershipDiv);

    membershipDiv.addEventListener('click', () => {
    displayMembershipDetails(membership);
    });
  });
}

function displayMembershipDetails(membership) {
  const modalDisplay = document.querySelector("#membership-modal")
  modalDisplay.innerHTML = '';
  modalDisplay.innerHTML = `
    <button id="closeModal">✖</button>
    <h2 class="${membership.color}">${membership.level}</h2>
    <h3>${membership.subtitle}</h3>
    <p>${membership.description}</p>
    <p><b>Benefits:</b>${"<br>" + membership.benefits.map(benefit => `• ${benefit}`).join("<br>")}</p>
    <p>${membership.cost}$ / <b>month</b></p>
  `;
  modalDisplay.showModal();

  const closeModal = document.querySelector("#closeModal");
  closeModal.addEventListener("click", () => {
    modalDisplay.close();
  });
}

createMembershipTemplate(memberships)