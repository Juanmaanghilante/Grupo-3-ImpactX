if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const deleteButton = document.getElementById("deleteButton");
  const deleteForm = document.getElementById("deleteForm");
  console.log("hola");
  console.log(deleteButton);
  console.log(deleteForm);
  deleteButton.addEventListener("click", function () {
    alert("Botón Eliminar clickeado");
    // ...
  });

  deleteForm.addEventListener("submit", function (e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la eliminación, envía el formulario
        deleteForm.submit();
      }
    });
  });
}
