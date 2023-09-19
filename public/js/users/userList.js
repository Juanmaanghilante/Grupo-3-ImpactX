<<<<<<< HEAD
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
  form.submit();
  const response = await fetch(`/user/${ID}/?_method=delete`, {
    method: "POST",
=======
const usersContainer = document.querySelector(".mainUser");

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const deleteButton = document.getElementById("deleteButton");
  const deleteForm = document.getElementById("deleteForm");

  usersContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteProcess")) {
      event.preventDefault();
      const closestForm = event.target.closest("form");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          closestForm.submit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }
>>>>>>> e1e0bde9fbfd55e68bfe8c589f75f7cece194ede
  });
}
