// Access To Element We Will Use

let headrLinks= document.querySelector(".headr .links");
let headrSearch= document.querySelector(".search");
let burgerIcon= document.querySelector(".burger-icon");
let firstSpanIcon= document.querySelector(".burger-icon .first");
let lastSpanIcon= document.querySelector(".burger-icon .last");

// Part Of Variables

let openIcon= false;

// Main Code

clickOnBurgerIcon();

// Part Of Function

function clickOnBurgerIcon(){
  burgerIcon.onclick= function (){
    if (openIcon === false){
      firstSpanIcon.style.cssText= "width: 100% ; transition: 0.4s";
      lastSpanIcon.style.cssText= "width: 100% ; transition: 0.4s";
      openIcon= true;
      appereHeadrLinksInDifferentWidth();
    }
    else {
      firstSpanIcon.style.cssText= "width: 60% ; transition: 0.4s";
      lastSpanIcon.style.cssText= "width: 60% ; transition: 0.4s";
      openIcon= false;
      appereHeadrLinksInDifferentWidth();
    }
  }
}

function appereHeadrLinksInDifferentWidth(){
  if (window.innerWidth > 992){
    headrLinks.style.cssText= "height: 100%";
  }
  else if (window.innerWidth <= 992 && window.innerWidth > 500){
    if (openIcon === true){
      headrLinks.style.cssText= "height: 165px ; padding: 10px ; transition: 0.8s";
    }
    else {
      headrLinks.style.cssText= "height: 0 ; height: 0 ; transition: 0.8s";
    }
  }
  else{
    if (openIcon === true){
      headrLinks.style.cssText= "right: 0 ; transition: 1s";
      headrSearch.style.cssText= "right: 50% ; transition: 1s";
    }
    else {
      headrLinks.style.cssText= "right: -100% ; transition: 1s";
      headrSearch.style.cssText= "right: -100% ; transition: 1s";
    }
  }
}

