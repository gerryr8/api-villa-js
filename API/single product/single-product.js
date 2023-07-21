const url = "https://fakestoreapi.com/products";

    function redirectToProductDetails(productId) {
        window.location.href = `productDetails.html?id=${productId}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const productContainer = document.getElementById("product-container");

            data.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                const productContent = document.createElement("div");
                productContent.classList.add("product-content");
                productContent.innerHTML = `
                    <div class="img-container"> 
                        <img class="product-img" src="${product.image}" alt="${product.title}" />
                    </div>
                    <h2 class="product-title">${product.title}</h2>
                    <div class="description-over">
                        <p class="description">${product.category}</p>
                    </div>
                    <div class="price-container">
                        <p class="price">$${product.price}</p>
                    </div>
                    <div class="pay-container"> 
                        <button class="pay" onclick="redirectToProductDetails(${product.id})">Detalles</button>
                    </div>`;

                productCard.appendChild(productContent);
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error(error);
        });