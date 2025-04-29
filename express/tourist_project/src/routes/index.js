function route(app){
    const authMiddleware = require('../middleware/authMiddleware')
    
    const destinationRouter = require('./destination');
    const chatRouter = require('./chat');
    const exploreRouter = require('./explore');
    const experienceRouter = require('./experience');
    const meRouter = require('./me');
    const apiRouter = require('./api');
    const indexRouter = require('./site');

    // homepage
    app.use('/destination', destinationRouter)
    app.use('/chat', authMiddleware, chatRouter)
    app.use('/explore', exploreRouter)
    app.use('/experience', experienceRouter)
    app.use('/me', authMiddleware, meRouter)
    app.use('/api', authMiddleware, apiRouter)
    app.use('/', indexRouter)
}

module.exports = route;