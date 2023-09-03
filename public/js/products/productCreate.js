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

    if (category.value === "") {
      category.focus();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a category",
      });
      return false;
    }

    if (product.value === "") {
      product.focus();
      //product.classList.add("invalidError");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a product name",
      });
      return false;
    } else {
      //product.classList.remove("invalidError");
    }

    if (desc.value === "") {
      desc.focus();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a description",
      });
      return false;
    }
    if (price.value === "") {
      price.focus();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a price",
      });
      return false;
    }

    e.target.submit();

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
