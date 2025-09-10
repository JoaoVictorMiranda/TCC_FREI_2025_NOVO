Estrutura criada pelo GPT para o uso das nossa api com a do tmdb JUNTAS 
para que possamos criar os comentarios

[Usuário no Navegador/App]
           |
           | 1. Acessa página do filme (ex: O Senhor dos Anéis)
           v
[Front-end: React/Vue/HTML+JS]
           |
           | GET /api/filmes/120
           v
[Back-end: Sua API] ----------------------+
           |                               |
           | Busca dados do filme          | 2. Chama TMDB API
           | (opcional: cache local)       v
           |------------------------> [TMDB API]
           |                               |
           | Recebe dados do filme         |
           | <-----------------------------+
           |
           | Responde ao front-end:
           | {
           |   "titulo": "O Senhor dos Anéis",
           |   "ano": 2001,
           |   "sinopse": "...",
           |   "elenco": ["Elijah Wood", ...],
           |   ...
           | }
           v
[Front-end renderiza informações do filme]

----------- Aba Comentários --------------

Usuário abre aba "Comentários"
           |
           | GET /api/posts?filmeId=120
           v
[Back-end: Sua API]
           |
           | Busca todos os posts no banco:
           | SELECT * FROM posts WHERE filmeId=120
           | JOIN users ON posts.userId = users.id
           v
Banco de Dados (posts)
           |
           | Retorna lista de comentários:
           | [
           |   { user: "Maria", conteudo: "Amei!", data: ... },
           |   { user: "João", conteudo: "Épico!", data: ... }
           | ]
           v
[Front-end renderiza comentários]

----------- Enviar Comentário ------------

Usuário digita comentário "Otimo filme!" e clica Enviar
           |
           | POST /api/posts
           | Header: Authorization: Bearer <JWT>
           | Body: { filmeId: 120, conteudo: "Otimo filme!" }
           v
[Back-end: Sua API]
           |
           | 1. Middleware getAuthentication:
           |    - Pega token JWT do header
           |    - Verifica token com KEY
           |    - Se válido, adiciona req.user = {id, nome, role}
           |
           | 2. Cria post no banco:
           |    INSERT INTO posts (userId, filmeId, conteudo, data)
           |
           | 3. Retorna post criado para front-end
           v
[Front-end atualiza lista de comentários]

----------- Editar/Deletar Comentário ------------

Usuário/admin clica Editar/Deletar
           |
           | PUT/DELETE /api/posts/:postId
           | Header: Authorization: Bearer <JWT>
           v
[Back-end: Sua API]
           |
           | Middleware getAuthentication valida token
           | Verifica:
           |    - Se usuário dono do post OR
           |    - Se admin
           | Se ok, realiza edição/deleção no banco
           v
Banco de Dados (posts)
           |
           | Retorna confirmação
           v
[Front-end atualiza a lista de comentários]

