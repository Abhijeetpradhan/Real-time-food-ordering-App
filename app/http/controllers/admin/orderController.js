const moment = require("moment");
const order=require('../../../models/order')

async function adminOrderController(req, res){

    

    const orders = await order.find({ status:{ $ne:'completed' }}).sort("-createdAt").populate('customerId','-password');
    // if(!req.cookies.user) {

    //    return res.render('auth/login', { user: null });//error
    // }


    if(!orders) {
        res.render("admin/orders", { user:  req.cookies.user, orders: [] });
    }

    let serializedOrdersData = [];

    orders.forEach((order) => {
        const obj = {
             customerName :  order.customerId.name,
             address : order.address,
             orderId : order._id,
             customerId: order.customerId._id,
             items : order.items,
             orderStatus : order.status,
             createdAt : moment(order.createdAt).format('hh:mm A'),

        }

        serializedOrdersData.push(obj);
    });

    res.render("admin/orders", { user:  req.cookies.user, orders: serializedOrdersData });

}

module.exports={ adminOrderController }