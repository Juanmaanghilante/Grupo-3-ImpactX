if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const editForm = document.querySelector(".edit-form");

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const users = document.getElementById("user");
    const name = document.getElementsByName("name")[0];
    const lastname = document.getElementsByName("lastname")[0];
    const email = document.getElementsByName("email")[0];
    const category = document.getElementsByName("categoria")[0];
    const ID = document.getElementById("userID");
    const categoriaField = document.querySelector("#category");
    const profilePicInput = document.querySelector("#profilePic");

    const errorUser = document.querySelector(".errorUser");
    const errorName = document.querySelector(".errorName");
    const errorLastname = document.querySelector(".errorLastname");
    const errorEmail = document.querySelector(".errorEmail");
    const errorCategory = document.querySelector(".errorCategory");
    

    let fetchUsers = async () => {
      let respuestaApiUsers = await fetch("/api/users");
      let usersParsed = await respuestaApiUsers.json();

      return usersParsed;
    };
    let listadoUsers = await fetchUsers();

    let errores = {};

    let usuariosNoEditados = listadoUsers.data.filter(
      (usuario) => usuario.id != ID.value
    ); // devuelve el array con todos los usuarios que no son el que esta editandose
    //console.log(usuariosNoEditados)
    let usuarioEncontradoID = usuariosNoEditados.find(
      (myUser) => myUser.user_name == users.value
    );
    let usuarioEncontradoEmail = usuariosNoEditados.find(
      (myUser) => myUser.email == email.value
    );
    //console.log(usuarioEncontradoEmail)

    if (users.value == "") {
      errores.userError = "You must fill in the username field";
    } else if (usuarioEncontradoID != undefined) {
      errores.userError = "The username you entered has already been used";
    } else {
      delete errores.userError;
    }

    /*if (email.value == "") {
      errores.emailError = "You must fill in the email field";
    } else if (usuarioEncontradoEmail != undefined) {
      errores.emailError = "The email you entered has already been used";
    } else {
      delete errores.emailError;
    }*/

    if (name.value == "") {
      errores.name = "You must fill in the name field";
    } else {
      delete errores.name;
    }

    if (lastname.value == "") {
      errores.lastname = "You must fill in the lastname field";
    } else {
      delete errores.lastname;
    }

    if (categoriaField) {
      if (categoriaField.value === "") {
        errores.category = "Please select a category";
      } else {
        delete errores.category;
      }
    }

    /*if(category.value == "") {
            errores.category = 'Debe llenar el campo de nombre'
        } else {
            errores.category;
        }*/
    console.log(profilePicInput);
    if (Object.keys(errores).length > 0) {
      errorUser.innerHTML = errores.userError ? errores.userError : "";
      errorName.innerHTML = errores.name ? errores.name : "";
      errorLastname.innerHTML = errores.lastname ? errores.lastname : "";
      errorEmail.innerHTML = errores.emailError ? errores.emailError : "";
      errorCategory.innerHTML = errores.category ? errores.category : "";
    } else {
      let userEdited = {
        name: name.value,
        lastname: lastname.value,
        user: users.value,
        email: email.value,
        file: profilePicInput.files.length > 0 ? profilePicInput.files[0] : "",
        profile_id: categoriaField ? categoriaField.value : "2",
      };
      console.log(userEdited);
      let respuestaApi = await fetch(`/api/users/edit/${ID.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userEdited),
      });
      let response = await respuestaApi.json();

      if (response.meta) {
        Swal.fire(
          "Congratulations!",
          "Your account has been updated!",
          "success"
        ).then(() => {
          window.location.href = "/user/profile";
        });
      } else {
        Swal.fire("¡Ups!, There was a mistake!", "error");
      }
    }
  });
}
