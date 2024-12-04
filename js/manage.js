document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".option");
    const sections = document.querySelectorAll(".section");
    const sectionBouton = document.querySelector(".sectionBouton");
    const backButton = document.getElementById("backButton");
    const modal = document.getElementById("orderModal");
    const closeModalButton = modal.querySelector(".close-button");
    const orderForm = document.getElementById("orderForm");
    const itemNameInput = document.getElementById("itemName");
    const quantityInput = document.getElementById("quantity");
    const commentsInput = document.getElementById("comments");
    const categorySelect = document.getElementById("paie");
    const priceInput = document.getElementById("price");
    const imageInput = document.getElementById("image-publication");
    const modifyButton = modal.querySelector(".btn:not(.red)");
    const deleteButton = modal.querySelector(".btn.red");
    const addNewItemButton = document.getElementById("addNewItemButton");
    let editingItem = null;

    // Fonction pour générer un ID unique
    const generateUniqueId = () => Math.max(0, ...catalogue.map(item => item.id)) + 1;

    // Fonction pour afficher la modale
    function openModal(item = null) {
        editingItem = item;
        if (item) {
            itemNameInput.value = item.name;
            priceInput.value = item.price;
            commentsInput.value = item.description || "";
            categorySelect.value = item.category || "";
        } else {
            orderForm.reset();
        }
        modal.classList.remove("hidden");
    }

    // Fonction pour fermer la modale
    closeModalButton.addEventListener("click", () => {
        modal.classList.add("hidden");
        editingItem = null;
    });

    // Modifier ou ajouter un plat
    modifyButton.addEventListener("click", (e) => {
        e.preventDefault();
        const imageFile = imageInput.files[0];
        const imagePath = imageFile ? URL.createObjectURL(imageFile) : editingItem?.image || './assets/placeholder.jpg';

        const priceValue = parseFloat(priceInput.value);
        if (isNaN(priceValue) || priceValue <= 0) {
            alert("Veuillez entrer un prix valide.");
            return;
        }
        if (!itemNameInput.value.trim()) {
            alert("Le nom du plat est requis.");
            return;
        }

        if (editingItem) {
            // Modification d'un plat existant
            editingItem.name = itemNameInput.value;
            editingItem.price = priceValue;
            editingItem.category = categorySelect.value;
            editingItem.description = commentsInput.value;
            editingItem.image = imagePath;
        } else {
            // Ajout d'un nouveau plat
            const newItem = {
                id: generateUniqueId(),
                name: itemNameInput.value,
                price: priceValue,
                category: categorySelect.value,
                description: commentsInput.value,
                image: imagePath
            };
            catalogue.push(newItem);
        }

        updateCatalogueUI();
        modal.classList.add("hidden");
    });

    // Supprimer un plat
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (editingItem) {
            const index = catalogue.findIndex(item => item.id === editingItem.id);
            if (index > -1) {
                catalogue.splice(index, 1);
                updateCatalogueUI();
            }
        }
        modal.classList.add("hidden");
    });

    // Fonction pour mettre à jour l'interface utilisateur avec des catégories dynamiques
    function updateCatalogueUI() {
        const platJourSection = document.querySelector("#PlatJour main");
        platJourSection.innerHTML = "";

        // Extraire les catégories uniques
        const uniqueCategories = [...new Set(catalogue.map(item => item.category))];

        uniqueCategories.forEach(category => {
            const categorySection = document.createElement("section");
            categorySection.className = "category";
            categorySection.innerHTML = `
                <h2>${category}</h2>
                <div class="items"></div>
            `;
            platJourSection.appendChild(categorySection);

            const itemsContainer = categorySection.querySelector(".items");
            catalogue.filter(item => item.category === category).forEach(item => {
                const article = document.createElement("article");
                article.classList.add("item");
                article.innerHTML = `
                    <img src="${item.image || './assets/placeholder.jpg'}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p><strong>Prix :</strong> ${item.price} CFA</p>
                    <p>${item.description}</p>
                    <button class="order-button">Modifier</button>
                `;
                article.querySelector(".order-button").addEventListener("click", () => openModal(item));
                itemsContainer.appendChild(article);
            });
        });

        // Mettre à jour le menu déroulant des catégories dans la modale
        updateCategorySelect();
    }
    
    // Fonction pour mettre à jour le menu déroulant des catégories
    function updateCategorySelect() {
        const uniqueCategories = [...new Set(catalogue.map(item => item.category))];
        categorySelect.innerHTML = "";
        uniqueCategories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Ajouter un nouvel élément
    addNewItemButton.addEventListener("click", () => {
        openModal();
    });

    // Initialiser l'interface utilisateur
    updateCatalogueUI();

    // Gérer l'affichage initial des sections
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            sectionBouton.classList.add("hidden-boutons");
            sections.forEach(section => section.classList.remove("active"));
            targetSection.classList.add("active");
            backButton.classList.remove("hidden");
        });
    });

    backButton.addEventListener("click", () => {
        sections.forEach(section => section.classList.remove("active"));
        sectionBouton.classList.remove("hidden-boutons");
        backButton.classList.add("hidden");
    });
});