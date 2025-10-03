CREATE DATABASE cultbridge;
USE cultbridge;


CREATE TABLE usuarios(
 id_user int primary key auto_increment, 
nome varchar(300),
nascimento DATE,
email varchar(200),
senha varchar(50),
criado_em datetime
);

CREATE TABLE post_avaliacao (
    id_post int PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200),
    descricao VARCHAR(200),
    id_user int,
    curtidas int,
    nota int,
    curtidas int,
    criado_em datetime,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
);


CREATE TABLE avaliacao_filme(
    id_comentario int primary key auto_increment,
    id_usuario int,
    id_filme varchar(100),
    avaliacao varchar(300),
    nota int,
    curtidas int,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
);