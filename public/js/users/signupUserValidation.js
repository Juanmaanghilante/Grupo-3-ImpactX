if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


function ready() {
    let form = document.querySelector("form#signupForm")

    let busqueda = []
    let encontrado = undefined


    // me traigo la info de usuarios

    fetch("/api/users", {
        method: "GET"
    })

        .then(response => response.json())
        .then(info => {
            busqueda = info.data

        });





    form.addEventListener("submit", async (e) => {

        e.preventDefault();
        console.log(busqueda);
       
        let username = document.querySelector('#userName')
        let name = document.querySelector('#name1')
        let lastName = document.querySelector('#lastName2')
        let email = document.querySelector('#email3')
        let img = document.querySelector('#file4')
        
        console.log(img.type);

        // agarro errores
        let errorUserName = document.querySelector('#errorSignupUser')
        let errorName = document.querySelector('#errorName')
        let errorlastName = document.querySelector('#errorLastName')
        let emailError = document.querySelector('#emailError')
        let errorImg = document.querySelector('#errorImg')


        let password = document.querySelector('#password5')
        let repeatPassword = document.querySelector('#rPassword6')


        // validamos username
        if (username.value == '') {
            errorUserName.innerHTML = '<p>Debes crellenar este campo</p>';

        } else {
            encontrado = busqueda.find((row) => row.user_name == username.value);
            if (encontrado) {
                errorUserName.innerHTML = '<p>Este nombre de usuario ya esta en uso!!</p>';
            } else {
                errorUserName.innerHTML = ''
            }





        }
        // validamos name

        if (name.value == '' || name.value.length <= 3) {

            errorName.innerHTML = '<p>Debes usar un nombre valido</p>';

        } else {

            errorName.innerHTML = ''

        }


        // validamos lastName
        if (lastName.value == '' || lastName.value.length <= 3) {

            errorLastName.innerHTML = '<p>Debes ingresar tu apellido </p>';

        } else {

            errorlastName.innerHTML = ''

        }

        // validamos email 

        if (email.value == '') {
            emailError.innerHTML = '<p>Debes ingresar un email </p>';
        } else {
            re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
            if (!email.value.match(re)) {

                emailError.innerHTML = '<p> Email invalido </p>'
            } else {


                encontrado = busqueda.find((row) => row.email == email.value)

                if (encontrado) {
                    emailError.innerHTML = '<p>Este email ya esta registrado pueba con otro </p>'
                } else {
                    emailError.innerHTML = '';
                }

            }
            // validamos imagen

      





        }






    })
}