if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

/*let productos = [{
        id: 1,
        imagen: 'imagen',
        nombre: 'nombre',
        precio: 250000
    },
    {
        id: 2,
        imagen: 'imagen',
        nombre: 'nombre',
        precio: 250000
    }]*/

    
let products = JSON.parse(localStorage.getItem("carrito")) || [];

function ready() {
  if (!JSON.parse(!localStorage.getItem("carrito"))) {
    localStorage.setItem("carrito", JSON.stringify([]));
  }
  // mostrarCarrito(productos);
  const btnCart = document.querySelector('.add-to-cart')

  btnCart.addEventListener('click', addItem)
  showItems(products)
}

// No funciona hacer click en cualquier prod, solo el de Desarrollo de sitios web

function addItem() {
  let regex = /\/products\/detail\/(\id+)/
  let url = window.location.href
  let cartProducts = JSON.parse(localStorage.getItem("carrito"))
  let productToCart = {
    // id: url.match(regex)[1],
    id: parseInt(document.querySelector("#inputProdId").value),
    name: document.querySelector(".name").innerText,
    price: document.querySelector(".price").innerText.replace(" $", ""),
    desc: document.querySelector(".description").innerText,
    img:  document.querySelector(".productoImagen").alt,
  } 

  if (cartProducts.length >= 0) {
    productToCart.subTotal = (cartProducts.length + 1) * productToCart.price 
    cartProducts.push(productToCart)
  }


  localStorage.setItem("carrito", JSON.stringify(cartProducts));
}

function showItems(productsInCart) {
  const cartProd = document.querySelector('.carrito-prod') 
  if (productsInCart.length == 0) {
    cartProd.innerHTML = `<h2>El carrito está vacio <a href='/productos'>Compra ahora</a></h2>`;
  } else {
    cartProd.innerHTML = ``
    
    for ( prod of productsInCart ) {
      subTotal += prod.price;
      cartProd.innerHTML += 
      `<article class="tarjetaCart carrito-producto">
          <div class="containerImagenCart">
                <img class="cartImagen" src="/img/${prod.img}" alt="${prod.img}">
          </div>
          <div class="containerInfoCart carrito-info">
                <h2 class="name">${prod.name}</h2>
                <h2 class="name">${prod.name}</h2>
                <p class="price">${prod.price}</p>
                <p class="subtotal">${prod.subTotal}</p>
                    <div class="eliminar-edit">
                      <i class="fa-sharp fa-solid fa trash" onClick=deleteProd(${prod.id})></i>
                    </div>
          </div>
      </article>`;
    }
  }
}

function deleteProd(id) {
  let product = products.filter ( row => row.id != id )
  
}



// function vaciarCarrito() {
//     //tengo que setar en el localstorage el array vacio
//     mostrarCarrito([]);
// }

// async function finalizarCompra() {
//     let data = {
//         total: productos.reduce(acum, current => acum + current.precio, 0),
//         productos: productos
//     }
//     let finalizarFetch = await fetch('/cart/done', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)})
//     let response = await finalizarFetch.json()
//     console.log(response);
// }






// function borrarElemento(id) {
//   //Necesito traerme los productos del localstorage
//   let elemento = productos.filter((row) => row.id != id);
//   mostrarCarrito(elemento);
//   //Tengo que setear los productos en el localStorage
// }








// function mostrarCarrito(productosCarrito) {
//   const carritoProd = document.querySelector(".carrito-prod");

//   if (productosCarrito.length == 0) {
//     carritoProd.innerHTML = `<h2>El carrito está vacio <a href='/productos'>Compra ahora</a></h2>`;
//     document.querySelector(".carrito-subtotal").innerHTML = ``;
//     document.querySelector(".carrito-total").innerHTML = ``;
//   } else {


//     let subTotal = 0;
//     carritoProd.innerHTML = ``;
//     productosCarrito.forEach((product) => {
//       subTotal += product.precio;
//       carritoProd.innerHTML += `<article class="tarjetaCart carrito-producto">
//                 <div class="containerImagenCart">
//                   <img class="cartImagen" src="/img/${product.imagen}" alt="">
//                 </div>
//                 <div class="containerInfoCart carrito-info">
//                   <h2 class="name">${product.id}</h2>
//                   <h2 class="name">${product.nombre}</h2>
//                   <p class="price">${product.precio}</p>
//                   <p class="cantidad">Cantidad: </p>
//                   <p class="subtotal">Subtotal: </p>
//                   <div class="eliminar-edit">
//                     <i class="fa-sharp fa-solid fa trash" onClick=borrarElemento(${product.id})></i>
//                   </div>
//                 </div>
//               </article>`;
//     });
//     document.querySelector(
//       ".carrito-subtotal"
//     ).innerHTML = `<h2 class="total">Subtotal: $${subTotal}</h2>`;
//     document.querySelector(
//       ".carrito-total"
//     ).innerHTML = `<h2 class="total">Total: $${subTotal + 1500}</h2>`;
//   }
// }
