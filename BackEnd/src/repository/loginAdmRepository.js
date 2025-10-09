import { connection } from "./connection.js"



let hoje = new Date();
export async function registrarAdmin(dados){
        const comando = `
        INSERT INTO ADMIN(nome, email, senha, criado_em, idAdmin)
        VALUES
        (?,?,MD5(?), ?, ?);
        `;
        let [info] = await connection.query(comando, [
                dados.nome,
                dados.email,
                dados.senha,
                hoje,
                dados.isAdmin
        ]);
        return info.insertId
}


export async function loginAdmin(email, senha){
        const comando = `
        SELECT * FROM ADMIN
        WHERE email = ? AND senha = MD5(?)
        ;
        `
        let [info] = await connection.query(comando, [email, senha])
        return info
}

/*
CREATE TABLE ADMIN(
id_admin int primary key auto_increment,
nome varchar(200),
email varchar(200) UNIQUE,
senha varchar(255),
criado_em datetime,
isAdmin boolean default true
);
*/