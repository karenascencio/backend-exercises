const { request, response } = require('express');
const express = require('express');
const fs = require('fs')

//tener acceso al server tenemos que instanciar express
const server = express (); 

const objectKodemia = JSON.parse(fs.readFileSync('./kodemia.json'))

//middleware
server.use(express.json());

server.get('/mentors', (request, response) => {
    // response.setHeader('Content-Type', 'application/json')
    // const responseObject = {mentorOne: 'Fernanda'}
    // response.write(JSON.stringify(responseObject))
    // response.end();
    response.status(201).json({
        mentorOne: 'Fernanda'
    })
})

server.post('/mentors', (request, response) => {
    // response.write('Successfully added!')
    // response.end();
    const body = request.body
    console.log('Body:', body)

    response.status(201).json({
        message: 'Aquí se creará un mentor'
    })
})

server.get('/koders', (request, response) => {
    response.json(objectKodemia)
})

server.post('/koders', (request, response) => {
    const body = request.body
    fs.writeFile('kodemia.json', body, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
    response.json
})

server.listen(8080, () => {
    console.log('Listening from 8080 port!')
})