// Access To Element We Will Use

let subtotal= document.querySelector(".subtotal-value");
let shipping= document.querySelector(".shipping-value");
let total= document.querySelector(".total-value");

// Part Of Variables

let arrayOfDataOfCaret=[];

if (window.localStorage.getItem("dataOfCaret")){
  arrayOfDataOfCaret= JSON.parse(window.localStorage.getItem("dataOfCaret"))
}

// Main Code

creatElementsInCaretTools();

// Part Of Functions

function creatElementsInCaretTools(){
  let body= document.querySelector("tbody");

  for (let x=0 ; x<arrayOfDataOfCaret[0].img.length ; x++){
    
    let tr= document.createElement("tr");
    // Add Picture Of Products
    let tdImg= document.createElement("td");
    let img= document.createElement("img");
    img.setAttribute("src", `${arrayOfDataOfCaret[0].img[x]}`);
  
    tdImg.appendChild(img);
  
    // Add Type And Count Of Products
    let tdTypeAndCount= document.createElement("td");
    let type= document.createElement("h4");
    let count= document.createElement("span");
    type.innerHTML= `${arrayOfDataOfCaret[0].type[x]}`;
    count.setAttribute("class", "count");
    count.innerHTML= `x${arrayOfDataOfCaret[0].count[x]}`;
  
    tdTypeAndCount.appendChild(type);
    tdTypeAndCount.appendChild(count);
    
  
    // Add Price Of Products
    let tdPrice= document.createElement("td");
    let price= document.createElement("span");
    price.setAttribute("class", "price");
    price.innerHTML= `${arrayOfDataOfCaret[0].price[x]}`;
  
    tdPrice.appendChild(price);

    tr.appendChild(tdImg);
    tr.appendChild(tdTypeAndCount);
    tr.appendChild(tdPrice);

    body.prepend(tr);
  }
  
  // Add Subtotal And Shipping And Total Of Products
  subtotal.innerHTML= `$${arrayOfDataOfCaret[0].subtotal}`;
    if (subtotal.innerHTML === "$0"){
      shipping.innerHTML= "$0";
      total.innerHTML= "$0";
    }
    else {
      shipping.innerHTML= `$${arrayOfDataOfCaret[0].shipping}`;
    total.innerHTML= `$${parseInt(arrayOfDataOfCaret[0].subtotal) + parseInt(arrayOfDataOfCaret[0].shipping)}`;
    }
}