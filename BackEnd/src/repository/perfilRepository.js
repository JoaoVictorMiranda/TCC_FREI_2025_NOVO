import { connection } from "./connection.js";

export async function alterarFotoPerfil(idUser, caminhoImagem) {
    try {
        const comando = `
        UPDATE usuarios
        SET foto_perfil = ?
        WHERE id_user = ?
        `;
        
        console.log('Executando query:', { idUser, caminhoImagem });
        
        const [info] = await connection.query(comando, [caminhoImagem, idUser]);
        
        console.log('Resultado da query:', info);
        
        return info.affectedRows;
    } catch (error) {
        console.error('Erro no repository alterarFotoPerfil:', error);
        throw error;
    }
}

export async function seguirUsuario(idUser, idFollower) {
    const comando = `
        INSERT INTO seguidores (id_user, id_seguidor)
        VALUES (?, ?);
    `;

    const [info] = await connection.query(comando, [
        idUser,
        idFollower
    ]);

    return info;
}

export async function buscarUsuarioPorId(idUser) {
    try {
        const comando = `
            SELECT 
                id_user,
                nome,
                nascimento,
                foto_perfil
            FROM usuarios
            WHERE id_user = ?
        `;
        
        const [rows] = await connection.query(comando, [idUser]);
        return rows[0];
    } catch (error) {
        console.error('Erro no repository buscarUsuarioPorId:', error);
        throw error;
    }
}
