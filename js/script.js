// Action for the back button
// document.getElementById("backButton").addEventListener("click", () => {
//     alert("Retour vers le menu principal !");
//     // You can replace this alert with a redirect, e.g., `window.location.href = "menu.html";`
//   });
  
  // Search functionality
  document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
      const itemName = item.textContent.toLowerCase();
      item.style.display = itemName.includes(query) ? "block" : "none";
    });
  });






document.addEventListener("DOMContentLoaded", () => {
    const platJourSection = document.querySelector("#catalogue main");
    const orderModal = document.getElementById("orderModal");
    const closeModalButton = orderModal.querySelector(".close-button");
    const itemNameInput = document.getElementById("itemName");
    const quantityInput = document.getElementById("quantity");
    const totalPriceElement = document.getElementById("totalPrice");

    let currentProduct = null;

    // Fonction pour afficher les catégories et les produits
    function displayCatalogue() {
        platJourSection.innerHTML = "";
        const categories = [...new Set(catalogue.map(item => item.category))];

        categories.forEach(category => {
            const categorySection = document.createElement("section");
            categorySection.className = "category";
            categorySection.innerHTML = `
                <h2>${category}</h2>
                <div class="items"></div>
            `;

            const itemsContainer = categorySection.querySelector(".items");
            catalogue
                .filter(item => item.category === category)
                .forEach(item => {
                    const itemElement = document.createElement("article");
                    itemElement.className = "item";
                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p><strong>Prix :</strong> ${item.price} CFA</p>
                        <p>${item.description}</p>
                        <button class="order-button">Commander</button>
                    `;
                    itemElement.querySelector(".order-button").addEventListener("click", () => openModal(item));
                    itemsContainer.appendChild(itemElement);
                });

            platJourSection.appendChild(categorySection);
        });
    }

    // Fonction pour ouvrir la modale de commande
    function openModal(item) {
        currentProduct = item;
        itemNameInput.value = item.name;
        quantityInput.value = 1;
        updateTotalPrice();
        orderModal.classList.remove("hidden");
    }

    // Fonction pour fermer la modale
    closeModalButton.addEventListener("click", () => {
        orderModal.classList.add("hidden");
        currentProduct = null;
    });

    // Fonction pour mettre à jour le prix total
    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value, 10);
        const totalPrice = currentProduct.price * quantity;
        totalPriceElement.textContent = `Prix total : ${totalPrice} CFA`;
    }

    // Gestion du changement de quantité
    quantityInput.addEventListener("input", updateTotalPrice);

    // Initialisation
    displayCatalogue();
});