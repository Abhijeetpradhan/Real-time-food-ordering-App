const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const homeController= require('../app/http/controllers/homeController');
const menuController=require('../app/http/controllers/menuController');
const {adminOrderController} = require('../app/http/controllers/admin/orderController');
const {statusController} = require('../app/http/controllers/admin/statusController')


function initRoutes(app){


    app.get('/', homeController().index)
    
    app.get('/login', authController().login);

    app.post('/login', authController().postLogin);
    
    app.get('/register', authController().register);

    app.post('/register', authController().postRegister);

    app.post('/logout', authController().logout);
    
    app.get('/menu',menuController().index);

    app.get('/cart',cartController().index)

    app.post('/update-cart',cartController().update)

    app.post('/increment-cart',cartController().plus)
    
    app.post('/decrement-cart',cartController().minus)

    app.post('/remove-cart',cartController().remove)

    // customer routes
    app.post('/orders',orderController().store)

    app.get('/customer/orders',orderController().index)

    app.get('/customer/orders/:id',orderController().show)
    
    //Admin routes
    app.get('/admin/orders',adminOrderController)

    app.post('/admin/order/status', statusController)

}


module.exports=initRoutes