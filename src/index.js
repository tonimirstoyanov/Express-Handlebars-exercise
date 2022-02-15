const express = require('express')
const routes = require('./routes')

const app = express()
const { handlebarsConfig } = require('./config/handlebarsConfig');
handlebarsConfig(app)
const { expressConfig } = require('./config/expressConfig');
expressConfig(app)
const { initDatabase } = require('./config/dataBaseConfig')
const { PORT } = require('./constants')

app.use(routes)



initDatabase()
    .then(() => {

        app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}`))
    })
    .catch(err => {
        console.log('Database connection error :', err)
    })