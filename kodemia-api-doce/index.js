//inicialice
//server
//conexion a las DB
const server = require('./src/server')
const dbConnect = require('./src/lib/db')

dbConnect()
.then(() => {
    console.log('Database connected')
    server.listen(8080, () => {
    console.log('Server listening')
})
})
.catch(err => console.error(err))

