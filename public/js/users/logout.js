if (window.location.href == "http://localhost:3003/user/profile"){
    const btnLogOut = document.querySelector(".logoutButton");
    console.log("entre en if profile");
    // Agrega un evento de clic al botón
    btnLogOut.addEventListener("click", function (e) {
      e.preventDefault();
      actualizarContadorCarrito();
      console.log("entre en click profile");
    
      function actualizarContadorCarrito() {
        // const productosCarrito = [];
        // document.querySelector(
        //   ".cartIconNumber p"
        // ).innerHTML = `${productosCarrito.length}`;
        localStorage.setItem("carrito", JSON.stringify([]));
      }
        
      window.location.href = btnLogOut.getAttribute("href");
    
    });


}else{
    const btnLogOut = document.querySelector("#logoutButton");
    console.log("entre en else header");
    console.log(window.location.href);

    // Agrega un evento de clic al botón
    btnLogOut.addEventListener("click", function (e) {
      e.preventDefault();
      actualizarContadorCarrito();
      console.log("entre en click else");

    
      function actualizarContadorCarrito() {
        // const productosCarrito = [];
        // document.querySelector(
        //   ".cartIconNumber p"
        // ).innerHTML = `${productosCarrito.length}`;
        localStorage.setItem("carrito", JSON.stringify([]));
      }
        
      window.location.href = btnLogOut.getAttribute("href");
    
    });
    
    // NO DEJA DESLOGGEAR
}



