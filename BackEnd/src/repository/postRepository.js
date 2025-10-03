import { connection } from "./connection.js"


export async function criarPost(titulo, descricao, idUser) {
    const comando = `
        INSERT INTO post (titulo, descricao, id_user)
        VALUES
        (?,?,?);
    `;

    let [info] = await connection.query(comando, [titulo, descricao, idUser]);
    return info.insertId
}

export async function listarPost() {
    const comando = `
        SELECT * FROM post;
    `
    let [info] = await connection.query(comando)
    return info;
}
