const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./kodersModel')

const DB_USER = 'apricot'
const DB_PWD = 'apricot'
const DB_HOST = 'kodemia-12va.wfcqi.mongodb.net'
const DB_NAME = 'kodemia'
const url = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const server =  express()

server.use(express.json());

server.get('/', (request, response) => {
    response.json({
        message: 'API with mongoose'
    })
})

server.get('/koders', async (request, response) => {
    const {name, lastName, gender, age} = request.query
    let filteredKoders = {}
    
    if (name) {
        filteredKoders = await Koder.find({ name: { $eq: name }})
    }

    if (lastName) {
        filteredKoders = await Koder.find({ lastName: { $eq: lastName }})
    }

    if (gender) {
        filteredKoders = await Koder.find({ gender: { $eq: gender }})
    }

    if (age) {
        filteredKoders = await Koder.find({ age: { $eq: age }})
    }

    else {
        filteredKoders = await Koder.find()
    }
    
    response.json({
        success: true,
        message: 'All koders of DB',
        data: {
            filteredKoders
        }
    })
})

server.post('/koders', async (request, response) => {
    const newKoder = request.body
    const dbFile = await Koder.find()

    const koderCreated = await Koder.create(newKoder)

    response.json({
        message: 'Successfully created!',
        newKoder: newKoder,
        dbFile: dbFile
    })
    

})

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( async (connection) => {
        console.log('Successfully Connected!')
        server.listen(8080, () => {
            console.log('Server listening!')
        })
    })
    .catch( err => {
        console.log('Error:', err)
    })

    //Tarea: q  
    // GET /koders?gender
    // POST /koders
