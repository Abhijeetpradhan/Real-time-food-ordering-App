const Menu = require('../../models/menu')

function menuController(){
    return {
        async index(req,res){

            const pizzas = await Menu.find()
            return res.render('menu',{ user:  req.cookies.user, pizzas:pizzas });
            
        }
    }
}


module.exports = menuController