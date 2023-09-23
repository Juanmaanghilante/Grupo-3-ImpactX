if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

let productos = JSON.parse(localStorage.getItem("carrito")) || [];

function ready() {
  if (!JSON.parse(!localStorage.getItem("carrito"))) {
    localStorage.setItem("carrito", JSON.stringify([]));
  }
  mostrarCarrito(productos);
}

function vaciarCarrito() {
    //tengo que setar en el localstorage el array vacio
    mostrarCarrito([]);
}

async function finalizarCompra() {
    let data = {
        total: productos.reduce(acum, current => acum + current.precio, 0),
        productos: productos
    }
    let finalizarFetch = await fetch('/cart/done', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)})
    let response = await finalizarFetch.json()
    console.log(response);
}

function borrarElemento(id) {
  //Necesito traerme los productos del localstorage
  let elemento = productos.filter((row) => row.id != id);
  mostrarCarrito(elemento);
  //Tengo que setear los productos en el localStorage
}

function mostrarCarrito(productosCarrito) {
  let carritoProd = document.querySelector(".carrito-prod");
  if (productosCarrito.length == 0) {
    carritoProd.innerHTML = `<h2>El carrito está vacio <a href='/'>Compra ahora</a></h2>`;
    document.querySelector(".carrito-subtotal").innerHTML = ``;
    document.querySelector(".carrito-total").innerHTML = ``;
  } else {
    let subTotal = 0;
    carritoProd.innerHTML = ``;
    productosCarrito.forEach((element) => {
      subTotal += element.precio;
      carritoProd.innerHTML += `<article class="tarjetaCart carrito-producto">
                <div class="containerImagenCart">
                  <img class="cartImagen" src="/img/${element.imagen}" alt="">
                </div>
                <div class="containerInfoCart carrito-info">
                  <h2 class="name">${element.id}</h2>
                  <h2 class="name">${element.nombre}</h2>
                  <p class="price">${element.precio}</p>
                  <p class="cantidad">Cantidad: </p>
                  <p class="subtotal">Subtotal: </p>
                  <div class="eliminar-edit">
                    <i class="fa-sharp fa-solid fa trash" onClick=borrarElemento(${element.id})></i>
                  </div>
                </div>
              </article>`;
    });
    document.querySelector(
      ".carrito-subtotal"
    ).innerHTML = `<h2 class="total">Subtotal: $${subTotal}</h2>`;
    document.querySelector(
      ".carrito-total"
    ).innerHTML = `<h2 class="total">Total: $${subTotal + 1500}</h2>`;
  }
}
