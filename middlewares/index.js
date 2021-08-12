const { request } = require('express')
const express = require('express')
const koderRouter = require('./routerKoders')
const server = express()

function factoryMiddleware(){
    return(request, response, next) => {
        console.log('Middleware factory')
        next()
    }
}

function middleware(request, response, next){
    console.log('Midddleware externo')
    next()
}

//middleware a nivel de aplicación o servidor
server.use((request, response, next) => {
    request.user = 'Fer Palacios'
    console.log('Middleware de aplicación')
    next()
})

server.get('/', (require, response) => {
    response.json({
        message: 'Hello Koders!'
    })
})

server.use('/koders', koderRouter)

server.listen(8080, () => {
    console.log('Server running')
})

// Un middleware son funciones
// (request, response, next) => {}

// 3 niveles de middleware en express
// Nivel de aplicacion o servidor
// Nivel de router (varios endpoints)
// Nivel de ruta