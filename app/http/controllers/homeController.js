function homeController(){
    return {
        index(req,res){

            res.render('home',{ user:  req.cookies.user });
            // res.render('home',{layout:'home'});
        }
    }
}


module.exports = homeController