// Access To Element We Will Use

let largePicture= document.querySelector(".large-pic img");
let smallPictures= Array.from(document.querySelectorAll(".small-pic img"));
let countOrder= document.querySelector(".count span");
let upCount= document.querySelector(".fa-caret-up");
let upDown= document.querySelector(".fa-caret-down");
let loveIcon= document.querySelector(".fa-heart");
let infoReviewsLinks= Array.from(document.querySelectorAll(".info-reviews .list li"));
let infoReviewsBoxs= Array.from(document.querySelectorAll(".info-reviews .type-box"));

// Part Of Variables

let CountProductOrder= 1;

// Main Code

smallPictures.forEach((pic) => {
  pic.addEventListener("click", (eve) => {
    largePicture.setAttribute("src",`${eve.currentTarget.getAttribute("src")}`);
  })
})

upCount.onclick= function (){
  CountProductOrder++;
  countOrder.innerHTML= `${CountProductOrder}`;
}
upDown.onclick= function (){
  if (CountProductOrder > 1){
    CountProductOrder--;
    countOrder.innerHTML= `${CountProductOrder}`;
  }
}

loveIcon.onclick= function (){
  if (loveIcon.classList.contains("fa-regular")){
    loveIcon.classList.remove("fa-regular");
    loveIcon.classList.add("fa-solid");
    loveIcon.style.cssText= "color: red !important";
  }
  else{
    loveIcon.classList.remove("fa-solid");
    loveIcon.classList.add("fa-regular");
    loveIcon.style.cssText= "color: #212121";
  }
}

infoReviewsLinks.forEach((link) => {
  link.addEventListener("click", (eve) => {
    infoReviewsLinks.forEach((link) => {
      link.classList.remove("active");
    })
    eve.currentTarget.classList.add("active");

    infoReviewsBoxs.forEach((box) => {
      box.style.cssText= "display: none";
    })

    let type= eve.currentTarget.dataset.type;

    infoReviewsBoxs.forEach((box) => {
      if (box.classList.contains(`${type}`)){
        box.style.cssText= "display: block";
      }
    })
  })
})

