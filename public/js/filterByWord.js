const searchInput = document.getElementById("search-input");
const articlesContainer = document.querySelector(".mainProducts");
const newProductContainer = document.querySelector(".nuevoProducto");
const popupCerrarButton = document.querySelector(".popupCerrarButton");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();

  fetch(`/productos/filter?search=${searchTerm}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = data;

      const newArticles = tempContainer.querySelectorAll(".tarjetaProductos");

      articlesContainer
        .querySelectorAll(".tarjetaProductos")
        .forEach((article) => {
          article.remove();
        });

      newArticles.forEach((newArticle) => {
        articlesContainer.insertBefore(newArticle, newProductContainer);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

if (window.innerWidth > 768) {
  const tarjetaProductos = document.querySelectorAll(".tarjetaProductos");
  const popupProducto = document.querySelector(".popupProducto");

  tarjetaProductos.forEach((tarjeta) => {
    tarjeta.addEventListener("click", (event) => {
      const productoImagen = tarjeta.querySelector(".productoImagen");
      const productoNombre = tarjeta.querySelector("h2");
      const productoPrecio = tarjeta.querySelector("p:nth-child(2)");
      const productoDescripcion = tarjeta.querySelector("p:nth-child(3)");

      const popupImagen = popupProducto.querySelector(".popupImagen img");
      const popupNombre = popupProducto.querySelector("h2");
      const popupPrecio = popupProducto.querySelector("p:nth-child(2)");
      const popupDescripcion = popupProducto.querySelector("p:nth-child(3)");

      popupImagen.src = productoImagen.src;
      popupNombre.textContent = productoNombre.textContent;
      popupPrecio.textContent = productoPrecio.textContent;
      popupDescripcion.textContent = productoDescripcion.textContent;

      popupProducto.style.display = "block";
    });

    popupCerrarButton.addEventListener("click", () => {
      popupProducto.style.display = "none";
    });
  });
}
