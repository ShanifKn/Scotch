const deleteProduct = (id) => {
  Swal.fire({
    title: "Do you want to add to your wishlist ?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      axios.post("/addToCart", { id }).then((e) => {
        if (e.data.response == true) {
          axios.delete("/deleteCartProduct", { data: { id: id } }).then((e) => {
            if (e.data.response) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "success",
                title: "Saved to wishlist",
              });
              location.href = "/cart";
            }
          });
        } else {
          axios.delete("/deleteCartProduct", { data: { id: id } }).then((e) => {
            if (e.data.response) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "success",
                title: "Saved to wishlist",
              });
              location.href = "/cart";
            }
          });
        }
      });
    } else if (result.isDenied) {
      axios.delete("/deleteCartProduct", { data: { id: id } }).then((e) => {
        if (e.data.response) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Saved to wishlist",
          });
          location.href = "/cart";
        }
      });
    }
  });
};

// quantity decresement
const decQuantity = (id, quantity) => {
  if (document.getElementById("quantityBox" + id).value > 1) {
    axios.patch("/quantityDec", { id: id, quantity: quantity }).then((e) => {
      if (e.data.response) {
        document.getElementById("quantityBox" + id).value = e.data.quantity;
        document.getElementById("totalBox" + id).innerHTML = e.data.total;
        document.getElementById("subtotal1").innerHTML = e.data.subtotal;
        document.getElementById("discount").innerHTML = e.data.subtotal;
      }
    });
  } else {
    Swal.fire({
      title: "Do you want to add to your wishlist ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.post("/addToCart", { id }).then((e) => {
          if (e.data.response == true) {
            axios
              .delete("/deleteCartProduct", { data: { id: id } })
              .then((e) => {
                if (e.data.response) {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener("mouseenter", Swal.stopTimer);
                      toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Saved to wishlist",
                  });
                  location.href = "/cart";
                }
              });
          } else {
            axios
              .delete("/deleteCartProduct", { data: { id: id } })
              .then((e) => {
                if (e.data.response) {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener("mouseenter", Swal.stopTimer);
                      toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Saved to wishlist",
                  });
                  location.href = "/cart";
                }
              });
          }
        });
      } else if (result.isDenied) {
        axios.delete("/deleteCartProduct", { data: { id: id } }).then((e) => {
          if (e.data.response) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Saved to wishlist",
            });
            location.href = "/cart";
          }
        });
      }
    });
  }
};

// quantity increment

const incQuantity = (id, quantitys) => {
  if (document.getElementById("quantityBox" + id).value < 10) {
    axios.patch("/quantityInc", { id: id }).then((e) => {
      if (e.data.response) {
        document.getElementById("quantityBox" + id).value = e.data.quantity;
        document.getElementById("totalBox" + id).innerHTML = e.data.total;
        document.getElementById("subtotal1").innerHTML = e.data.subtotal;
        document.getElementById("discount").innerHTML = e.data.subtotal;
      }
    });
  }
};
