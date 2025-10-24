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

## Não faremos Mais ##########################################################
CREATE TABLE assistidos (                                                    #
	id_assistido int primary key auto_increment,                             #
    id_usuario int,                                                          #
    id_filme int,                                                            #
    foreign key (id_usuario) REFERENCES usuarios(id_user)                    # 
);                                                                           #

CREATE TABLE assistir_tarde (
	id_assistido int primary key auto_increment,
    id_usuario int,
    id_filme int,
    foreign key (id_usuario) REFERENCES usuarios(id_user)
);
###########################################################################




CREATE TABLE favoritos (
	id_favorito int primary key auto_increment,
    id_usuario int,
    id_filme int,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_user)
);



-- =============================================
-- TABELA: COMUNIDADES
-- OBJETIVO: Armazenar informações das comunidades criadas
-- =============================================
CREATE TABLE comunidades (
    id_comunidade INT PRIMARY KEY AUTO_INCREMENT,          -- ID único da comunidade (cresce automaticamente)
    nome VARCHAR(200) NOT NULL,                            -- Nome da comunidade (obrigatório)
    descricao TEXT,                                        -- Descrição sobre o que é a comunidade
    id_criador INT NOT NULL,                               -- ID do usuário que criou a comunidade
    foto_capa VARCHAR(500),                                -- URL da imagem de capa da comunidade
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,          -- Data/hora de criação (preenchida automaticamente)
    ativa BOOLEAN DEFAULT true,                            -- Se a comunidade está ativa ou não
    FOREIGN KEY (id_criador) REFERENCES usuarios(id_user)  -- Liga o criador à tabela de usuários
    -- COMO USA: Quando alguém clica em "Criar comunidade", preenche esses dados
);

-- =============================================
-- TABELA: MEMBROS DAS COMUNIDADES
-- OBJETIVO: Controlar quem pertence a cada comunidade
-- =============================================
CREATE TABLE comunidade_membros (
    id_membro INT PRIMARY KEY AUTO_INCREMENT,              -- ID único do registro de membro
    id_comunidade INT,                                     -- ID da comunidade que o usuário entrou
    id_user INT,                                           -- ID do usuário que é membro
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,       -- Data em que o usuário entrou na comunidade
    is_moderador BOOLEAN DEFAULT false,                    -- Se o membro é moderador (pode ajudar a moderar)
    FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE,
    -- ON DELETE CASCADE: Se a comunidade for excluída, todos os membros são automaticamente removidos
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE,
    -- ON DELETE CASCADE: Se o usuário for excluído, ele é removido de todas as comunidades
    UNIQUE KEY (id_comunidade, id_user)                    -- Impede que o mesmo usuário entre na mesma comunidade mais de uma vez
    -- COMO USA: Quando usuário entra numa comunidade, adiciona um registro aqui
);

-- =============================================
-- TABELA: POSTS NAS COMUNIDADES
-- OBJETIVO: Armazenar os comentários/fotos publicados nas comunidades
-- =============================================
CREATE TABLE comunidade_posts (
    id_post_comunidade INT PRIMARY KEY AUTO_INCREMENT,     -- ID único do post na comunidade
    id_comunidade INT,                                     -- Em qual comunidade foi postado
    id_user INT,                                           -- Quem postou
    conteudo TEXT NOT NULL,                                -- O texto do comentário (obrigatório)
    tipo ENUM('texto', 'foto') DEFAULT 'texto',            -- Se é texto ou foto
    url_imagem VARCHAR(500),                               -- Se for foto, guarda o link da imagem
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,          -- Quando foi postado
    editado_em DATETIME,                                   -- Se foi editado, guarda quando
    FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE
    -- COMO USA: Quando usuário posta comentário ou foto na comunidade
);


-- =============================================
-- TABELA: CURTIDAS NOS POSTS
-- OBJETIVO: Controlar quem curtiu cada post
-- =============================================
CREATE TABLE comunidade_curtidas (
    id_curtida_comunidade INT PRIMARY KEY AUTO_INCREMENT,  -- ID único da curtida
    id_post_comunidade INT,                                -- Post que foi curtido
    id_user INT,                                           -- Usuário que curtiu
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,          -- Quando curtiu
    FOREIGN KEY (id_post_comunidade) REFERENCES comunidade_posts(id_post_comunidade) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE,
    UNIQUE KEY (id_post_comunidade, id_user)               -- Impede que mesmo usuário curta mesmo post várias vezes
    -- COMO USA: Quando usuário clica no "curtir" de um post
);


-- =============================================
-- TABELA: CHAT GERAL DA COMUNIDADE
-- OBJETIVO: Mensagens do chat geral de cada comunidade
-- =============================================
CREATE TABLE comunidade_chat (
    id_sala INT PRIMARY KEY AUTO_INCREMENT,            -- ID único da mensagem
    id_comunidade INT,                                     -- Comunidade onde foi enviada
    id_user INT,                                           -- Quem enviou a mensagem                               -- Texto da mensagem                            -- Se foi editada, quando
    FOREIGN KEY (id_comunidade) REFERENCES comunidades(id_comunidade) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE
    -- COMO USA: Mensagens do chat geral que todos os membros veem
);

CREATE TABLE chat_mensagem(
  id_mensagem int primary  key auto_increment,
  id_user INt,
  id_sala INT,
  mensagem varchar(255),
  criada_em datetime,
  
FOREIGN KEY (id_user) REFERENCES usuarios(id_user),
FOREIGN KEY (id_sala) REFERENCES comunidade_chat(id_sala)
);