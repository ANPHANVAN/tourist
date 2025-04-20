const { query } = require('../config/db/postgres');

class SiteController {
    async index(req,res,next){
        try {
            res.render('home',{an: 'Phan Van An'});
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = new SiteController();