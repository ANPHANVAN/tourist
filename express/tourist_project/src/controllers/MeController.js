
class MeController {
    // GET /me
    index(req, res) {
        res.send('me');
    }

    // GET /me/:id
    me(req,res,next){
        res.render('mes/me')
    }

    // GET /me/api/:id
    apiMe(req, res, next){
        const id = req.params.id
        res.json({
            id: id,
            name: 'me'
        })
    }

}

module.exports = new MeController();