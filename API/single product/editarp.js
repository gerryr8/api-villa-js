// Función para cargar los detalles del producto
function loadProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const titleInput = document.getElementById("title");
            const descriptionTextarea = document.getElementById("description");
            const priceInput = document.getElementById("price");

            titleInput.value = product.title;
            descriptionTextarea.value = product.description;
            priceInput.value = product.price;

            // Guardar el objeto 'product' en una variable global para usarlo en la función de edición
            window.currentProduct = product;

            // Agregar evento al formulario para editar
            const editForm = document.getElementById("edit-form");
            editForm.addEventListener("submit", editProduct);
        })
        .catch(error => {
            console.error(error);
        });
}

// Función para editar el producto
function editProduct(event) {
    event.preventDefault();

    // Verificar si hay un producto seleccionado
    if (!window.currentProduct) {
        console.error("No hay producto seleccionado.");
        return;
    }

    // Obtener los valores actualizados del formulario
    const updatedTitle = document.getElementById("title").value;
    const updatedDescription = document.getElementById("description").value;
    const updatedPrice = parseFloat(document.getElementById("price").value);

    // Crear el objeto con los datos actualizados del producto
    const updatedProduct = {
        ...window.currentProduct,
        title: updatedTitle,
        description: updatedDescription,
        price: updatedPrice
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

        // Redirigir a la página de detalles del producto con el nuevo ID (o realizar otras acciones según tus necesidades)
        window.location.href = `producto.html?id=${updatedProductData.id}`;
    })
    .catch(error => {
        console.error("Error al editar el producto:", error);
    });
}

// Obtener el ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Cargar los detalles del producto con el ID obtenido
loadProductDetails(productId);
