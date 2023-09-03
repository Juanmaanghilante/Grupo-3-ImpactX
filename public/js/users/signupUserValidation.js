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
       
        const username = document.querySelector('#userName')
        const name = document.querySelector('#name1')
        const lastName = document.querySelector('#lastName2')
        const email = document.querySelector('#email3')
        const img = document.querySelector('#file4')
        
        console.log(img.type);

        // agarro errores
        const errorUserName = document.querySelector('#errorSignupUser')
        const errorName = document.querySelector('#errorName')
        const errorlastName = document.querySelector('#errorLastName')
        const emailError = document.querySelector('#emailError')
        const errorImg = document.querySelector('#errorImg')


        const password = document.querySelector('#password5')
        const repeatPassword = document.querySelector('#rPassword6')


        // validamos username
        if (username.value == '') {
            errorUserName.innerHTML = '<p>You must complete the field</p>';

        } else {
            encontrado = busqueda.find((row) => row.user_name == username.value);
            if (encontrado) {
                errorUserName.innerHTML = '<p>Username already registered</p>';
            } else {
                errorUserName.innerHTML = ''
            }





        }
        // validamos name

        if (name.value == '' || name.value.length <= 3) {
            errorName.innerHTML = '<p>You must use a valid name</p>';
        } else {
            errorName.innerHTML = ''
        }


        // validamos lastName
        if (lastName.value == '' || lastName.value.length <= 3) {
            errorlastName.innerHTML = '<p>You must complete your last name</p>';
        } else {
            errorlastName.innerHTML = ''
        }

        // validamos email 

        if (email.value == '') {
            emailError.innerHTML = '<p>You must fill the blank with your email</p>';
        } else {
            re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
            if (!email.value.match(re)) {
                emailError.innerHTML = '<p>Invalid Email</p>'
            } else {
                encontrado = busqueda.find((row) => row.email == email.value)


                if (encontrado) {
                    emailError.innerHTML = '<p>This email is already registered, try again</p>'
                } else {
                    emailError.innerHTML = '';
                    form.submit()
                }

            }
            

      





        }






    })
}