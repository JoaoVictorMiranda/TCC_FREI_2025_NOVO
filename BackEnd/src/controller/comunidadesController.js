import * as repo from '../repository/comunidadesRepository.js'
import { Router } from 'express'
import { getAuthentication } from '../utils/jwt.js';
import multer from 'multer';

const upload = multer({ dest: 'public/storage' })
const auth = getAuthentication();
const endpoints = Router();

endpoints.post('/comunidade', upload.single('img'), auth, async (req, res) => {
    let dados = req.body;
    let idCriador = req.user.id_user;
    let caminho = req.file ? req.file.path : null;

    let NewId = await repo.criarComunidades(dados, caminho, idCriador);
    let inserirCriador = repo.InsertModerator(NewId, idCriador)
    res.send({ NewId: NewId });
});

endpoints.get('/comunidades', auth, async (req, resp) => {
    const resposta = await repo.ListarComunidades()
    resp.send({ dados: resposta })
})

endpoints.post('/comunidade/entrar/:idComunity', auth, async (req, res) => {
    let idComunity = req.params.idComunity;
    const idUser = req.user.id_user;

    let NewId = await repo.InsertMember(idComunity, idUser)

    res.send({ NewId: NewId })
})

endpoints.post('/comunidade/post', auth, async (req, res) => {
    try {
        const data = req.body;
        const idUser = req.user.id_user;

        const postId = await repo.CreatePost(data, idUser);

        res.status(201).json({
            success: true,
            message: 'Post criado com sucesso!',
            id_post: postId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar post',
            error: error.message
        });
    }
});

endpoints.post('/comunidade/chat/:idComunidade', auth, async (req, res) => {
    let idComunidade = req.params.idComunidade
    let dados = req.body;
    let idUser = req.user.id_user;

    let registro = await repo.sendMessage(idComunidade, dados, idUser);
    res.send({
        NovoId: registro
    })
})

endpoints.post('/comunidade/chat/list/:idSala', auth, async (req, res) => {
    let idSala = req.params.idSala;
    let registros = await repo.listMessages(idSala)

    res.send(registros)

})




endpoints.post('/comunidade/membros/:idSala', auth, async (req, res) => {
    let idSala = req.params.idSala;
    let idUser = req.user.id_user;

    let info = await repo.VerificarUser(idUser, idSala)

    if (info.length === 0) {
        res.status(401).send({
            acesso: "Acesso negado usuario não pertence a comunidade"
        })
    } else {
        res.send({
            acesso: "Acesso Permitido"
        })
    }
})
export default endpoints;