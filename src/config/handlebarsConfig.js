const handlebars = require('express-handlebars');
const path = require('path')

exports.handlebarsConfig = function (app) {

    app.engine('hbs', handlebars({
        extname: 'hbs'
    }))

    app.set('views', path.resolve(__dirname, "../views"))
    app.set('view engine', 'hbs')
}