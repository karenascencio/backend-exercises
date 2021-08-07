const express = require('express')
const router = express.Router()
const fs = require('fs')

// función promificada para leer un archivo
function readFilePromise(pathToRead) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToRead, 'utf8', (err, content) => {
            if (err) {
                reject(err)
            }else {
                const json = JSON.parse(content)
                resolve(json)
            }
        })
    })
}

// router.get('/', async (request, response) => {
//     const content = await readFilePromise('kodemia.json')

//     response.status(200).json({
//         success: true,
//         message: 'All Koders', 
//         data: {
//             koders: content.koders
//         }
//     })
// })

//query params
router.get('/', async (request, response) => {
    const {generation, gender, name, count} = request.query
    console.log(gender)
    const content = await readFilePromise('kodemia.json')

    let kodersData = content.koders

    if (generation){
        kodersData = kodersData.filter(koder => koder.generation === parseInt(generation))
    }

    if (gender){
        kodersData = kodersData.filter(koder => koder.gender === gender)
    }

    if (name){
        kodersData = kodersData.filter(koder => koder.name === name)
    }

    if (count) {
        kodersData = kodersData.slice(0, parseInt(count))
    }

    content.koders = kodersData || content.koders

    response.status(200).json({
        success: true,
        message: 'All Koders',
        data: {
            koders: content.koders
        }
    })
})

router.post('/', async (request, response) => {
    const newKoder = request.body
    const content = await readFilePromise('kodemia.json')

    content.koders.push(newKoder)

    fs.writeFileSync('kodemia.json', JSON.stringify(content, null, 2), 'utf8')

    response.json({
        success: true, 
        message: 'Koder agregado!',
        data: {
            koder: newKoder
        }
    })
})

//Sintaxis universal
// METHOD /recurso/identificador
//PATCH /koders/:id

router.patch('/:id', async (request, response) => {
    const { id } = request.params
    const { name, generation} = request.body

    const content = await readFilePromise('kodemia.json')

    const newKoder = content.koders.map( koder => {
        if (koder.id === parseInt(id)){
            koder = {...koder, name, generation}
        }
        return koder
    })

    content.koders = newKoder

    fs.writeFileSync('kodemia.json', JSON.stringify(content, null, 2), 'utf8')
    response.json({
        success: true, 
        message: 'Koder Updated!'
    })
})

router.get('/:id', async (request, response) => {
    const { id } = request.params

    const content = await readFilePromise('kodemia.json')

    const requestedKoder = content.koders.find( koder => {
        if (koder.id === parseInt(id)){
            return koder
        }
    })

    if (!requestedKoder){
        response.status(404)
        response.json({
            success: false, 
            message: 'Koder not found'
        })
    } else {
    response.status(200).json({
            success: true,
            message: 'This is the koder you requested', 
            data: {
                foundKoder: requestedKoder
            }
        })
    }
})

router.delete('/:id', async (request, response) => {
    const { id } = request.params

    const content = await readFilePromise('kodemia.json')

    const filteredKoders = content.koders.filter( koder => koder.id !== parseInt(id))

    content.koders = filteredKoders

    fs.writeFileSync('kodemia.json', JSON.stringify(content, null, 2), 'utf8')
    response.json({
        success: true, 
        message: 'Koder deleted!'
    })

})

module.exports = router