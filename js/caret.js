// Access To Element We Will Use Part One
let caretToolsButton= document.querySelector(".cart-tools .buttons");
let tbodyTable= document.querySelector("tbody");

// Part Of Variables

let arrayOfDataOfCaret= [];
let arrayOfDataFromHome= [];
let activeCaret= [];
let countProduct=0;
let valueOfSubtotal=0, valueShipping=0;
let boolan= false;

if (window.localStorage.getItem("dataOfCaret")){
  arrayOfDataOfCaret= JSON.parse(window.localStorage.getItem("dataOfCaret"));
}

if (window.localStorage.getItem("dataFromHome")){
  arrayOfDataFromHome= JSON.parse(window.localStorage.getItem("dataFromHome"));
  boolan= true;
}

if (window.localStorage.getItem("activeCaret")){
  activeCaret= JSON.parse(window.localStorage.getItem("activeCaret"));
}

// Main Code

// Creat Table From Info In LocalStorage
creatTableOfProducts();

// Access To Element We Will Use Part Two
let allCaretUp= Array.from(document.querySelectorAll(".up-down .fa-caret-up"));
let allCaretDown= Array.from(document.querySelectorAll(".up-down .fa-caret-down")); 
let allDeleteIcon= Array.from(document.querySelectorAll("td .fa-trash-can"));
let allImg= Array.from(document.querySelectorAll("td img"));
let allCount= Array.from(document.querySelectorAll(".count span"));
let allProductSubtotal= Array.from(document.querySelectorAll("td .subtotal"));
let valueWithoutShipping= document.querySelector(".value-without-shipping");
let valueOfShipping= document.querySelector(".shipping");
let valueWithShipping= document.querySelector(".value-with-shipping");

calcSubtotalForProduct();

calcValueOfProductsCaret();

// This We Use Them In CheckOut Page
setDataInLocalStorage();




allCaretUp.forEach((up) => {
  up.onclick= function (){
    up.parentElement.parentElement.firstElementChild.innerHTML++;
    calcSubtotalForProduct();
    calcValueOfProductsCaret();
    setDataInLocalStorage();
  }
})

allCaretDown.forEach((down) => {
  down.onclick= function (){
    if (parseInt(down.parentElement.parentElement.firstElementChild.innerHTML) > 1){
      down.parentElement.parentElement.firstElementChild.innerHTML--;
      calcSubtotalForProduct();
      calcValueOfProductsCaret();
      setDataInLocalStorage();
    }
  }
})

allDeleteIcon.forEach((ele) => {
  ele.onclick= function (){
    let imgProduct= ele.parentElement.parentElement;
    let srcImg= imgProduct.firstElementChild.firstElementChild.getAttribute("src");

    imgProduct.remove();
    for (let x=0 ; x<arrayOfDataFromHome[0].img.length ; x++){
      if (srcImg === arrayOfDataFromHome[0].img[x]){
        arrayOfDataFromHome[0].img.splice(x,1);
        arrayOfDataFromHome[0].price.splice(x,1);
        window.localStorage.setItem("dataFromHome",JSON.stringify(arrayOfDataFromHome));
        arrayOfDataOfCaret[0].count.splice(x,1);
        arrayOfDataOfCaret[0].img.splice(x,1);
        arrayOfDataOfCaret[0].price.splice(x,1);
        arrayOfDataOfCaret[0].type.splice(x,1);
        window.localStorage.setItem("dataOfCaret",JSON.stringify(arrayOfDataOfCaret));
        activeCaret.sort();
        activeCaret.splice(x,1);
        window.localStorage.setItem("activeCaret",JSON.stringify(activeCaret));
      }
    }
    window.location.reload();
  }
})

caretToolsButton.onclick= function (){
  window.location.assign("checkout.html");
}

// Part Of Functions

