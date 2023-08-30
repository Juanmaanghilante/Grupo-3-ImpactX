if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const forms = document.querySelectorAll(".form-request");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("hola");
      var answer = form.querySelector("[name='answer']");

      if (answer.value === "") {
        answer.focus();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an answer",
        });
        return false;
      }

      e.target.submit();
    });
  });
}
