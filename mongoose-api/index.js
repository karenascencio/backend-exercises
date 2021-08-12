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
    const {name, lastName, gender, age, generation} = request.query
    let filters = {}
    
    // if (name) {
    //     filteredKoders = await Koder.find({ name: { $eq: name }})
    // }

    // if (lastName) {
    //     filteredKoders = await Koder.find({ lastName: { $eq: lastName }})
    // }

    // if (gender) {
    //     filteredKoders = await Koder.find({ gender: gender })
    // }

    // if (age) {
    //     filteredKoders = await Koder.find({ age: { $eq: age }})
    // }

    // if (generation) {
    //     filteredKoders = await Koder.find({ generation: { $eq: generation }})
    // }

    // else {
    //     filteredKoders = await Koder.find()
    // }
    
    response.json({
        success: true,
        message: 'All koders of DB',
        data: {
            filteredKoders
        }
    })
})

server.post('/koders', async (request, response) => {
    try{
        const newKoder = request.body

        const koderCreated = await Koder.create(newKoder)

        response.json({
            message: 'Successfully created!',
            data: {
                koder: koderCreated
            }
        })
    }
    catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
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
