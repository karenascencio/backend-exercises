const { request, response } = require("express")

const express = require('express')

const router = express.Router()

router.use((request, response, next) => {
    console.log('middleware en el router de koders')
    next() 
})

router.get('/', (request, response) => {
    response.json({
        message: 'Get All Koders'
    })
})

router.post('/', (request, response) => {
    response.json({
        message: 'Create koder'
    })
})

module.exports = router