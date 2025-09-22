import * as repo from '../repository/postRepository.js'
import { Router } from 'express'
import { getAuthentication } from '../utils/jwt.js'

const auth = getAuthentication();


const endpoints = Router();


endpoints.post('/post', auth, async (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let idUser = req.user.id_user;

    let post = await repo.criarPost(titulo, descricao, idUser);
    res.send({ novoPost: post });
})


endpoints.get('/post', auth, async (req, res) => {
    let info = await repo.listarPost();

    res.send(info)

})


export default endpoints