function creatTableOfProducts(){
  if (boolan === true){
    for (let x=0 ; x<arrayOfDataFromHome[0].img.length ; x++){
      let tr= document.createElement("tr");
      // Creat Pictures To Caret
      let tdimg= document.createElement("td");
      let img= document.createElement("img");
  
      img.setAttribute("src",`${arrayOfDataFromHome[0].img[x]}`);
      tdimg.appendChild(img);
  
      // Add Brand And Paragraph To Caret
      let tdBrandAndPara= document.createElement("td");
      let brand= document.createElement("h4");
      let para= document.createElement("p");
  
      brand.setAttribute("class","brand");
      brand.innerHTML= "Clothes Brand";
      para.innerHTML= "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
  
      tdBrandAndPara.appendChild(brand);
      tdBrandAndPara.appendChild(para);
  
      // Add Price To Caret
      let tdPrice= document.createElement("td");
      let price= document.createElement("span");
  
      price.setAttribute("class","price");
      price.innerHTML= `${arrayOfDataFromHome[0].price[x]}`;
  
      tdPrice.appendChild(price);
  
      // Add Count To Caret
      let tdCount= document.createElement("td");
      let divCount= document.createElement("div");
      let spanCount= document.createElement("span");
      let divUpAndDown= document.createElement("div");
      let upI= document.createElement("i");
      let downI= document.createElement("i");
  
      spanCount.innerHTML= "1";
      divCount.setAttribute("class","count");
      upI.setAttribute("class","fa-solid fa-caret-up");
      downI.setAttribute("class","fa-solid fa-caret-down");
      divUpAndDown.setAttribute("class","up-down");
  
      divUpAndDown.appendChild(upI);
      divUpAndDown.appendChild(downI);
      divCount.appendChild(spanCount);
      divCount.appendChild(divUpAndDown);
      tdCount.appendChild(divCount);
  
      // Add Subtotal To Caret
      let tdSubtotal= document.createElement("td");
      let subtotalSpan= document.createElement("span");
  
      subtotalSpan.setAttribute("class","subtotal");
  
      tdSubtotal.appendChild(subtotalSpan);
  
      // Add Icon Delete To Caret
      let tdIcon= document.createElement("td");
      let icon= document.createElement("i");
  
      icon.setAttribute("class","fa-solid fa-trash-can padding-border");
  
      tdIcon.appendChild(icon);
  
      // Add All Td Element To Tr
      tr.appendChild(tdimg);
      tr.appendChild(tdBrandAndPara);
      tr.appendChild(tdPrice);
      tr.appendChild(tdCount);
      tr.appendChild(tdSubtotal);
      tr.appendChild(tdIcon);
  
      // Add Tr To Tbody
      tbodyTable.appendChild(tr);
    }
  }
}

function calcSubtotalForProduct(){
  allCount.forEach((count) => {
    countProduct= parseInt(count.innerHTML);

    let valueOfPrice= parseInt(count.parentElement.parentElement.previousElementSibling.firstElementChild.innerHTML.slice(1));

    let subtotalOfProduct= count.parentElement.parentElement.nextElementSibling.firstElementChild;
    subtotalOfProduct.innerHTML= "$";
    subtotalOfProduct.innerHTML+= countProduct * valueOfPrice;
  })
}

function calcValueOfProductsCaret(){
  valueOfSubtotal=0;

  allProductSubtotal.forEach((price) => {
    valueOfSubtotal+= parseInt(price.innerHTML.slice(1));
  })
  
  valueWithoutShipping.innerHTML= `$${valueOfSubtotal}`;
  
  valueShipping= parseInt(valueOfShipping.innerHTML.slice(1));
  
  valueWithShipping.innerHTML= "$";
  valueWithShipping.innerHTML+= valueOfSubtotal + valueShipping;
}

// This We Use Them In CheckOut Page
function setDataInLocalStorage(){

  arrayOfDataOfCaret= [];
  
  let data= {
    img: [],
    type: [],
    count: [],
    price: [],
    subtotal: `${valueOfSubtotal}`,
    shipping: `${valueShipping}`,
  }

  allImg.forEach((img) => {
    data.img.push(img.getAttribute("src"));
    data.type.push("Yidarton Women Summer Blue");
  })
  
  allCount.forEach((count) => {
    data.count.push(count.innerHTML);
  })
  
  allProductSubtotal.forEach((price) => {
    data.price.push(price.innerHTML);
  })

  arrayOfDataOfCaret.push(data);

  window.localStorage.setItem("dataOfCaret", JSON.stringify(arrayOfDataOfCaret));
}

// window.localStorage.clear();