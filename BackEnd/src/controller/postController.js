import * as repo from '../repository/postRepository.js'
import { Router } from 'express'
import { getAuthentication } from '../utils/jwt.js'

const auth = getAuthentication();


const endpoints = Router();


endpoints.post('/EnviarComentario', auth, async (req, res) => {
    let dados = req.body;
    let idUser = req.user.id_user;

    let post = await repo.criarPost(dados, idUser);
    res.send({ novoPost: post });
})


endpoints.get('/post', auth, async (req, res) => {
    let info = await repo.listarPostPorFilme();

    res.send(info)

})


endpoints.post('/post/user', auth, async (req, res) => {
    let idUser = req.user.id_user;

    let info = await repo.listarPostPorUsuario(idUser);
    res.send(info)

})


endpoints.get('/post/:id_filme', auth, async (req, res) => {
    let id_filme = req.params.id_filme;
    let info = await repo.listarPostPorIdFilme(id_filme);

    res.send(info)

})


endpoints.post('/post/curtir/:id_post', auth, async (req, res) => {
    let idPost = req.params.id_post;
    let idUser = req.user.id_user;

    let info = await repo.curtirPost(idUser, idPost);
    res.send(info);

})

export default endpoints