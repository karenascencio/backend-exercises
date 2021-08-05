const http = require("http");

const server = http.createServer((request, response) => {
    console.log("url:", request.url);
    console.log("method:", request.method);

    response.write("Hola mundo desde un servidor en node!");
    response.end();
});

server.listen(8000, () => {
    console.log("servidor escuchando el puerto 8000")
})