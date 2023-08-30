if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {

    const editForm = document.querySelector(".edit-form");

    editForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const user = document.getElementsByName("user")[0];
        const name = document.getElementsByName("name")[0];
        const lastname = document.getElementsByName("lastname")[0];
        const email = document.getElementsByName("email")[0];
        const category = document.getElementsByName("category")[0];
        const selectedFile = profilePic.files[0];
        const ID = document.getElementById("userID")

        const errorUser = document.querySelector(".errorUser")
        const errorName = document.querySelector(".errorName")
        const errorLastname = document.querySelector(".errorLastname")
        const errorEmail = document.querySelector(".errorEmail")
        const errorCategory = document.querySelector(".errorCategory")
        const errorProfilepic = document.querySelector(".errorProfilepic")


        let fetchUsers = async () => {
            let respuestaApiUsers = await fetch('/api/users')
            let usersParsed = await respuestaApiUsers.json()
    
            return usersParsed
        }  

        let listadoUsers = await fetchUsers()

        let errores = []
        let usuariosNoEditados = listadoUsers.data.filter(usuario => usuario.id != ID.value)
        console.log(usuariosNoEditados)
        /*
        listadoUsers.data.forEach(usuario => {
            
        });






        if (desc.value === "") {
            desc.focus();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please enter a description",
            });
            return false;
          }



            errores.push('Debe ingresar ')
            */
        


    })


}