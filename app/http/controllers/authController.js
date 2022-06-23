const User = require('../../models/user');
const bcrypt = require('bcrypt');
function authController(){
    return {
        login(req,res){
            if(!req.cookies.user) {

                res.render('auth/login', { user: req.cookies.user });
            } else {
                res.redirect("/")
            }
        },
        async postLogin(req,res){
            const {email,password} = req.body;
            //validate request
        if(!email || !password)
        {
            req.flash('error','All fields are required')
            req.flash('email',email)
            
            return res.redirect('/login')
        }

        let user = await User.findOne({ email });
        // const validPassword = await bcrypt.compare(password, user.password);

        if(user){

            const validPassword = await bcrypt.compare(password, user.password);

            if(validPassword){

                req.flash('email',email);

                user.password = undefined;

                req.session.user = user;
                res.cookie("user", req.session.user);
            
                return res.redirect('/')
            }

            else{
                req.flash('error','Please enter a valid password')

                req.flash('email', email)

                return res.redirect('/login')
                // return res.redirect('/login', { user: req.cookies.user })
            }
        }

        else{
            req.flash('error','Please enter a valid email')
            return res.redirect('/login')
        }
        
        },
        
        register(req,res){
            // res.render('auth/register', { layout: 'auth/register' });
            // res.render('auth/register');
            if(!req.cookies.user) {

                res.render('auth/register', { user: req.cookies.user });
            } else {
                res.redirect('/')
            }
        },
       async postRegister(req,res){
            const {name,email,password} = req.body;
            //validate request
        if(!name || !email || !password)
        {
            req.flash('error','All fields are required')
            req.flash('name',name)
            req.flash('email',email)
            return res.redirect('/register')
        }

        // check if email exists in db
        User.exists({email:email},(err,result)=>{
            if(result){
            req.flash('error','Email alredy exists')
            req.flash('name',name)
            req.flash('email',email)
            return res.redirect('/register')
            }
        })


        //hash password 
        const hashedPassword = await bcrypt.hash(password,10)


        // create a user
        const user = new User({
            name,
            email,
            password:hashedPassword
        })

        user.save().then((user)=>{
            // login


            return res.redirect('/menu')
        }).catch(err =>{
            req.flash('error','Something went wrong')
            return res.redirect('/register')
        })


            console.log(req.body)
        },
        logout(req,res){
            res.clearCookie('user')
            return res.redirect('/login')
        }

    }
}


module.exports = authController


