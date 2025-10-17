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