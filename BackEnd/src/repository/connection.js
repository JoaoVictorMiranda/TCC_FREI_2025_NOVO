import mysql from 'mysql2/promise'


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cultbridge'

})

export { connection }


/*
CODIGOS DO BANCO DE QUEM FOR MEXER
    host: 'localhost',
    user: 'jonas',
    password: '1234',
    database: 'cultbridge'

*/



/*
BANCOS QUE IREMOS USAR

CREATE TABLE usuarios(
 id_user int primary key auto_increment, 
nome varchar(300),
nascimento DATE,
email varchar(200),
senha varchar(50),
criado_em datetime
);

*/