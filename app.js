const express       = require('express'),
        app         = express(),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        password    = 'iMock@2020',
        username    = 'iMock_db'
        myRoutes = require('./routes');


mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://iMock_db:${password}@imockdb.uvc4p.mongodb.net/${username}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB Mongo Atlas...')
})
.catch( err => {
    console.log(err)
});


app.use(bodyParser.json());

app.use('/imock/subjects', myRoutes);

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    return next(err)
});

if(app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        return res.json({
            message: err.message,
            error: err
        });
    });
}

module.exports = app;