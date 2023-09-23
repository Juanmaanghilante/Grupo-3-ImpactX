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
    <div class="containerEmptyCart"> 
    <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M96.6025 91.6025L5.3975 0.397461L0 5.79496L18.6575 24.4525L28.05 44.2575L22.3125 54.67C21.6325 55.86 21.25 57.2625 21.25 58.75C21.25 61.0043 22.1455 63.1663 23.7396 64.7604C25.3337 66.3544 27.4957 67.25 29.75 67.25H61.455L67.32 73.115C65.195 74.645 63.75 77.1525 63.75 80C63.75 82.2543 64.6455 84.4163 66.2396 86.0104C67.8337 87.6044 69.9957 88.5 72.25 88.5C75.0975 88.5 77.605 87.0975 79.135 84.93L91.205 97L96.6025 91.6025ZM31.535 58.75C31.2532 58.75 30.983 58.638 30.7837 58.4388C30.5844 58.2395 30.4725 57.9693 30.4725 57.6875L30.6 57.1775L34.425 50.25H44.455L52.955 58.75H31.535ZM66.0875 50.25C69.275 50.25 72.08 48.5075 73.525 45.8725L88.74 18.375C89.08 17.695 89.25 16.9725 89.25 16.25C89.25 15.1228 88.8022 14.0418 88.0052 13.2448C87.2082 12.4477 86.1272 12 85 12H27.795L66.0875 50.25ZM29.75 71.5C27.4957 71.5 25.3337 72.3955 23.7396 73.9896C22.1455 75.5836 21.25 77.7456 21.25 80C21.25 82.2543 22.1455 84.4163 23.7396 86.0104C25.3337 87.6044 27.4957 88.5 29.75 88.5C32.0043 88.5 34.1663 87.6044 35.7604 86.0104C37.3545 84.4163 38.25 82.2543 38.25 80C38.25 77.7456 37.3545 75.5836 35.7604 73.9896C34.1663 72.3955 32.0043 71.5 29.75 71.5Z" fill="#185ABC" fill-opacity="0.6"/>
</svg>


    <div  class="emptyCartMsg">
    <h2><a href='/productos'>Empty Cart - Check Our Products!</a></h2>
    </div>
    </div>
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
