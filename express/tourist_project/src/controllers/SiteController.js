const User  = require('../models/userModel');

class SiteController {
    async index(req,res,next){
        try {
            res.render('sites/home');
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    async login(req,res,next){
        try {
            res.render('sites/login');
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    async register(req,res,next){
        try {
            res.render('sites/register');
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    // [POST] /register-new
    async registerNew(req,res,next){
        try {
            let registerInformation = req.body
            console.log(registerInformation)
            let result = await User.checkByUsername(registerInformation.username)
            if (result) {
                res.render('sites/apology', {message: `Username already exists`});
            } else {
                User.create(registerInformation.fullName, registerInformation.username, registerInformation.email, registerInformation.password)
                res.redirect('/login');
            }

        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new SiteController();