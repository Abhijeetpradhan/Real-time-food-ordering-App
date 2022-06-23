const btn=document.querySelector('#btn');
const menu=document.querySelector('#menu');
const banner=document.querySelector('#banner');
const menubar=document.querySelector("#tabs-id");



btn.addEventListener('click' ,()=>{
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
        banner.classList.add('margin-t');
        menubar.classList.add('padding-t');
    }else{
        menu.classList.add('hidden');
        banner.classList.remove('margin-t');
        menubar.classList.remove('padding-t');
    }

})


function changeActiveTab(event,tabID){
    let element = event.target;
    while(element.nodeName !== "A"){
      element = element.parentNode;
    }

    divElement=element.parentNode;
    aElements = divElement.querySelectorAll("a");
    tabContents = document.getElementById("tabs-id").querySelectorAll(".tab-content > div");
    for(let i = 0 ; i < aElements.length; i++){
        aElements[i].classList.remove("bg-primary");
        tabContents[i].classList.add("hidden");
        tabContents[i].classList.remove("block");
      }
      element.classList.add("bg-primary");
      document.getElementById(tabID).classList.remove("hidden");
      document.getElementById(tabID).classList.add("block");
    }  


    











