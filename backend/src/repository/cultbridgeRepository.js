import { connection } from "./connection.js";

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




export async function listarPostsUsuario(id) {
    let comando = `
    SELECT * FROM posts
    WHERE user_id = ?;
    `;


    let [info] = await connection.query(comando, [id]);
    return info
}


export async function listarPosts() {
    let comando = `
    SELECT * FROM posts;
    `;
    let [info] = await connection.query(comando);

    return info;
}


export async function inserirPost(dados) {
    let comando = `
    INSERT INTO posts(user_id, movie_id, title, content)
    VALUES
    (?,?,?,?);
`
    let [registro] = await connection.query(comando, [
        dados.user_id,
        dados.movie_id,
        dados.title,
        dados.content
    ])
    return registro.insertId
}


/*
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
*/