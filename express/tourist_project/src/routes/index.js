function route(app){
    const indexRouter = require('./site');

    // homepage
    app.use('/', indexRouter)
}

module.exports = route;

