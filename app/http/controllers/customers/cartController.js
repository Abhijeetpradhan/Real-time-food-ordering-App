function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart', { user: req.cookies.user });
        },
        update(req, res) {
            //for 1st time creating cart and adding basic object structure
            
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }

            }
            let cart = req.session.cart

            // check if item doesnot exist in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1

                }

                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            
            return res.json({ totalQty: req.session.cart.totalQty })
        },
        plus(req,res){
            let cart = req.session.cart
            cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
                return res.json({ totalQty: req.session.cart.totalQty })
        },
        minus(req,res){
            let cart = req.session.cart
            if(cart.items[req.body._id].qty > 1){
                cart.items[req.body._id].qty = cart.items[req.body._id].qty - 1
                cart.totalQty = cart.totalQty - 1
                cart.totalPrice = cart.totalPrice - req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })
        },
        remove(req,res){
            let cart = req.session.cart;
            

              if (cart.items[req.body._id].qty > 0) {
                cart.totalQty = cart.totalQty - cart.items[req.body._id].qty
                cart.totalPrice = cart.totalPrice - cart.items[req.body._id].qty*req.body.price
                delete cart.items[req.body._id];
                
                
                
              }
              if(cart.totalQty == 0){
                delete req.session.cart;
              }

            let totalQty = cart ? cart.totalQty : 0;
            return res.json({ totalQty: totalQty, cartItems: cart.items });
        }
        
          }
        
    }





module.exports = cartController