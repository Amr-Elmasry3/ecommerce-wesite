// Access To Elemnets We Will Use

let allAcountList= Array.from(document.querySelectorAll(".list li"));
let allAcountListContent= Array.from(document.querySelectorAll(".list-content .box"));

// Main Code

allAcountList.forEach((list) => {
  list.addEventListener("click",(eve) => {
    allAcountList.forEach((list) => {
      list.classList.remove("my-account-active");
    })
    eve.currentTarget.classList.add("my-account-active");

    allAcountListContent.forEach((content) => {
      content.style.cssText= "display: none";
    })

    let type= eve.currentTarget.dataset.type;

    allAcountListContent.forEach((content) => {
      if (content.classList.contains(`${type}`)){
        content.style.cssText= "display: block";
      }
    })
  })
})

