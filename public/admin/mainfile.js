
//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
//             integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
//             crossorigin="anonymous"></script>
//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
//             integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
//             crossorigin="anonymous"></script>

//       <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//       <script src="https://unpkg.com/axios/dist/axios.min.js"></script>




// var loadFile = function (event) {
//   var output = document.getElementById("output");
//   output.src = URL.createObjectURL(event.target.files[0]);
//   output.onload = function () {
//     URL.revokeObjectURL(output.src); // free memory
//   };
// };
// $(function () {
//   $("#fileupload").change(function () {
//     if (typeof FileReader != "undefined") {
//       var dvPreview = $("#dvPreview");
//       dvPreview.html("");
//       var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
//       $($(this)[0].files).each(function () {
//         var file = $(this);
//         if (regex.test(file[0].name.toLowerCase())) {
//           var reader = new FileReader();
//           reader.onload = function (e) {
//             var img = $("<img />");
//             img.attr("style", "height:100px;width: 100px");
//             img.attr("src", e.target.result);
//             dvPreview.append(img);
//           };
//           reader.readAsDataURL(file[0]);
//         } else {
//           alert(file[0].name + " is not a valid image file.");
//           dvPreview.html("");
//           return false;
//         }
//       });
//     } else {
//       alert("This browser does not support HTML5 FileReader.");
//     }
//   });
// });


