const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')

const User  = require('../models/userModel');
const Destination = require('../models/destinationModel')


class DestinationController {
    // GET /destination
    async index(req,res,next){
        try {
            const destinations = await Destination.find({})
            res.render('destinations/index', {destinations:destinations})
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    // GET /destination/add-new
    async addNew(req,res,next){
        try {
            res.render('destinations/addNew')
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    // POST /destination/add-new
    async addNewPost(req,res,next){
        try {
            // take data and add data to mongodb
            const newDestination = req.body
            console.log(newDestination)
            const addNewDestination = await Destination.create(newDestination)
            res.redirect('/destination')
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

    // GET /destination/:slug
    async detailDestination(req,res,next){
        try {
            const slug = req.params.slug
            const destination = await Destination.findOne({slug:slug})
            res.render('destinations/detailDestination', {destination:destination})
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new DestinationController();