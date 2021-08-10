const express = require('express');
const server = express();
const port = 8080;
const fs = require('fs');
const fsP = require('fs').promises

// const jsonFile = fs.readFileSync('./pets.json', 'utf-8')

// function promisifyFile(url){
//     return new Promise((resolve, reject) => {
//         try{
//             const file = fs.readFileSync(url, 'utf-8')
//             resolve(JSON.parse(file))
//         }
//         catch(error){
//             reject(error)
//         }
//     })
// }

server.get('/pets', async (request, response) => {
    let pets = await fsP.readFile('./pets.json', 'utf-8');
    response.json(JSON.parse(pets))
})

server.post('/pets', async (request, response) => {
    
})

server.listen(port, () => {
    console.log("Port 8080 listening!")
})