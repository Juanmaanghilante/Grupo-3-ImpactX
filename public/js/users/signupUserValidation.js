if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let form = document.querySelector("form#signupForm");

  let busqueda = [];
  let encontrado = undefined;

  // me traigo la info de usuarios

  fetch("/api/users", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((info) => {
      busqueda = info.data;
    });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let errores = 0


    const username = document.querySelector("#userName");
    const name = document.querySelector("#name1");
    const lastName = document.querySelector("#lastName2");
    const email = document.querySelector("#email3");
    const img = document.querySelector("#file4");

    // agarro errores
    const errorUserName = document.querySelector("#errorSignupUser");
    const errorName = document.querySelector("#errorName");
    const errorlastName = document.querySelector("#errorLastName");
    const emailError = document.querySelector("#emailError");
    const errorImg = document.querySelector("#errorImg");
    const errorPassword = document.querySelector("#errorPassword");
    const errorPassword2 = document.querySelector("#errorPassword2");
    const password = document.querySelector("#password5");
    const repeatPassword = document.querySelector("#rPassword6");

    console.log(errorPassword);
    console.log(password);
    // validamos username
    if (username.value == "") {
      errorUserName.innerHTML = "<p>please fill in this field with your name</p>";
    errores++
    } else {
      encontrado = busqueda.find((row) => row.user_name == username.value);
      console.log(busqueda)
      if (encontrado) {
        errorUserName.innerHTML =
          "<p>This username is already in use!</p>"
          errores++;
      } else {
        errorUserName.innerHTML = "";
      }
    }
    // validamos name

    if (name.value == "" || name.value.length <= 3) {
      errorName.innerHTML = "<p>You must use a valid name</p>"
      errores++;
    } else {
      errorName.innerHTML = "";
    }

    // validamos lastName
    if (lastName.value == "" || lastName.value.length < 3) {
      errorLastName.innerHTML = "<p>Your last name must have more than 3 charecters</p>"
      errores++;
    } else {
      errorlastName.innerHTML = "";
    }

    // validamos email

    if (email.value == "") {
      emailError.innerHTML = "<p>You must enter an email </p>"
      errores++;
    } else {
      re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
      if (!email.value.match(re)) {
        emailError.innerHTML = "<p> Invalid Email  </p>" 
        errores++;
      } else {
        encontrado = busqueda.find((row) => row.email == email.value);

        if (encontrado) {
          emailError.innerHTML =
            "<p>This email is already registered try another one </p>"
            errores++;
        } else {
          emailError.innerHTML = "";
        }
      }
    }
    // valido password
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!regex.test(password.value)) {
      errorPassword.innerHTML =
        "<p> you have to use 8 characters and a capital letter</p>"
        errores++;
    } else {
      errorPassword.innerHTML = "";
    }

    // valido repeat password
    if (password.value != repeatPassword.value ) {
      errorPassword2.innerHTML = "<p> your passwords must be the same</p>"
      errores++;
    }

if (errores===0){
  form.submit(); 
  Swal.fire({
    title: 'successful operation your user is logged in!',
    text: 'Are you ready to take your company to the next level? Fasten your seat belts.',
    imageUrl: '/img/logo-impactx.png',
    imageWidth: 300,
    imageHeight: 100,
    imageAlt: 'Custom image',
  }).then  ((result)=>{
    window.location="/";
  })

  
}


  });
}
