// Función para cargar los detalles del producto
function loadProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const productImage = document.getElementById("product-image");
            const productTitle = document.getElementById("product-title");
            const productDescription = document.getElementById("product-description");
            const productPrice = document.getElementById("product-price");
            const productCategory = document.getElementById("product-category");
            const productRate = document.getElementById("product-rate");

            productImage.src = product.image;
            productImage.alt = product.title;
            productTitle.textContent = product.title;
            productDescription.textContent = product.description;
            productPrice.textContent = `$${product.price}`;
            productCategory.textContent = `Category: ${product.category}`;
            productRate.textContent = `Category: ${product.rating.rate}`;

            // Guardar el objeto 'product' en una variable global para usarlo en la función de edición
            window.currentProduct = product;

            // Agregar evento al botón para editar
            const editButton = document.getElementById("edit-button");
            editButton.addEventListener("click", editProduct);
        })
        .catch(error => {
            console.error(error);
        });
}

// Función para editar el producto
function editProduct() {
    // Verificar si hay un producto seleccionado
    if (!window.currentProduct) {
        console.error("No hay producto seleccionado.");
        return;
    }

    // Crear el objeto con los datos actualizados del producto
    const updatedProduct = {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    };

    // Realizar la solicitud PUT para editar el producto
    fetch(`https://fakestoreapi.com/products/${window.currentProduct.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(updatedProductData => {
        // Aquí obtendrás los datos actualizados del producto desde la API
        console.log("Producto editado:", updatedProductData);

        // Actualizar los detalles del producto en la página con los nuevos datos si es necesario
        const productTitle = document.getElementById("product-title");
        const productDescription = document.getElementById("product-description");
        const productPrice = document.getElementById("product-price");

        productTitle.textContent = updatedProductData.title;
        productDescription.textContent = updatedProductData.description;
        productPrice.textContent = `$${updatedProductData.price}`;

        // Actualizar el objeto 'currentProduct' con los nuevos datos
        window.currentProduct.title = updatedProductData.title;
        window.currentProduct.description = updatedProductData.description;
        window.currentProduct.price = updatedProductData.price;
    })
    .catch(error => {
        console.error("Error al editar el producto:", error);
    });
}

// Llamar a la función loadProductDetails con el ID del producto seleccionado (reemplaza 7 con el ID del producto que deseas cargar)
const productId = 7;
loadProductDetails(productId);
