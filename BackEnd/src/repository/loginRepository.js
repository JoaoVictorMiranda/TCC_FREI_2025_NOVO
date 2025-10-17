import { connection } from "./connection.js"


export async function inserirUsuario(dados) {
    let comando = `
    INSERT INTO usuarios (nome, nascimento, email, senha, criado_em)
    VALUES
    (?,?,?,MD5(?),NOW());
    `

    let [registros] = await connection.query(comando, [
        dados.nome,
        dados.nascimento,
        dados.email,
        dados.senha
    ])
    return registros.insertId;
}

export async function loginUsuario(email, senha) {
    const comando = `
    SELECT id_user,
    nome,
    email,
    nascimento,
    foto_perfil
    FROM usuarios
    WHERE email = ? 
    and senha = MD5(?)
    `

    let [info] = await connection.query(comando, [
        email, senha
    ])
    return info[0];
}