if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

async function ready() {
  const editForm = document.querySelector(".edit-form");

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const users = document.getElementById("user");
    const name = document.getElementsByName("name")[0];
    const lastname = document.getElementsByName("lastname")[0];
    const email = document.getElementsByName("email")[0];
    const categoriaField = document.querySelector("#category");
    const profilePicInput = document.querySelector("#profilePic");

    const errorUser = document.querySelector(".errorUser");
    const errorName = document.querySelector(".errorName");
    const errorLastName = document.querySelector(".errorLastname");
    const errorEmail = document.querySelector(".errorEmail");
    const errorCategory = document.querySelector(".errorCategory");

    if (users.value == "") {
      users.focus();
      errorUser.innerHTML = "You must fill in the user field";
      return false;
    } else {
      errorUser.innerHTML = "";
      users.classList.remove("invalidError");
    }

    if (name.value == "") {
      name.focus();
      errorName.innerHTML = "You must fill in the name field";
      return false;
    } else {
      errorName.innerHTML = "";
      name.classList.remove("invalidError");
    }

    if (lastname.value == "") {
      lastname.focus();
      errorLastName.innerHTML = "You must fill in the lastname field";
      return false;
    } else {
      errorLastName.innerHTML = "";
      lastname.classList.remove("invalidError");
    }

    if (email.value == "") {
      email.focus();
      errorEmail.innerHTML = "You must fill in the lastname field";
      return false;
    } else {
      errorEmail.innerHTML = "";
      email.classList.remove("invalidError");
    }

    if (
      !email.value.match(
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/
      )
    ) {
      email.focus();
      errorEmail.innerHTML = "Invalid Email";
      return false;
    } else {
      errorEmail.innerHTML = "";
      email.classList.remove("invalidError");
    }

    if (categoriaField) {
      if (categoriaField.value == "") {
        categoriaField.focus();
        errorCategory.innerHTML = "As admin, please select a category";
        return false;
      } else {
        errorCategory.innerHTML = "";
        categoriaField.classList.remove("invalidError");
      }
    }
    e.target.submit();
    /*if (e.target.submit()) {
      Swal.fire({
        title: "User edited!",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
        iconColor: "#0c2b56",
        didOpen: () => {
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }*/
  });
}
