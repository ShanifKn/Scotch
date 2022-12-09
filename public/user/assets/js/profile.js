function validatedPass() {
  const pass1 = document.getElementById("Pass3").value;
  const pass2 = document.getElementById("Pass4").value;
  const pass3Error = document.getElementById("pass3Msg");
  const pass4Error = document.getElementById("pass4Msg");

  if (pass1 !== pass2) {
    pass3Error.innerHTML = "Password does not match";
    pass4Error.innerHTML = "Password does not match";
    return false;
  }
  if (pass1 == "" && pass2 == "") {
    pass3Error.innerHTML = "Password is required";
    pass4Error.innerHTML = "Password is required";
    return false;
  }
  pass3Error.innerHTML = " ";
  pass4Error.innerHTML = " ";
  return true;
}

const changePassword = () => {
  const pass1 = document.getElementById("Pass3").value;
  axios.patch("/ChangePassword", { Password: pass1 }).then((e) => {
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
        title: "Password has been Changed",
      });
    }
  });
};
