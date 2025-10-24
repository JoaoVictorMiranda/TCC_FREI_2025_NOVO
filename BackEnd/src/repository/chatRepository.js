import { connection } from "./connection.js";

export function salaComunidade(){
        const comando = `
        INSERT INTO comunidade_chat(id_comunidade, id_user)
        `;

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