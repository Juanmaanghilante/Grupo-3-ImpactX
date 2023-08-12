const searchInput = document.getElementById('search-input');
const articlesContainer = document.querySelector('.mainProducts');
const newProductContainer = document.querySelector('.nuevoProducto');

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.toLowerCase().trim();

  fetch(`/productos/filter?search=${searchTerm}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = data;

      const newArticles = tempContainer.querySelectorAll('.tarjetaProductos');

      // Remover los elementos actuales <article>
      articlesContainer.querySelectorAll('.tarjetaProductos').forEach((article) => {
        article.remove();
      });

      // Insertar los nuevos elementos <article> antes de "Add product"
      newArticles.forEach((newArticle) => {
        articlesContainer.insertBefore(newArticle, newProductContainer);
      });
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
});
