const addtoCart = (id) => {
  axios.post("/addCart", { id: id }).then((e) => {
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
        title: "Add to Cart",
      });
      location.href = "/wishlist";
    }
  });
};

const deleteProduct = (id) => {
  axios.delete("/deletewishlist", { data: { id: id } }).then((e) => {
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
        title: "Removed from wishlist",
      });
      location.href = "/wishlist";
    }
  });
};
