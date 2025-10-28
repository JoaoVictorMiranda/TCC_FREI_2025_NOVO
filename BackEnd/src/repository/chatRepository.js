import { connection } from "./connection.js";


export async function salaComunidade(id_comunidade, id_user){
        const comando = `
        INSERT INTO comunidade_chat(id_comunidade, id_user)
        VALUES
        (?,?);
        `;
        let [info] = await connection.query(comando, [id_comunidade, id_user]);
        return info.insertId
}

export async function mensagemComunidade(dados){
    const comando = `
        INSERT INTO chat_mensagem(id_user, id_sala, mensagem, criada_em)
        VALUES
        (?,?,?,NOW());
    `;
    let [info] = await connection.query(comando, [
        dados.id_user,
        dados.id_sala,
        dados.mensagem
    ]);
    return info.insertId;
}



/*
CREATE TABLE chat_mensagem(
  id_mensagem int primary  key auto_increment,
  id_user INt,
  id_sala INT,
  mensagem varchar(255),
  criada_em datetime,
  
FOREIGN KEY (id_user) REFERENCES usuarios(id_user),
FOREIGN KEY (id_sala) REFERENCES comunidade_chat(id_sala)
);
*/