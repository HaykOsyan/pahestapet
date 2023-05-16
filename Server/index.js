require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const bodyParser = require('body-parser');
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors())
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

// err hand must be last
app.use(errorHandler)
const start = async () => {
    try {
           await sequelize.authenticate()
           await sequelize.sync()
            app.listen(PORT, () => console.log('Server is shxatel on port ' + PORT))
    } catch (error) {
        console.log(error)
    }
}

start()