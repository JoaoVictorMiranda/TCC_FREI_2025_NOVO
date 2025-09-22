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

CREATE TABLE post (
    id_post INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200),
    descricao VARCHAR(200),
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user)
);
