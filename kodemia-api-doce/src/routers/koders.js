const express = require('express')

const router = express.Router()
const koders = require('../usecases/koders')

router.get('/', async (request, response) => {
    try {
        const allKoders = await koders.getAll()
        response.json({
            success: true, 
            message: 'All Koders',
            data: {
                allKoders
            }
        })
    } catch (error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error to get all koders',
            error: error.message
        })
    }
})

module.exports = router