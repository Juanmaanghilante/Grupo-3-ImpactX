if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() { 


    let form = document.querySelector("form#login_form")
    let busqueda = []
    let encontrado = undefined

    fetch("/user/userList", {
        method: "POST"
    })
    
        .then(response => response.json())
        .then(info => {
           busqueda = info

        });


    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        var user = document.querySelector("#login_user");
        var errorUser = document.querySelector("#login_err_1");
        var errorPassword = document.querySelector("#login_err_2");
        var password = document.querySelector("#login_password");

        if ((user.value === "") || (password.value === "")) {

            if (password.value === "") {
                password.focus();
                errorPassword.innerHTML = "<p>You must complete the password</p>"
            } else { errorPassword.innerHTML = "" }

            if (user.value === "") {
                user.focus();
                errorUser.innerHTML = "<p>You must complete the username</p>"
            } else { errorUser.innerHTML = "" }

            password.value = "";
            return false

        } else {
            errorPassword.innerHTML = ""
            errorUser.innerHTML = ""

            encontrado = busqueda.find((row) => row.user_name == user.value);

            if (!encontrado) {
                errorUser.innerHTML = "<p>Username does not exist</p>"
                user.value = ""
                password.value = ""
            } else {
                errorPassword.innerHTML = ""
                errorUser.innerHTML = ""
                form.submit(); 
            }
        }
    })


}