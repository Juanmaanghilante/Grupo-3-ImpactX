const searchInput = document.getElementById("search-input");
const articlesContainer = document.querySelector(".mainProducts");
const newProductContainer = document.querySelector(".nuevoProducto");
const popupCerrarButton = document.querySelector(".popupCerrarButton");
const popupProducto = document.querySelector(".popupProducto");

// Función para abrir el popup con la información del producto
function openPopup(tarjeta) {
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
}

// Función para cerrar el popup
function closePopup() {
  popupProducto.style.display = "none";
}

// Evento de filtro
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

      // Reasignar el evento click a las nuevas tarjetas
      articlesContainer.querySelectorAll(".tarjetaProductos").forEach((tarjeta) => {
        tarjeta.addEventListener("click", (event) => {
          event.stopPropagation();
          // Solo abrir el popup si el ancho es mayor a 768 píxeles
          if (window.innerWidth > 768) {
            openPopup(tarjeta);
          }
        });
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

// Evento para abrir el popup al hacer clic en la tarjeta
articlesContainer.addEventListener("click", (event) => {
  const tarjeta = event.target.closest(".tarjetaProductos");
  if (tarjeta) {
    // Solo abrir el popup si el ancho es mayor a 768 píxeles
    if (window.innerWidth > 768) {
      openPopup(tarjeta);
    }
  }
});

// Evento para cerrar el popup
popupCerrarButton.addEventListener("click", () => {
  closePopup();
});
