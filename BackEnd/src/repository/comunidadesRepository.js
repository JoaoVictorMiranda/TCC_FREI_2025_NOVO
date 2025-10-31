import {connection} from './connection.js';


export async function criarComunidades(dados,caminho, idCriador){
        const comando = `
        INSERT INTO comunidades ( nome, descricao, id_criador, foto_capa)
        VALUES
        (?,?,?,?);
        `;
        let [info] = await connection.query(comando, [
                dados.nome,
                dados.descricao,
                idCriador,
                caminho
        ]);

        return info.insertId;
}

export async function InsertMember(idComunity, idUser){
        const comando = `
                INSERT INTO comunidade_membros(id_comunidade, id_user, is_moderador)
                VALUES
                (?, ?, DEFAULT);
        `;
        let [info] = await connection.query(comando, [
                idComunity,
                idUser
        ])
        return info.insertId;
}
export async function InsertModerator(idComunity, idUser){
        const comando = `
                INSERT INTO comunidade_membros(id_comunidade, id_user, is_moderador)
                VALUES
                (?, ?, TRUE);
        `;
        let [info] = await connection.query(comando, [
                idComunity,
                idUser
        ])
        return info.insertId;
}

export async function CreatePost(data, idUser) {
        const comando = `
            INSERT INTO comunidade_posts 
            (id_comunidade, id_user, conteudo, tipo, url_imagem)
            VALUES (?, ?, ?, ?, ?);
        `;
        
        let [info] = await connection.query(comando, [
            data.id_comunidade,
            idUser,
            data.conteudo,
            data.tipo || 'texto',  
            data.url_imagem || null
        ]);
        
        return info.insertId;
    }



    export async function sendMessage( idComunidade, dados, idUser){
        const comando = `
                INSERT INTO comunidade_chat(id_comunidade, id_user, mensagem, editado_em)
                 VALUES
                 (?,?,?,null);
        `;
        let [info] = await connection.query(comando, [
                idComunidade,
                idUser,
                dados.mensagem
        ]);
        return info.insertId
    }



    export async function listMessages(idSala){
        const comando  = `
            SELECT * FROM chat_mensagem
            WHERE id_sala = ?;
        `;
        
        let [info] = await connection.query(comando, [idSala]);
        return info;
    }
    
    export async function VerificarUser(idUser, idSala){
        const comando = `
            select id_user from comunidade_membros
            where id_user = ? AND id_comunidade = ?;
        `;
        let[info] = await connection.query(comando, [idUser, idSala]);
        
        return info
    }






    
/*
CREATE TABLE comunidade_chat (
    id_mensagem INT PRIMARY KEY AUTO_INCREMENT,            -- ID único da mensagem
    id_comunidade INT,                                     -- Comunidade onde foi enviada
    id_user INT,                                           -- Quem enviou a mensagem
    mensagem TEXT NOT NULL,                                -- Texto da mensagem
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,          -- Quando foi enviada
    editado_em DATETIME,                                   -- Se foi editada, quando
    FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE
    -- COMO USA: Mensagens do chat geral que todos os membros veem
);
*/