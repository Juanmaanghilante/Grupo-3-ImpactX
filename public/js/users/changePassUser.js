if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const form = document.querySelector(".create-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contrasenia = document.getElementsByName("contrasenia")[0];
    const contraseniaNueva = document.getElementsByName("contraseniaNueva")[0];
    const contraseniaNuevaRepetir = document.getElementsByName(
      "contraseniaNuevaRepetir"
    )[0];

    // Errors
    const errorContrasenia = document.querySelector("#errorContrasenia");
    const errorContraseniaNueva = document.querySelector(
      "#errorContraseniaNueva"
    );
    const errorContraseniaNuevaRepetir = document.querySelector(
      "#errorContraseniaNuevaRepetir"
    );

    if (contrasenia.value === "") {
      contrasenia.focus();
      errorContrasenia.innerHTML = "You must enter your password";
      contrasenia.classList.add("invalidError");
      return false;
    } else {
      errorContrasenia.innerHTML = "";
      contrasenia.classList.remove("invalidError");
    }

    if (contraseniaNueva.value === "") {
      contraseniaNueva.focus();
      errorContraseniaNueva.innerHTML = "You must enter your new password";
      contraseniaNueva.classList.add("invalidError");
      return false;
    } else {
      errorContraseniaNueva.innerHTML = "";
      contraseniaNueva.classList.remove("invalidError");
    }

    if (contraseniaNuevaRepetir.value === "") {
      contraseniaNuevaRepetir.focus();
      errorContraseniaNuevaRepetir.innerHTML =
        "You must repeat your new password";
      contraseniaNuevaRepetir.classList.add("invalidError");
      return false;
    } else {
      errorContraseniaNuevaRepetir.innerHTML = "";
      contraseniaNuevaRepetir.classList.remove("invalidError");
    }

    if (contraseniaNueva.value !== contraseniaNuevaRepetir.value) {
      contraseniaNuevaRepetir.focus();
      errorContraseniaNuevaRepetir.innerHTML = "New passwords don't match";
      contraseniaNuevaRepetir.classList.add("invalidError");
      return false;
    } else {
      errorContraseniaNuevaRepetir.innerHTML = "";
      contraseniaNuevaRepetir.classList.remove("invalidError");
    }

    if (!/^(?=.*[A-Z]).{8,}$/.test(contraseniaNueva.value)) {
      contraseniaNueva.focus();
      errorContraseniaNueva.innerHTML =
        "The password must have at least: 8 characters, an upper case letter";
      contraseniaNueva.classList.add("invalidError");
      return false;
    } else {
      errorContraseniaNueva.innerHTML = "";
      contraseniaNueva.classList.remove("invalidError");
    }
    e.target.submit();
  });
}
