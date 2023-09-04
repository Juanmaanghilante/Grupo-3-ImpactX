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
  document.querySelector(
    ".cartIconNumber p"
  ).innerHTML = `${productosCarrito.length}`;
}
