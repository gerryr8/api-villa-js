let selectedProduct = null;

function loadProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(products => {
            const productCardsContainer = document.getElementById("product-cards-container");

            products.forEach(product => {
                const productCard = createProductCard(product);
                productCardsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.style.width = "100%";
    productCard.appendChild(productImage);

    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price}`;
    productCard.appendChild(productPrice);

    productCard.addEventListener("click", function () {
        selectedProduct = product;
        showEditForm();
    });

    return productCard;
}

function showEditForm() {
    const editFormContainer = document.getElementById("edit-form-container");

    editFormContainer.innerHTML = `
        <h2>Editar Producto</h2>
        <label for="edit-title">Título:</label>
        <input type="text" id="edit-title" value="${selectedProduct.title}" required>
        <label for="edit-description">Descripción:</label>
        <textarea id="edit-description" required>${selectedProduct.description}</textarea>
        <label for="edit-price">Precio:</label>
        <input type="number" id="edit-price" value="${selectedProduct.price}" required>
        <button id="save-button">Guardar cambios</button>
        <button id="delete-button">Eliminar Producto</button>
    `;

    const saveButton = document.getElementById("save-button");
    const deleteButton = document.getElementById("delete-button");

    saveButton.addEventListener("click", saveProductChanges);

    deleteButton.addEventListener("click", deleteProduct);
}

function saveProductChanges(productId, updatedProductData) {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProductData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(updatedProduct => {
        alert(`Producto editado correctamente:\n
        Título original: ${selectedProduct.title}\n
        Título editado: ${updatedProduct.title}\n
        Descripción original: ${selectedProduct.description}\n
        Descripción editada: ${updatedProduct.description}\n
        Precio original: ${selectedProduct.price}\n
        Precio editado: ${updatedProduct.price}`);

        selectedProduct.title = updatedProduct.title;
        selectedProduct.description = updatedProduct.description;
        selectedProduct.price = updatedProduct.price;

        const editFormContainer = document.getElementById("edit-form-container");
        editFormContainer.innerHTML = "";
        loadProducts();
    })
    .catch(error => {
        console.error("Error al editar el producto:", error);
    });
}



function deleteProduct() {
    if (!selectedProduct) {
        console.error("No hay producto seleccionado.");
        return;
    }

    fetch(`https://fakestoreapi.com/products/${selectedProduct.id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(deletedProduct => {
        alert(`Producto eliminado correctamente:\n
        Título: ${deletedProduct.title}\n
        Descripción: ${deletedProduct.description}\n
        Precio: ${deletedProduct.price}`);

        const editFormContainer = document.getElementById("edit-form-container");
        editFormContainer.innerHTML = "";

        selectedProduct = null;

        loadProducts();
    })
    .catch(error => {
        console.error("Error al eliminar el producto:", error);
    });
}


loadProducts();
