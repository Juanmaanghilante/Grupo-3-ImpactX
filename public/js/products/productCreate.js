if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

const form = document.querySelector('.create-form')

function ready() {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    

    // HACER ACÁ TODAS LAS VALIDACIONES



    if(errors.length > 0) {

      // MANDAR LA LISTA DE ERRORES

    } else {
      // CAMBIAR 'seleccionarInput' POR NOMBRE VARIABLE DE CADA INPUT QUE AGARRAN DEL DOM
      let model = {
        name: seleccionarInput.value,
        category_id: seleccionarInput.value,
        price: seleccionarInput.value,
        description: seleccionarInput.value,
        image: seleccionarInput.value,
      }
      let apiResponse = await fetch('/api/products/create', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(model)})
      let responseToJson = await apiResponse.json()


      if(responseToJson.data) {
        Swal.fire(
            'Product Successfully Created!',
            'success'
        ).then(() => {
            window.location.href = `/productos`
        }) 
    } else {
        Swal.fire(
            'Oops! Something went wrong',
            'error'
        ) 
    }
    }
  })
}


