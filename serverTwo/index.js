const http = require('http')

const server = http.createServer((request, response) => {
    console.log("url:", request.url);
    console.log("method:", request.method);
    

    if (request.url === "/mentors"){
        if (request.method === 'POST'){
            response.write('Aquí podrás crear un mentor')
        } 
        else if (request.method === 'GET'){
            response.write('Aquí encontrarás a los mentores de Kodemia')
        } else {
            response.write('No se esperaba esto')
        }
    }
    else {
        response.write('No se esperaba esto')
    }
    response.end()
})

server.listen(8080, () => {
    console.log("Server from 8080 port")
})