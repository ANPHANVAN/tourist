class ExploreController {
    async index(req, res) {
        try {
            res.send('explore/index');
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ExploreController();