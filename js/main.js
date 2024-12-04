const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".order__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".event__content", {
  duration: 1000,
});


////////////////////////////////////////////////////////////////////////////////
// Variables globales
// Variables globales
// Tableau des plats


// Références DOM
const orderGrid = document.getElementById("orderGrid");
const modal = document.getElementById("orderModal");
const closeButton = document.querySelector(".close-button");
const orderForm = document.getElementById("orderForm");
const itemNameInput = document.getElementById("itemName");
const quantityInput = document.getElementById("quantity");
const totalPriceElement = document.getElementById("totalPrice");

// Variable pour stocker le prix unitaire
let unitPrice = 0;

// Générer dynamiquement les cartes de plats
function generateDishCards() {
  dishes.forEach((dish) => {
    const card = document.createElement("div");
    card.className = "order__card";

    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" />
      <h4>${dish.name}</h4>
      <p>${dish.description}</p>
      <div class="commander">
        <button class="btn" data-price="${dish.price}">COMMANDEZ</button>
      </div>
    `;

    // Ajouter l'événement au bouton Commander
    card.querySelector(".btn").addEventListener("click", () => {
      openModal(dish.name, dish.price);
    });

    orderGrid.appendChild(card);
  });
  const suite=document.createElement("div");
  suite.innerHTML=`
    <a href="./cataogue.html">
      <div class="order__card final">
      
      </div>
    </a>
  `;
  orderGrid.appendChild(suite);
}

// Fonction pour ouvrir le modal
function openModal(dishName, dishPrice) {
  unitPrice = dishPrice;
  itemNameInput.value = dishName;
  updateTotalPrice();
  modal.classList.remove("hidden");
}

// Fermer le modal au clic sur le bouton de fermeture
closeButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Fermer le modal en cliquant en dehors de la fenêtre
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// Mettre à jour le prix total en fonction de la quantité
quantityInput.addEventListener("input", updateTotalPrice);

function updateTotalPrice() {
  const quantity = parseInt(quantityInput.value, 10) || 0;
  const totalPrice = unitPrice * quantity;
  totalPriceElement.innerText = `Prix total : ${totalPrice.toLocaleString()} FCFA`;
}

// Gérer la soumission du formulaire
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(orderForm);
  alert(
    `Commande validée pour ${formData.get("itemName")} avec une quantité de ${formData.get("quantity")}. Prix total : ${
      unitPrice * formData.get("quantity")
    } FCFA.`
  );
  modal.classList.add("hidden");
});

// Initialiser l'application
generateDishCards();