CREATE DATABASE cultbridge;
USE cultbridge;


CREATE TABLE users (
    id int PRIMARY KEY auto_increment,
    name varchar(200),
    email varchar(200),
    nascimento date
);


CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);



##   AINDA NÃO SEI SE VAI DAR CERTO MAS VOU TESTANDO ESSA PARTE DE FAVORITOS ##
CREATE TABLE favoritos (
    usuario_id INT,
    filme_id varchar(100),
    PRIMARY KEY (usuario_id, filme_id),
    FOREGIGN KEY (usuario_id) REFERENCES users(id)
);

## Uma possovel tabela de cache pra armazenamento de filmes ja adicionados em favoritos ##
## Para evitar grande trafego dentro da API do tmbd  e evitar problemas FUTUROS         ##

