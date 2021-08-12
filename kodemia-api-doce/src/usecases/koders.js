const Koder = require('../models/koders')

function getAll(){
    return Koder.find()
}

module.exports = {
    getAll
}