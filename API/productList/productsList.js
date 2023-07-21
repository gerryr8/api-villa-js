// const url = "https://fakestoreapi.com/products";

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     const productCard= document.getElementById("product-content");

//     data.forEach(product => {
//       const productContent = document.createElement("div");
//         productContent.innerHTML = `
//         <h2 class="produt-title">${product.title}</h2>
//         <p class="description">${product.description}</p>
//         <img class="product-img" src="${product.image}" alt="${product.title}" />
//       `;
//       productCard.appendChild(productContent);
//     });
//   })
//   .catch(error => {
//     console.error( error);
//   });

const url = "https://fakestoreapi.com/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const productContainer = document.getElementById("product-container");

    data.forEach((product) => {
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
        <button class="pay">Comprar</button>
      </div>
       
    
        `;
      productCard.appendChild(productContent);
      productContainer.appendChild(productCard);
    });
  })
  .catch((error) => {
    console.error(error);
  });
