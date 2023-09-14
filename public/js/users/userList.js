const deleteButton = document.getElementById("deleteButton");
const ID = document.getElementById("userID");
// muestra el modal de confirmación
const isConfirmed = await Swal.fire({
  title: "¿Estás seguro de querer eliminar el usuario?",
  text: "No será posible recuperarlo después de esta acción",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Sí, eliminar",
  cancelButtonText: "No, no deseo eliminarlo",
});
// si el usuario confirma la eliminación, lo elimina
if (isConfirmed.isConfirmed) {
  format.submit();
  const response = await fetch(`/user/${ID}/?_method=delete`, {
    method: "POST",
  });
  if (response.ok) {
    Swal.fire(
      "Eliminado",
      "El usuario fue eliminado correctamente",
      "success"
    );
  } else {
    Swal.fire("Error", "Hubo un error al eliminar el usuario", "error");
  }
}