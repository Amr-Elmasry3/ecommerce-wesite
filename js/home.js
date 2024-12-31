// Access To Element We Will Use

let allSectionLinks= Array.from(document.querySelectorAll(".section-links li"));
let allSectionBox= Array.from(document.querySelectorAll(".sections .contanier .content .box-of-sections"));
let allHeartIcon= Array.from(document.querySelectorAll(".icons .fa-heart"));
let allAddCaret= Array.from(document.querySelectorAll(".box-of-sections .cart"));
let allDays= Array.from(document.querySelectorAll(".box-time .days"));
let allHours= Array.from(document.querySelectorAll(".box-time .hours"));
let allMinutes= Array.from(document.querySelectorAll(".box-time .minutes"));
let allSconds= Array.from(document.querySelectorAll(".box-time .seconds"));

// Part Of Variables

let arrayOfActiveCart= [];
let arrayOfDataFromHome= [];

if (window.localStorage.getItem("activeCaret")){
  arrayOfActiveCart= JSON.parse(window.localStorage.getItem("activeCaret"));
}

// Main Code

CounterOfDealSection();
// Check From Local Storage
checkClassActiveOnCaret();
// Storage Info About Product It Cart Element Contanis Active Class
AddProductToCartToLocalStorage();

// Swiper For Category Section
var swiperCategories = new Swiper(".mySwiper-one", {
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next-one",
    prevEl: ".swiper-button-prev-one",
  },
  breakpoints: {
    1030: {
      slidesPerView: 7,
    },
    992: {
      slidesPerView: 6,
    },
    767: {
      slidesPerView: 5,
    },
    500: {
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
    },
  },
});

// Swiper For New Arrivals Section
var swiperNewArrivals = new Swiper(".mySwiper-two", {
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next-two",
    prevEl: ".swiper-button-prev-two",
  },
  breakpoints: {
    1030: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 2,
    },
    550: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
});

allSectionLinks.forEach((link) => {
  link.addEventListener("click", (eve) => {
    allSectionLinks.forEach((link) => {
      link.classList.remove("active");
    })
    eve.currentTarget.classList.add("active");
    allSectionBox.forEach((box) => {
      box.style.cssText= "display: none";
    })
    if (eve.currentTarget.classList.contains("popular")){
      allSectionBox.forEach((box) => {
        if (box.classList.contains("popular")){
          box.style.cssText= "display: block";
        }
      })
    }
    else if (eve.currentTarget.classList.contains("new")){
      allSectionBox.forEach((box) => {
        if (box.classList.contains("new")){
          box.style.cssText= "display: block";
        }
      })
    }
    else {
      allSectionBox.forEach((box) => {
        box.style.cssText= "display: block";
      })
    }
  })
});

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
});

// Click On Caret Element And Refresh LocalStorage
clickOnCaretAndCheckLocalStorage();

// Part Of Functions

function CounterOfDealSection(){

  let days,hours,minutes,seconds;

  let dealCounter= setInterval(() => {
    let nowDate= new Date().getTime();
    let dealTime= new Date("Mon Dec 16 2025 15:50:59").getTime();
    let difference= dealTime - nowDate;

    // Set Days
    days= Math.floor((difference / (1000 * 60 * 60 * 24)));
    allDays.forEach((day) => {
      if (days >= 10){
        day.innerHTML= `${days}`;
      }
      else {
        day.innerHTML= `0${days}`;
      }
    })

    // Set Hours
    hours= (difference % (1000 * 60 * 60 * 24));
    allHours.forEach((hour) => {
      if (Math.floor(hours / (1000 * 60 * 60)) >= 10){
        hour.innerHTML= Math.floor(hours / (1000 * 60 * 60));
      }
      else {
        hour.innerHTML= `0${Math.floor(hours / (1000 * 60 * 60))}`;
      }
    })

    // Set Minutes
    minutes= (difference % (1000 * 60 * 60));
    allMinutes.forEach((minute) => {
      if (Math.floor(minutes / (1000 * 60)) >= 10){
        minute.innerHTML= Math.floor(minutes / (1000 * 60));
      }
      else {
        minute.innerHTML= `0${minute.innerHTML= Math.floor(minutes / (1000 * 60))}`;
      }
    })

    // Set Seconds
    seconds= (difference % (1000 * 60));
    allSconds.forEach((second) => {
      if (Math.floor(seconds / 1000) >= 10){
        second.innerHTML= Math.floor(seconds / 1000);
      }
      else {
        second.innerHTML= `0${Math.floor(seconds / 1000)}`;
      }
    })

    if (difference === 0){
      clearInterval(dealCounter);
    }

  },1000)
}

function clickOnCaretAndCheckLocalStorage() {
  allAddCaret.forEach((cart) => {
    cart.onclick= function (){
      if (cart.classList.contains("active")){
        cart.classList.remove("active");
        for (let x=0 ; x<arrayOfActiveCart.length ; x++){
          if (cart.dataset.number === arrayOfActiveCart[x]){
            arrayOfActiveCart.splice(x,1);
            arrayOfActiveCart.sort();
          }
        }
        AddProductToCartToLocalStorage();
      }
      else {
        cart.classList.add("active");
        arrayOfActiveCart.push(cart.dataset.number);
        arrayOfActiveCart.sort();
        AddProductToCartToLocalStorage();
      }
      window.localStorage.setItem("activeCaret", JSON.stringify(arrayOfActiveCart));
    }
  });
}

function checkClassActiveOnCaret(){
  allAddCaret.forEach((cart) => {
    if (arrayOfActiveCart.includes(`${cart.dataset.number}`)){
        cart.classList.add("active");
      }
  })
}

function AddProductToCartToLocalStorage(){

  arrayOfDataFromHome= [];

  let dataFromHome= {
    img: [],
    price: []
  }

  allAddCaret.forEach((cart) => {
    if (cart.classList.contains("active")){
      let img= cart.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
      let price= cart.previousElementSibling;

      dataFromHome.img.push(`${img.firstElementChild.getAttribute("src")}`);
      dataFromHome.price.push(`${price.firstElementChild.innerHTML}`);
    }
  })

  arrayOfDataFromHome.push(dataFromHome);
  window.localStorage.setItem("dataFromHome", JSON.stringify(arrayOfDataFromHome));
}

// window.localStorage.clear();