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
