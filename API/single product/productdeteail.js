  // Obtener el ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

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

          })
          .catch(error => {
              console.error(error);
          });
  }

  loadProductDetails(productId);