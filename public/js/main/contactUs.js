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
      const answer = form.querySelector("[name='answer']");
      const answerError = form.querySelector("#answerError");

      if (answer.value === "") {
        answer.focus();
        answerError.innerHTML = "As Admin, please enter an answer";
        answer.classList.add("invalidError");
        return false;
      } else {
        answerError.innerHTML = "";
        answer.classList.remove("invalidError");
      }

      e.target.submit();
    });
  });
}
