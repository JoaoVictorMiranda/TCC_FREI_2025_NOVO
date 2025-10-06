import { connection } from "./connection.js";


export async function alterarFotoPerfil(idUser, caminhoImagem) {
    const comando = `
    UPDATE usuarios
    set fotoPerfil = ?
    WHERE id_user = ?
    `
    const [info] = await connection.query(comando, [caminhoImagem, idUser])
}