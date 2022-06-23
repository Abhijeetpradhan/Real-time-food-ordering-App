
const decrement = (value)=>{
    let itemval=document.getElementById(value);
    if(itemval.value <= 1){
        itemval.value=1;
    }else{
        itemval.value=parseInt(itemval.value)-1;
        itemval.style.background='white';
        itemval.style.color='black';
    }
}
const increment = (value)=>{
    let itemval=document.getElementById(value);
    if(itemval.value >= 10){
        itemval.value=10;
        alert("max 10 items allowed");
        itemval.style.background='red';
        itemval.style.color='white';
    }else{
        itemval.value=parseInt(itemval.value)+1;
        
    }
}