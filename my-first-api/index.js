const { request, response } = require('express');
const express = require('express');
const kodersRouter = require('./routers/koders')
const mentorsRouter = require('./routers/mentors')


//tener acceso al server tenemos que instanciar express
const server = express (); 

// const objectKodemia = JSON.parse(fs.readFileSync('./kodemia.json'))

//middleware
server.use(express.json());

server.use('/koders', kodersRouter)
server.use('/mentors', mentorsRouter)

server.listen(8080, () => {
    console.log('Listening from 8080 port!')
})