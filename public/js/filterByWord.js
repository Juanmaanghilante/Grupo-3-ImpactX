const searchInput = document.getElementById("search-input");
const articlesContainer = document.querySelector(".mainProducts");
const imageProduct = document.querySelector(".containerImagenProductos");
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

function closePopup() {
  popupProducto.style.display = "none";
}

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

        // Agregar el evento de clic a las nuevas imágenes
        const nuevaImagen = newArticle.querySelector(".productoImagen");
        nuevaImagen.addEventListener("click", (event) => {
          const tarjeta = event.target.closest(".tarjetaProductos");
          if (tarjeta) {
            // Solo abrir el popup si el ancho es mayor a 768 píxeles
            if (window.innerWidth > 768) {
              openPopup(tarjeta);
            }
          }
        });
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

// Evento para abrir el popup al hacer clic en la tarjeta
document.querySelectorAll(".productoImagen").forEach((imagen) => {
  imagen.addEventListener("click", (event) => {
    const tarjeta = event.target.closest(".tarjetaProductos");
    if (tarjeta) {
      // Solo abrir el popup si el ancho es mayor a 768 píxeles
      if (window.innerWidth > 768) {
        openPopup(tarjeta);
      }
    }
  });
});

// Evento para cerrar el popup
popupCerrarButton.addEventListener("click", () => {
  closePopup();
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  if (JSON.parse(localStorage.getItem("carrito")) == null) {
    localStorage.setItem("carrito", JSON.stringify([]));
  }

  articlesContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
      agregarItem(event.target);
      let timerInterval;
      // Swal.fire({
      //   title: "Added to cart!",
      //   timer: 1000,
      //   icon: 'success',
      //   showConfirmButton: false,
      //   iconColor: '#0c2b56',        
      //   didOpen: () => {
      //     const b = Swal.getHtmlContainer().querySelector("b");
      //     timerInterval = setInterval(() => {
      //       b.textContent = Swal.getTimerLeft();
      //     }, 100);
      //   },
      //   willClose: () => {
      //     clearInterval(timerInterval);
      //   },
      // })
      Toastify({
        text: "Item added to cart",
        duration: 1000
        }).showToast();
    }

    if (event.target.classList.contains("eliminar")) {
      event.preventDefault();
      const closestForm = event.target.closest("form");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          closestForm.submit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }    
  });
}

function agregarItem(botonClicado) {
  let productoContainer = botonClicado.closest(".tarjetaProductos");
  let productoAgregado = {
    id: botonClicado.dataset.id,
    nombre: productoContainer.querySelector(".name").innerText,
    precio: productoContainer
      .querySelector(".price")
      .innerText.replace("$", " "),
    description: productoContainer.querySelector(".description").innerText,
    img: productoContainer.querySelector(".productoImagen").alt,
  };
  console.log(productoAgregado);

  let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let buscarProducto = productosCarrito.find(
    (producto) => producto.nombre === productoAgregado.nombre
  );

  if (buscarProducto) {
    buscarProducto.cantidad += 1;
    buscarProducto.subTotal = buscarProducto.cantidad * buscarProducto.precio;
  } else {
    productoAgregado.cantidad = 1;
    productoAgregado.subTotal =
      productoAgregado.cantidad * productoAgregado.precio;
    productosCarrito.push(productoAgregado);
  }

  localStorage.setItem("carrito", JSON.stringify(productosCarrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  document.querySelector(
    ".cartIconNumber p"
  ).innerHTML = `${productosCarrito.length}`;
}
