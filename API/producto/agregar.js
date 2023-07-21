document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    let productName = document.getElementById('productName').value;
    let productPrice = parseFloat(document.getElementById('productPrice').value);
    let productDescription = document.getElementById('productDescription').value;
    let productImage = document.getElementById('productImage').value;
  
    let newProduct = {
      title: productName,
      price: productPrice,
      description: productDescription,
      image: productImage
    };
  
    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then(response => response.json())
      .then(data => {
        alert ('Producto agregado')
        console.log(data);
  
        let productList = document.getElementById('productList');
        let productInfo = document.createElement('div');
        productInfo.innerHTML = `
          <h3>${data.title}</h3>
          <p>Precio: ${data.price}</p>
          <p>Descripción: ${data.description}</p>
          <img src="${data.image}" alt="Producto">`;
        productList.appendChild(productInfo);
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
      });
  
    // Limpiar los campos del formulario
    this.reset();
  });
  