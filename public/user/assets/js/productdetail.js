const addToCart = (id) => {
  axios.post("/addCart", { id: id }).then((e) => {
    if (e.data.response) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Item Added to cart",
      });
    }
  });
};
const addToWishlist = (id) => {
  axios.post("/addToCart", { id }).then((e) => {
    if (e.data.response == true) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Add to Wishlist",
      });
      document.getElementById(
        "wishlistButton" + id
      ).innerHTML = ` <a><i class="bi bi-heart-fill"></i> </a>`;
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "Item Already Exist!",
      });
    }
  });
};

const login = () => {
  Swal.fire({
    title: "Do you want to login ? ",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Login",
    denyButtonText: `Sign up`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      location.href = "/login";
    } else if (result.isDenied) {
      location.href = "/signup";
    }
  });
};
