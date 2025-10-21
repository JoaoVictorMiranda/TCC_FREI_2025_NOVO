CREATE DATABASE cultbridge;
USE cultbridge;

CREATE TABLE ADMIN(
id_admin int primary key auto_increment,
nome varchar(200),
email varchar(200) UNIQUE,
senha varchar(255),
criado_em datetime,
isAdmin boolean default true
);

CREATE TABLE usuarios(
 id_user int primary key auto_increment, 
nome varchar(300),
nascimento DATE,
email varchar(200) UNIQUE ,
senha varchar(255),
chat_acesso boolean default false,
foto_perfil varchar(500),
criado_em datetime
);

SELECT * FROM usuarios;

    


CREATE TABLE post_avaliacao (
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

SELECT * FROM post_avaliacao;



CREATE TABLE curtidas(
    id_curtida INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_post INT,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_post) REFERENCES post_avaliacao(id_post)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (id_user, id_post)
);


CREATE TABLE assistidos (
	id_assistido int primary key auto_increment,
    id_usuario int,
    id_filme int,
    foreign key (id_usuario) REFERENCES usuarios(id_user)
);

CREATE TABLE assistir_tarde (
	id_assistido int primary key auto_increment,
    id_usuario int,
    id_filme int,
    foreign key (id_usuario) REFERENCES usuarios(id_user)
);





CREATE TABLE favoritos (
	id_favorito int primary key auto_increment,
    id_usuario int,
    id_filme int,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_user)
);

                
CREATE TABLE chat(
id_chat int primary key auto_increment,
id_user int,
user_msg text,
criado_em datetime,
FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
);


CREATE TABLE grupos (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao TEXT,
    id_criador INT,
    criado_em DATETIME,
    FOREIGN KEY (id_criador) REFERENCES usuarios(id_user)
);



CREATE TABLE grupo_mensagens (
    id_msg INT PRIMARY KEY AUTO_INCREMENT,
    id_grupo INT,
    id_user INT,
    mensagem TEXT,
    criado_em DATETIME,
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo),
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
);

SHOW TABLES;



##CONTAR FAVORITOS
SELECT favoritos.id_usuario, count(favoritos.id_usuario) AS TotalFavoritos FROM favoritos
                GROUP BY favoritos.id_usuario;
                
                
##LOGIN USUARIO
SELECT id_user, nome, email, nascimento
    FROM usuarios
    WHERE email = ? 
    and senha = MD5(?);
    
    
##CURTIDOS
    SELECT id_user
    FROM curtidas
    WHERE id_user = ?;
    
    ##Listar Post por filme
    SELECT usuarios.nome, post_avaliacao.titulo, post_avaliacao.criado_em, post_avaliacao.avaliacao, post_avaliacao.nota, post_avaliacao.id_filme,
       COUNT(curtidas.id_curtida) AS curtidas
FROM post_avaliacao
INNER JOIN usuarios ON usuarios.id_user = post_avaliacao.id_user
LEFT JOIN curtidas ON curtidas.id_post = post_avaliacao.id_post
GROUP BY post_avaliacao.id_post;


## Filtrar por filme id
SELECT post_avaliacao.id_post, usuarios.nome, post_avaliacao.titulo, post_avaliacao.criado_em, post_avaliacao.avaliacao, post_avaliacao.nota, post_avaliacao.id_filme,
       COUNT(curtidas.id_curtida) AS curtidas
FROM post_avaliacao
INNER JOIN usuarios ON usuarios.id_user = post_avaliacao.id_user
LEFT JOIN curtidas ON curtidas.id_post = post_avaliacao.id_post
WHERE post_avaliacao.id_filme = ?
GROUP BY post_avaliacao.id_post;


##Listar Post por usuario
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
