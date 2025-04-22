/*
Route:
- social
    /social
- chat
    /chat
- destination
    /destination
- news
    /news
- experience
    /experience
- add
    /add
- me
    /me
- site 
    /home
*/ 

function route(app){
    const indexRouter = require('./site');
    const socialRouter = require('./social');
    const chatRouter = require('./chat');
    const destinationRouter = require('./destination');
    const newsRouter = require('./news');
    const experienceRouter = require('./experience');
    const addRouter = require('./add');
    const meRouter = require('./me');

    // homepage
    app.use('/', indexRouter)
    app.use('/social', socialRouter)
    app.use('/chat', chatRouter)
    app.use('/destination', destinationRouter)
    app.use('/news', newsRouter)
    app.use('/experience', experienceRouter)
    app.use('/add', addRouter)
    app.use('/me', meRouter)
}

module.exports = route;