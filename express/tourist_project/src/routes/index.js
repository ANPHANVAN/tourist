function route(app){
    const authMiddleware = require('../middleware/authMiddleware')
    
    const indexRouter = require('./site');
    const socialRouter = require('./social');
    const chatRouter = require('./chat');
    const destinationRouter = require('./destination');
    const newsRouter = require('./news');
    const experienceRouter = require('./experience');
    const addRouter = require('./add');
    const meRouter = require('./me');

    // homepage
    app.use('/destination', destinationRouter)
    app.use('/social', authMiddleware, socialRouter)
    app.use('/chat', authMiddleware, chatRouter)
    app.use('/news', newsRouter)
    app.use('/experience', experienceRouter)
    app.use('/add', authMiddleware, addRouter)
    app.use('/me',authMiddleware, meRouter)
    app.use('/', indexRouter)
}

module.exports = route;