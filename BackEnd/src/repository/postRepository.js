import { connection } from "./connection.js"


export async function criarPost(dados, idUser) {
    const comando = `
    INSERT INTO post_avaliacao (titulo, id_filme, avaliacao, id_user, nota, criado_em)
    VALUES
    (?,?,?,?,?,?);
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

export async function VerSeCurtiu(id_user) {
    const comando = `
    SELECT id_user
    FROM curtidas
    WHERE id_user = ?
    `

    const info = await connection.query(comando, [
        id_user
    ])
    return info;
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
SELECT usuarios.nome, post_avaliacao.titulo, post_avaliacao.criado_em, post_avaliacao.avaliacao, post_avaliacao.nota, post_avaliacao.id_filme,
       COUNT(curtidas.id_curtida) AS curtidas
FROM post_avaliacao
INNER JOIN usuarios ON usuarios.id_user = post_avaliacao.id_user
LEFT JOIN curtidas ON curtidas.id_post = post_avaliacao.id_post
GROUP BY post_avaliacao.id_post;
    `
    let [info] = await connection.query(comando)
    return info;
}

export async function PuxarInfoPost() {
    let [resultados] = await connection.query(`
        SELECT usuarios.nome, usuarios.id_user, avaliacao, post_avaliacao.nota, COUNT(curtidas.id_curtida) AS curtidas
        FROM post_avaliacao
        INNER JOIN usuarios ON usuarios.id_user = post_avaliacao.id_user
        LEFT JOIN curtidas ON curtidas.id_post = post_avaliacao.id_post
        GROUP BY post_avaliacao.id_post
        ORDER BY post_avaliacao.criado_em DESC
        `)
    return resultados
}

export async function MediaCurtidas(id_filme) {
    let [resultados] = await connection.query(`
        SELECT AVG(nota) AS MediaCurtidas
        FROM post_avaliacao
        WHERE id_filme = ?;
        `, [id_filme])
    return resultados
}

export async function listarPostPorIdFilme(id_filme) {
    const comando = `
SELECT post_avaliacao.id_post, usuarios.nome, post_avaliacao.titulo, post_avaliacao.criado_em, post_avaliacao.avaliacao, post_avaliacao.nota, post_avaliacao.id_filme,
       COUNT(curtidas.id_curtida) AS curtidas
FROM post_avaliacao
INNER JOIN usuarios ON usuarios.id_user = post_avaliacao.id_user
LEFT JOIN curtidas ON curtidas.id_post = post_avaliacao.id_post
WHERE post_avaliacao.id_filme = ?
GROUP BY post_avaliacao.id_post;
    `
    let [info] = await connection.query(comando, [id_filme])
    return info;
}

export async function listarPostPorUsuario(idUser) {
    const comando = `
SELECT 
    post_avaliacao.id_post, 
    usuarios.nome, 
    post_avaliacao.titulo, 
    post_avaliacao.criado_em, 
    post_avaliacao.avaliacao, 
    post_avaliacao.nota, 
    post_avaliacao.id_filme,
    COUNT(curtidas.id_curtida) AS curtidas
FROM post_avaliacao
INNER JOIN usuarios 
    ON usuarios.id_user = post_avaliacao.id_user
LEFT JOIN curtidas 
    ON curtidas.id_post = post_avaliacao.id_post
WHERE usuarios.id_user = ?
GROUP BY 
    post_avaliacao.id_post, 
    usuarios.nome, 
    post_avaliacao.titulo, 
    post_avaliacao.criado_em, 
    post_avaliacao.avaliacao, 
    post_avaliacao.nota, 
    post_avaliacao.id_filme
ORDER BY post_avaliacao.criado_em DESC;
    `

    let [info] = await connection.query(comando, [idUser]);
    return info;
}




export async function curtirPost(idUser, idPost) {
    const comando = `
        INSERT INTO curtidas (id_user, id_post)
        VALUES (?, ?);
    `;
    let [info] = await connection.query(comando, [idUser, idPost]);
    return info.insertId; // Retorna o ID da curtida criada
}






/*CREATE TABLE curtidas(
    id_curtida int primary key auto_increment,
    id_user int,
    id_post int UNIQUE,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user),
    FOREIGN KEY (id_post) REFERENCES post_avaliacao(id_post)
); */