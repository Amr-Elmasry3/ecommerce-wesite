// Access To Element We Will Use

let allHeartIcon= Array.from(document.querySelectorAll(".icons .fa-heart"));
let countProducts= document.querySelector(".count-products");
let shopProducts= Array.from(document.querySelectorAll(".products .box-of-sections"));

// Main Code

countProducts.innerHTML= `${shopProducts.length}`;

allHeartIcon.forEach((heart) =>{
  heart.addEventListener("click", (eve) =>{
    if (eve.currentTarget.classList.contains("fa-regular")){
      eve.currentTarget.classList.remove("fa-regular");
      eve.currentTarget.classList.add("fa-solid");
      eve.currentTarget.style.cssText= "color: red !important";
    }
    else{
      eve.currentTarget.classList.remove("fa-solid");
      eve.currentTarget.classList.add("fa-regular");
      eve.currentTarget.style.cssText= "color: #212121";
    }
  })
})

shopProducts.forEach((product) => {
  product.onclick= function (){
    window.location.assign("product_details.html");
  }
})