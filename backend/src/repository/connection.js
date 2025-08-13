import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: '', //USAR SEU PROPRIO BANCO DE DADOS
    password: '', //USA SUA SENHA
    database: 'bancogeral'
})

export { connection }
