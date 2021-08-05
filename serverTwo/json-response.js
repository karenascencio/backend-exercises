const http = require('http')

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const jsonResponse = {color: 'Calico'}

    response.write(JSON.stringify(jsonResponse))
    response.end()
})

server.listen(8080, () => {
    console.log('Server running from 8080 port')
})