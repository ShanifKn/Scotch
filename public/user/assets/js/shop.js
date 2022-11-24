
let product;
const CategoryMap = (id) => {
      axios.get("/userCategory", { params: { id: id } }).then((product) => {
            document.getElementById("MapProduct").innerHTML = ""

            let html = ``
            console.log(product.data.product)

            for (let i = 0; i < product.data.product.length; i++) {
                  html += ` 
                    <div class="col-lg-4 col-md-6 col-sm-6">
                              <div class="product__item">
                                    <a href="/productdetail/${product.data.product[i]._id} ">
                                          <div class="product__item__pic set-bg" data-setbg=" ">
                                                <img src="${product.data.product[i].images[0].Location}"
                                                      alt="">`

                  if (product.data.user ) {
                        html += `     <ul class="product__hover">
                              <li
                                    id="wishlistButton${product.data.product[i]._id}">
                                    <a
                                          onclick="addToWishlist('${product.data.product[i]._id}')">
                                          <i class="bi bi-heart"></i>
                                    </a>
                              </li>
                        </ul>             </div>
                       </a>

                       <div class="product__item__text">
                             <h6>
                                   ${product.data.product[i].Product_title}
                             </h6>
                             <div class="rating">
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                             </div>
                             <div class="flex">
                                   <del><span class=" ">₹${product.data.product[i].Price.Retail_price}
                                         </span></del>
                                   <h5 class="ml-2">₹${product.data.product[i].Price.Offer_price}
                                   </h5>
                             </div>

                             <div class="product__color__select">
                                   <label for="pc-4">
                                         <input type="radio" id="pc-4">
                                   </label>
                                   <label class="active black" for="pc-5">
                                         <input type="radio" id="pc-5">
                                   </label>
                                   <label class="grey" for="pc-6">
                                         <input type="radio" id="pc-6">
                                   </label>
                             </div>

                       </div>
                       <a onclick="addCart('${product.data.product[i]._id}')"
                                                class="add-cart text-danger">+
                                                Add To
                                                Cart</a>
                 </div>


           </div>
`
                  } else {
                        html += `
                             </div>
                       </a>

                       <div class="product__item__text">
                             <h6>
                                   ${product.data.product[i].Product_title}
                             </h6>
                             <div class="rating">
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                                   <i class="fa fa-star-o"></i>
                             </div>
                             <div class="flex">
                                   <del><span class=" ">₹${product.data.product[i].Price.Retail_price}
                                         </span></del>
                                   <h5 class="ml-2">₹${product.data.product[i].Price.Offer_price}
                                   </h5>
                             </div>

                             <div class="product__color__select">
                                   <label for="pc-4">
                                         <input type="radio" id="pc-4">
                                   </label>
                                   <label class="active black" for="pc-5">
                                         <input type="radio" id="pc-5">
                                   </label>
                                   <label class="grey" for="pc-6">
                                         <input type="radio" id="pc-6">
                                   </label>
                             </div>
                       </div>    
                 </div>
           </div>`
                  }

            }
            document.getElementById("MapProduct").innerHTML = html;




      })
}


const addToWishlist = (id) => {
      axios.post("/addToCart", { id }).then((e) => {
            if (e.data.response == true) {
                  const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                  })

                  Toast.fire({
                        icon: 'success',
                        title: 'Add to Wishlist',
                  })
                  document.getElementById("wishlistButton" + id).innerHTML = ` <a>
                                                                        <i class="bi bi-heart-fill"></i>
                                                                  </a>`}
            else {
                  const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                  })

                  Toast.fire({
                        icon: 'warning',
                        title: 'Item Already Exist!',
                  })
            }
      })
}
const addCart = (id) => {
      axios.post("/addCart", { id: id }).then((e) => {
            if (e.data.response) {
                  const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                  })

                  Toast.fire({
                        icon: 'success',
                        title: 'Item Added to cart',
                  })
            }
      })

}

