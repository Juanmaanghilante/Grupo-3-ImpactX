if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() { 


    let form = document.querySelector("form#login_form")
    let busqueda = []
    



    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const user = document.querySelector("#login_user");
        const errorUser = document.querySelector("#login_err_1");
        const errorPassword = document.querySelector("#login_err_2");
        const password = document.querySelector("#login_password");

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
            await fetch("/user/userList", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({user: user.value})
            })
            
                .then(response => response.json())
                .then(info => {
                   busqueda = info
        
                });

            errorPassword.innerHTML = ""
            errorUser.innerHTML = ""
            

            

            if (busqueda == "noExiste") {
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