const Order= require('../../../models/order');
const moment = require("moment")

async function statusController(req, res) {
    try {
        const { orderId, orderStatus } = req.body;
    
        await Order.updateOne({_id: orderId}, { $set: { status: orderStatus }});

        const eventEmitter = req.app.get('eventEmitter')
        eventEmitter.emit('orderUpdated',{ _id: orderId, status: orderStatus, updatedAt: moment().format() })
        
        return res.redirect('/admin/orders');


    } catch(err) {
        return res.redirect('/admin/orders');
    }

}

module.exports = {statusController}