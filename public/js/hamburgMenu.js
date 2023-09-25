window.addEventListener("load", () => {
  const menu = document.querySelector(".svgMenu");
  const close = document.querySelector(".closeBtn");
  const nav = document.querySelector("#navPrincipal");
  actualizarContadorCarrito();
  profilePicSubMenu();

  menu.addEventListener("click", () => {
    nav.classList.add("open-nav");
  });

  close.addEventListener("click", () => {
    nav.classList.remove("open-nav");
  });

});

function actualizarContadorCarrito() {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contadorElement = document.querySelector(".cartContainer div p");

  if (productosCarrito.length == 0) {
    contadorElement.innerText = "";
    document.querySelector(".cartContainer div").classList.remove("cartIconNumber")
  } else {
    document.querySelector(".cartContainer div").classList.add("cartIconNumber")
    contadorElement.innerText = productosCarrito.length;
  }

}

function profilePicSubMenu() {
  let img = ""
  if (document.querySelector('.perfilPic')){
    img = document.querySelector('.perfilPic')
  }else{
    img = document.querySelector('.laPrueba')
  }
  
  const subMenu = document.querySelector(".profilePicMenu") 

  img.addEventListener('click', () => {
    if (subMenu.style.display === 'none' || subMenu.style.display === '') {
      subMenu.style.display = 'block'; 
    } else {
      subMenu.style.display = 'none';
    }
  })

  document.addEventListener('click', (e) => {
    if (e.target !== img && e.target !== subMenu) {
      subMenu.style.display = 'none'; 
    }
  });
}