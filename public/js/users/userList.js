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
        confirmButtonColor: "#0c2b56",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          closestForm.submit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }
  });
}
