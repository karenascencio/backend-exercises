const mongoose = require('mongoose')

const DB_USER = 'apricot'
const DB_PWD = 'apricot'
const DB_HOST = 'kodemia-12va.wfcqi.mongodb.net'
const DB_NAME = 'kodemia'
const url = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`


function connect () {
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = connect