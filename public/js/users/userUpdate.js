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
        const ID = document.getElementById("userID")

        const errorUser = document.querySelector(".errorUser")
        const errorName = document.querySelector(".errorName")
        const errorLastname = document.querySelector(".errorLastname")
        const errorEmail = document.querySelector(".errorEmail")
        const errorCategory = document.querySelector(".errorCategory")


        let fetchUsers = async () => {
            let respuestaApiUsers = await fetch('/api/users')
            let usersParsed = await respuestaApiUsers.json()
    
            return usersParsed
        }  
        let listadoUsers = await fetchUsers()

        let errores = {}

        let usuariosNoEditados = listadoUsers.data.filter(usuario => usuario.id != ID.value) // devuelve el array con todos los usuarios que no son el que esta editandose
        //console.log(usuariosNoEditados)
        let usuarioEncontradoID = usuariosNoEditados.find(myUser => myUser.user_name == users.value)
        let usuarioEncontradoEmail = usuariosNoEditados.find(myUser => myUser.email == email.value)
        //console.log(usuarioEncontradoEmail)

        if(users.value == "") {
            errores.userError = 'Debe llenar el campo de nombre de usuario'
        } else if (usuarioEncontradoID != undefined) {
            errores.userError = 'El nombre de usuario que introdujo ya ha sido usado'
        } else {
            delete errores.userError
        }


        if(email.value == "") {
            errores.emailError = 'Debe llenar el campo de email'
        } else if (usuarioEncontradoEmail != undefined) {
            errores.emailError = 'El email que introdujo ya ha sido usado'
        } else {
            delete errores.emailError
        }

        if(name.value == "") {
            errores.name = 'Debe llenar el campo de nombre'
        } else {
            delete errores.name
        }

        if(lastname.value == "") {
            errores.lastname = 'Debe llenar el campo de nombre'
        } else {
            delete errores.lastname
        }

        /*if(category.value == "") {
            errores.category = 'Debe llenar el campo de nombre'
        } else {
            errores.category;
        }*/

        if (Object.keys(errores).length > 0) {
            errorUser.innerHTML = errores.userError ? errores.userError : ""
            errorName.innerHTML = errores.name ? errores.name : ""
            errorLastname.innerHTML = errores.lastname ? errores.lastname : ""
            errorEmail.innerHTML = errores.emailError ? errores.emailError : ""
            //errorCategory.innerHTML = errores.category
        } else {
            let userEdited = {
                name: name.value,
                lastname: lastname.value,
                user: users.value,
                email: email.value
                //profile_id: category.value,
            }

            let respuestaApi = await fetch(`/api/users/edit/${ID.value}`, {method: 'PUT',  headers:{"Content-Type": "application/json"}, body: JSON.stringify(userEdited)})

            let response = await respuestaApi.json()

            if(response.meta) {

                Swal.fire(
                    'Felicidades!',
                    'Tu cuenta ha sido actualizada!',
                    'success'
                ).then(() => {

                    window.location.href = "/"
                }) 
            } else {
                Swal.fire(
                    '¡Ups!, Hubo un error',
                    'error'
                ) 
            }


        }

    })


}