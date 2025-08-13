import * as repo from '../repository/cultbridgeRepository.js';

import { Router } from 'express';

const endpoints = Router();

endpoints.get('/users', async (req, res) => {
    let usuarios = await repo.listarUsuarios();
    res.send(usuarios);
})

endpoints.post('/users', async (req, res) => {
    let dados = req.body;

    let id = await repo.inserirUsuario(dados);
    res.send({ novoId: id });
})

endpoints.post('/post', async (req, res) => {
    let dados = req.body;

    let id = await repo.inserirPost(dados);
    res.send({ novoId: id });
})

endpoints.get('/post', async (req, res) => {
    let registros = await repo.listarPosts();

    res.send(registros);
})

endpoints.get('/post/user/:id', async (req, res) => {
    let id = req.params.id;

    let registros = await repo.listarPostsUsuario(id);
    res.send(registros);

})





export default endpoints;



