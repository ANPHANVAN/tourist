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

    // PATCH /destination/api/:id/went
    async countWentDestination(req,res,next) {
        try {
            const destinationId = req.params.id
            const currentUserId = req.body.currentUserId
            const destination = await Destination.findById(destinationId)

            const wentUsers = Array.isArray(destination.went_user) ? destination.went_user : [];
            const checkUserWented = wentUsers.includes(currentUserId);

            if (checkUserWented) {
                await Destination.updateOne(
                    { _id: destinationId },
                    {   $pull: { went_user: currentUserId },
                        $inc: { went_count: -1 }
                    }
                );
                return res.json({ message: 'UnWent' });
            } else {
                await Destination.updateOne({_id:destinationId},
                    { $push: { went_user: currentUserId },
                        $inc: { went_count: +1 }
                    }
                )
                return res.json({message: "Wented"})
            }
        } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    // PATCH /destination/api/:id/like
    async countLikeDestination(req,res) {
        try {
            const destinationId = req.params.id
            const currentUserId = req.body.currentUserId
            const destination = await Destination.findById(destinationId)
            console.log("destination:",destination)
            const likeUsers = Array.isArray(destination.like_user) ? destination.like_user : [];
            const checkUserLiked = likeUsers.includes(currentUserId);

            if (checkUserLiked) {
                await Destination.updateOne(
                    { _id: destinationId },
                    {   $pull: { like_user: currentUserId },
                        $inc: { like_count: -1 }
                    }
                );
                return res.json({ message: 'UnLike' });
            } else {
                await Destination.updateOne({_id:destinationId},
                    { $push: { like_user: currentUserId },
                        $inc: { like_count: +1 }
                    }
                )
                return res.json({message: "Liked"})
            }
        } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new DestinationController();