import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'ADMINISTRADOR',
    password: '',
    database: 'cultbridge'
})

export { connection }

//CADA UM QUE FOR TESTAR FAZ AI SEU CONNECTION não vou passar os meus           