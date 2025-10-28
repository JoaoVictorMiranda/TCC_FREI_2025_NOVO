import {connection} from './connection.js';


export async function criarComunidades(dados, idCriador){
        const comando = `
                INSERT INTO comunidades ( nome, descricao, id_criador, foto_capa)
                VALUES
                (?,?,?,?);
        `;
        let [info] = await connection.query(comando, [
                dados.nome,
                dados.descricao,
                idCriador,
                dados.foto_capa || null
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







/*

CREATE TABLE comunidade_posts (
    id_post_comunidade INT PRIMARY KEY AUTO_INCREMENT,     -- ID único do post na comunidade
    id_comunidade INT,                                     -- Em qual comunidade foi postado
    id_user INT,                                           -- Quem postou
    conteudo TEXT NOT NULL,                                -- O texto do comentário (obrigatório)
    tipo ENUM('texto', 'foto') DEFAULT 'texto',            -- Se é texto ou foto
    url_imagem VARCHAR(500),                               -- Se for foto, guarda o link da imagem
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,          -- Quando foi postado
    editado_em DATETIME,                                   -- Se foi editado, guarda quando
    status ENUM('ativo', 'removido', 'pendente') DEFAULT 'ativo',  -- Controle se o post está visível
    motivo_remocao TEXT,                                   -- Se foi removido, por quê?
    FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE
    -- COMO USA: Quando usuário posta comentário ou foto na comunidade
);

 */