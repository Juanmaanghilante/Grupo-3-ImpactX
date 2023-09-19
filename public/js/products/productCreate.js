if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const form = document.querySelector(".create-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const category = document.getElementsByName("category")[0];
    const product = document.getElementsByName("product")[0];
    const desc = document.getElementsByName("desc")[0];
    const price = document.getElementsByName("price")[0];
    const image = document.getElementsByName("image")[0];
    const selectedFile = image.files[0];

    // Errors
    const errorCategory = document.querySelector("#errorCategory");
    const errorName = document.querySelector("#errorName");
    const errorDesc = document.querySelector("#errorDesc");
    const errorPrice = document.querySelector("#errorPrice");
    const errorImg = document.querySelector("#errorImg");

    if (category.value === "") {
      category.focus();
      errorCategory.innerHTML = "You must select a category product/service";
      category.classList.add("invalidError");
      return false;
    } else {
      errorCategory.innerHTML = "";
      category.classList.remove("invalidError");
    }

    if (product.value === "") {
      product.focus();
      errorName.innerHTML = "You must complete the name product/service";
      product.classList.add("invalidError");
      return false;
    } else {
      errorName.innerHTML = "";
      product.classList.remove("invalidError");
    }

    if (product.value.length < 5) {
      product.focus();
      errorName.innerHTML = "Name must be at least 5 characters";
      product.classList.add("invalidError");
      return false;
    } else {
      errorName.innerHTML = "";
      product.classList.remove("invalidError");
    }

    if (desc.value === "") {
      desc.focus();
      errorDesc.innerHTML = "You must complete the description product/service";
      desc.classList.add("invalidError");
      return false;
    } else {
      errorDesc.innerHTML = "";
      desc.classList.remove("invalidError");
    }

    if (desc.value.length < 20) {
      desc.focus();
      errorDesc.innerHTML = "Description must be at least 20 characters";
      desc.classList.add("invalidError");
      return false;
    } else {
      errorDesc.innerHTML = "";
      desc.classList.remove("invalidError");
    }

    if (price.value === "") {
      price.focus();
      errorPrice.innerHTML = "You must complete the price product/service";
      price.classList.add("invalidError");
      return false;
    } else {
      errorDesc.innerHTML = "";
      price.classList.remove("invalidError");
    }

    e.target.submit();
    Swal.fire({
      title: "Product created!",
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
      iconColor: "#0c2b56",
      didOpen: () => {
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    /*let model = {
      product: product.value,
      category: category.value,
      price: price.value,
      desc: desc.value,
      image: selectedFile.name,
    };

    let apiResponse = await fetch("/api/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
    });
    let responseToJson = await apiResponse.json();

    if (responseToJson.data) {
      Swal.fire("Success", "Product successfully created!").then(() => {
        window.location.href = `/productos`;
      });
    } else {
      Swal.fire("Oops! Something went wrong", "error");
    }*/
  });
}
