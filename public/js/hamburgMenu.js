window.addEventListener("load", () => {
  const menu = document.querySelector(".svgMenu");
  const close = document.querySelector(".closeBtn");
  const nav = document.querySelector("#navPrincipal");
  actualizarContadorCarrito();

  menu.addEventListener("click", () => {
    nav.classList.add("open-nav");
  });

  close.addEventListener("click", () => {
    nav.classList.remove("open-nav");
  });
});

function actualizarContadorCarrito() {
  
  const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (productosCarrito.length == 0) {
    document.querySelector(".cartIconNumber").classList.remove("cartIconNumber")
  } else {
    document.querySelector(".cartIconNumber p").innerHTML = `${productosCarrito.length}`;
  }
}
