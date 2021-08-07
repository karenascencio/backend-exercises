const express = require('express')
const router = express.Router()
const fs = require('fs')

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
//         message: 'All Mentors', 
//         data: {
//             koders: content.mentors
//         }
//     })
// })

router.get('/', async (request, response) => {
    const {name, module, count} = request.query
    const content = await readFilePromise('kodemia.json')

    let mentorsData = content.mentors

    if (name){
        mentorsData = mentorsData.filter(mentor => mentor.name === name)
    }

    if (module){
        mentorsData = mentorsData.filter(mentor => mentor.module === module)
    }

    if (count) {
        mentorsData = mentorsData.slice(0, parseInt(count))
    }

    content.mentors = mentorsData || content.mentors

    response.status(200).json({
        success: true,
        message: 'All mentors',
        data: {
            mentors: content.mentors
        }
    })
})

router.post('/', async (request, response) => {
    const newMentor = request.body
    const content = await readFilePromise('kodemia.json')

    content.mentors.push(newMentor)

    fs.writeFileSync('kodemia.json', JSON.stringify(content, null, 2), 'utf8')

    response.json({
        success: true, 
        message: 'Mentor added!',
        data: {
            mentor: newMentor
        }
    })
})

router.patch('/:id', async (request, response) => {
    const { id } = request.params
    const { name, module} = request.body

    const content = await readFilePromise('kodemia.json')

    const newMentor = content.mentors.map( mentor => {
        if (mentor.id === parseInt(id)){
            mentor = {...mentor, name, module}
        }
        return mentor
    })

    content.mentors = newMentor

    fs.writeFileSync('kodemia.json', JSON.stringify(content, null, 2), 'utf8')
    response.json({
        success: true, 
        message: 'Mentor Updated!'
    })
})

router.get('/:id', async (request, response) => {
    const { id } = request.params

    const content = await readFilePromise('kodemia.json')

    const requestedMentor = content.mentors.find( mentor => {
        if (mentor.id === parseInt(id)){
            return mentor
        }
    })

    if (!requestedMentor){
        response.status(404)
        response.json({
            success: false, 
            message: 'Mentor not found'
        })
    } else {
    response.status(200).json({
            success: true,
            message: 'This is the mentor you requested', 
            data: {
                foundMentor: requestedMentor
            }
        })
    }
})

router.delete('/:id', async (request, response) => {
    const { id } = request.params

    const content = await readFilePromise('kodemia.json')

    const filteredMentors = content.mentors.filter( mentor => mentor.id !== parseInt(id))

    content.mentors = filteredMentors

    fs.writeFileSync('kodemia.json', JSON.stringify(content, null, 2), 'utf8')
    response.json({
        success: true, 
        message: 'Mentor deleted!'
    })

})

module.exports = router