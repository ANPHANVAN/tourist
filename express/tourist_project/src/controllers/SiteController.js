const JWT_SECRET = process.env.JWT_SECRET
const User  = require('../models/userModel');
const jwt = require('jsonwebtoken')
const UserMongo = require('../models/userMongoModel');
const {pushlishUserEvent} = require('../services/queueRabbitService')

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

    async logout(req,res,next){
        try {
            res.clearCookie('token');
            res.redirect('/login');
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

            let result = await User.findByUsername(registerInformation.username)
            if (result.rows.length>0) {
                res.render('sites/apology', {message: `Username already exists`});
            } else {
                await User.create(registerInformation.fullName, registerInformation.username, registerInformation.email, registerInformation.password)
                
                let user = await User.findByUsername(registerInformation.username)
                let resgisterInformationMongo = {
                    user_id: user.rows[0].id,
                    username: user.rows[0].username,
                    email: user.rows[0].email,
                    fullname: user.rows[0].fullname
                }
                await pushlishUserEvent(resgisterInformationMongo, 'create')
                res.redirect('/login');
            }

        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    // [POST] /login/authencation
    async authentication(req,res,next) {
        try {
            let loginInformation = req.body
            let result = await User.findByUsername(loginInformation.username)
            let isMatch = await User.comparePassword(result.rows[0].hash_password, loginInformation.password)

            if (result.rows.length == 0) {
                res.render('sites/apology', {message: `Username does not exist`});
            } else if (isMatch == false) {
                res.render('sites/apology', {message: `Password is incorrect`});
            } else {
                const userMongo = await UserMongo.findOne({user_id: result.rows[0].id})
                const ObjectId = userMongo._id.toString()
                const token = jwt.sign({id: result.rows[0].id, ObjectId: ObjectId}, JWT_SECRET, {expiresIn: '24h'});
    
                res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 3600000});
                res.redirect('/');
            }

        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new SiteController();