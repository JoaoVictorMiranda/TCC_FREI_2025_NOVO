import { connection } from "./connection.js"


export async function criarPost(dados, idUser) {
    const comando = `
        INSERT INTO post_avaliacao (titulo,id_filme, avaliacao, id_user, curtidas, nota, criado_em)
        VALUES
        (?,?,?,?,0,?,?);
    `;
    let hoje = new Date();

    let [info] = await connection.query(comando, [
        dados.titulo,
        dados.id_filme,
        dados.avaliacao,
        idUser,
        dados.nota,
        hoje

    ]);
    return info.insertId
}



/*CREATE TABLE post_avaliacao (
    id_post int PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200),
    id_filme VARCHAR(200),
    avaliacao varchar(300),
    id_user int,
    curtidas int,
    nota int,
    criado_em datetime,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
);

CREATE TABLE usuarios(
 id_user int primary key auto_increment, 
nome varchar(300),
nascimento DATE,
email varchar(200),
senha varchar(50),
criado_em datetime
);

*/


export async function listarPostPorFilme() {
    const comando = `
SELECT usuarios.nome, post_avaliacao.titulo, post_avaliacao.criado_em, post_avaliacao.avaliacao, post_avaliacao.nota, post_avaliacao.curtidas FROM post_avaliacao
INNER JOIN usuarios ON usuarios.id_user = post_avaliacao.id_user;
    `
    let [info] = await connection.query(comando)
    return info;
}


export async function listarPostPorIdFilme(id_filme) {
    const comando = `
SELECT usuarios.nome, post_avaliacao.titulo, post_avaliacao.criado_em, post_avaliacao.avaliacao, post_avaliacao.nota, post_avaliacao.curtidas FROM post_avaliacao
INNER JOIN usuarios ON usuarios.id_user = post_avaliacao.id_user
    WHERE post_avaliacao.id_filme = ?
;
    `
    let [info] = await connection.query(comando, [id_filme])
    return info;
}
