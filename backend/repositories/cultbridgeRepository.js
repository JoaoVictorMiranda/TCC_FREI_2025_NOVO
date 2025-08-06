import { connection } from "../connection.js";

export async function listarUsuarios() {
    const comando = `
        SELECT * FROM users;
    `
    let [registros] = await connection.query(comando)
    return registros;
}

export async function inserirUsuario(dadosUsuario) {
    const comando = `
    INSERT INTO users(name, email, nascimento)
    values
    (?,?,?);
`
    let [info] = await connection.query(comando, [
        dadosUsuario.name,
        dadosUsuario.email,
        dadosUsuario.nascimeto
    ]);

    return info.insertId;
}

