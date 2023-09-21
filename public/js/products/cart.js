if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

let productos = JSON.parse(localStorage.getItem("carrito")) || [];

function ready() {
  if (JSON.parse(localStorage.getItem("carrito")) == null) {
    localStorage.setItem("carrito", JSON.stringify([]));
  }
  mostrarCarrito(productos);
  actualizarContadorCarrito();
}

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



function borrarElemento(id) {
  // Filtrar los elementos cuyo ID no coincide con el proporcionado
  productos = productos.filter((row) => row.id != id);
  mostrarCarrito(productos);
  // Actualizar los productos en el localStorage
  localStorage.setItem("carrito", JSON.stringify(productos));
  actualizarContadorCarrito();
}



function vaciarCarrito() {
  //tengo que setar en el localstorage el array vacio
  mostrarCarrito([]);
  localStorage.setItem("carrito", JSON.stringify([]));
  actualizarContadorCarrito();
}



async function finalizarCompra() {
  
  let data = {
    total: productos.reduce(
      (acum, current) =>
        acum + parseInt(current.precio) * parseInt(current.cantidad),
      0
    ),
    productos: productos,
  };

  let finalizarFetch = await fetch("/cart/done", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let response = await finalizarFetch.json();
  console.log(response)
  Swal.fire("Congratulations", "Purchase made", "success");
  mostrarCarrito([]);
  localStorage.setItem("carrito", JSON.stringify([]));
  actualizarContadorCarrito();
}

function trimCustom(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function redirectLogIn() {
  window.location.href = '/user/login'
}


function mostrarCarrito(productosCarrito) {
  let carritoProd = document.querySelector(".carrito-prod");
  let controlIsLog = document.querySelector(".controlIsLog");
  const controlIsLogSinEspacio = trimCustom(controlIsLog.textContent);
  
  if (productosCarrito.length == 0) {
    carritoProd.innerHTML = `
    <h2 class="emptyCartMsg">Empty Cart, <a href='/productos'>Check Our Products!</a></h2>
    `;
    document.querySelector(".mainTotal").innerHTML = ``;


  } else {
    let subTotal = 0;
    carritoProd.innerHTML = ``;


    productosCarrito.forEach((element) => {

      subTotal += parseInt(element.precio) * parseInt(element.cantidad);
      carritoProd.innerHTML += 
      `<article class="tarjetaCart">
      
        <div class="containerInfoCart">
              <img class="cartImagen" src="/img/${element.img}">
              <h2 class="name">${element.nombre}</h2>
              <p class="price">${element.precio}$</p>
              <p class="description">${element.description}</p>
        </div>
              <button type="sumbit" class="botonCart" onClick=borrarElemento(${element.id})>X</button>

        
      </article>`;
    });

    if (controlIsLogSinEspacio == 'loggeado') {
      document.querySelector(".mainTotal").innerHTML = 
      `<div class="containerInfoCart">
            <div class="totalBox">
              <h2 h2 class="name totalBox">Total: </h2>
                <h2 class="name totalBox">${subTotal.toLocaleString("en-US", { style: "currency", currency: "USD", })}</h2>
            </div>
      </div>

      
      <button type="sumbit" class="botonCartConfirm" onClick=finalizarCompra()>  
        Pay
        <svg class="svgIconPay" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
      </button>
      <button type="sumbit" class="botonCartDelete" onClick=vaciarCarrito()>  <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button>
    `;
    } else {
      document.querySelector(".mainTotal").innerHTML = 
      `<div class="containerInfoCart">
            <div class="totalBox">
              <h2 h2 class="name totalBox">Total: </h2>
                <h2 class="name totalBox">${subTotal.toLocaleString("en-US", { style: "currency", currency: "USD", })}</h2>
            </div>
      </div>

      
      <button type="sumbit" class="botonCartConfirm" onClick=redirectLogIn()>  
        Login to pay
        <svg class="svgIconPay" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
      </button>
      <button type="sumbit" class="botonCartDelete" onClick=vaciarCarrito()>  <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button>
    `;
    }


  }
}
