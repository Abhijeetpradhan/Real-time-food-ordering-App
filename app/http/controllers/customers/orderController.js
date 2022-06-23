const Order = require('../../../models/order')
const moment = require('moment')

function orderController(){
    return{
        store(req,res){
            // validate request
            const{phone,address} = req.body
            if(!phone || !address){
                req.flash('error',"All fields are required")
                return res.redirect('/cart')
            }

            if(!/^[6-9]\d{9}$/.test(phone)) {
                // req.flash('error',"Invalid phone number")
                return res.redirect('/cart')   
            }

            const order = new Order({
                customerId: req.session.user._id,//here we have changed req.user._id to req.session.user._id
                items:req.session.cart.items,
                phone,
                address
            })

            order.save().then(result =>{
                req.flash('success','Order placed successfully')
                delete req.session.cart
                return res.redirect('/customer/orders')
            }).catch(err =>{
                req.flash('error',"Something went wrong")
                return res.redirect('/cart')
            })
        },
        
        async index(req,res){
            if(!req.cookies.user) {

                res.render('auth/login', { user: req.cookies.user });
            } 
            // else {
            //     res.redirect("/customer/orders")
            // }
            const orders = await Order.find({ customerId: req.session.user._id },null,{ sort:{ 'createdAt':-1 } })
            // res.render('customers/orders',{orders: orders,moment: moment})
            res.render('customers/orders',{ user:  req.cookies.user, orders:orders, moment: moment})
            
        },

        async show(req,res){
            const order = await Order.findById(req.params.id);
            if(req.session.user._id.toString() === order.customerId.toString()){
                return res.render('customers/singleOrder',{user:  req.cookies.user ,order})
            }

            return res.redirect('/')

        }
    }
}

module.exports = orderController