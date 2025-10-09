CREATE DATABASE cultbridge;
USE cultbridge;




## banco atualizado com foto de perfil ##
CREATE TABLE usuarios(
    id_user INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(300) NOT NULL,
    nascimento DATE,
    email VARCHAR(200) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em DATETIME
);

ALTER TABLE usuarios 
MODIFY senha VARCHAR(255);





ALTER TABLE usuarios 
    add column fotoPerfil VARCHAR(500);



CREATE TABLE post_avaliacao (
    id_post INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    id_filme VARCHAR(200),
    avaliacao VARCHAR(300) NOT NULL,
    id_user INT,
    nota INT,
    criado_em DATETIME,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

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

ALTER TABLE usuarios 
    add column fotoPerfil VARCHAR(500);


CREATE TABLE assistidos (
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
user_msg varchar(1000),
criado_em datetime,
FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
);








CREATE TABLE tmdb_cache (
    id_cache INT PRIMARY KEY AUTO_INCREMENT,
    tmdb_id INT NOT NULL,
    tipo ENUM('movie', 'tv') NOT NULL,
    titulo VARCHAR(300),
    poster_path VARCHAR(200),
    ano_lancamento INT,
    data_cache DATETIME DEFAULT CURRENT_TIMESTAMP,
    dados_completos JSON, -- Armazena toda a resposta da API se necessário
    UNIQUE KEY (tmdb_id, tipo)
);