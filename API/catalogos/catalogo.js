const categorySelect = document.getElementById('category-select');
const productContainer = document.getElementById('product-container');

function fetchCategories() {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => {
      categorySelect.innerHTML = '';

      json.forEach(category  => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => console.log(error));
}

function fetchProductsByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(json => {
      productContainer.innerHTML = '';

      json.forEach(product => {
        let productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
        productInfo.innerHTML = `
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>$${product.price}</p>
          <img src="${product.image}" alt="Imagen del producto">`;
        productContainer.appendChild(productInfo);
      });
    })
    .catch(error => console.log(error));
}

fetchCategories();

categorySelect.addEventListener('change', () => {
  let selectedCategory = categorySelect.value;
  fetchProductsByCategory(selectedCategory);
});
