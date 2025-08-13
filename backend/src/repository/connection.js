import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'jonas',
    password: '1234',
    database: 'bancogeral'
})

export { connection }

//CADA UM QUE FOR TESTAR FAZ AI SEU CONNECTION não vou passar os meus