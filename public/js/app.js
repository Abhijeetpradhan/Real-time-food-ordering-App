let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');
let minus=document.querySelectorAll('.minus')
let plus=document.querySelectorAll('.plus')
// let qty=document.querySelectorAll('#qty')
let del=document.querySelectorAll('#delete')
// import moment from 'moment'
// moment = require('moment')

// import axios from 'axios';
// import {initAdmin} from './admin';

//updating the cart by add-to-cart 

function updateCart(pizza) {

    axios.post('/update-cart', pizza).then(res => {
        
        cartCounter.innerText = res.data.totalQty
        // qty.innerText = res.data.totalQty
        let notyf = new Notyf({
            duration: 2000,
            position:{x:'right' , y:'top'},
        })
        
        notyf.success('Item added to cart');
        // window.location.reload();
        

    }).catch(err => {
        let notyf = new Notyf({
            duration: 2000,
            position: {
                x: 'right',
                y: 'top',
            }
        })
        notyf.error('Something went wrong')
    })
}

function increment(pizza){
    axios.post('/increment-cart', pizza).then(res =>{
        
    })
    
     window.setTimeout(function(){location.reload()},200)
}

function decrement(pizza){
    axios.post('/decrement-cart', pizza).then(res =>{

    })
    
     window.setTimeout(function(){location.reload()},200)
}

function remove(pizza){
    axios.post('/remove-cart', pizza).then(res =>{
        
    })
    
     window.setTimeout(function(){location.reload()},200)
    
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza);
    })
    
})

// updating the cart by plus and minus
plus.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        // if data fetched from session , there will be have "item object" => (cart.ejs)
        if (pizza.item) {
            pizza = pizza.item;
        }
        // updateCart(pizza);
        increment(pizza);
        });
    })

minus.forEach((btn) =>{
    btn.addEventListener('click',(e) =>{
        let pizza = JSON.parse(btn.dataset.pizza)
        if (pizza.item) {
            pizza = pizza.item;
        }
        decrement(pizza);
        });
    });

del.forEach((btn) =>{
    btn.addEventListener('click',(e) =>{
        let pizza = JSON.parse(btn.dataset.pizza)
        if (pizza.item) {
            pizza = pizza.item;
        }
        remove(pizza);
    })
})
 

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

{/* <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> */}

// initAdmin()


// change order status 
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
    //    console.log(dataProp)
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            // time.innerText = moment(order.updatedAt).format('hh:mm A')
            // status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order)


//socket
const socket = io();

// join
if(order){
    socket.emit('join',`order_${order._id}`)
}

socket.on('orderUpdated',(data)=>{

    

    // const updatedOrder = Object.assign(order)
    const updatedOrder = { ...order}
    updatedOrder.updatedAt = data.updatedAt;
    updatedOrder.status = data.status;
    // console.log(data);
    updateStatus(updatedOrder)
    let notyf = new Notyf({
        duration: 2000,
        position:{x:'right' , y:'top'},
    })
    
    notyf.success('Order updated'); 
});
