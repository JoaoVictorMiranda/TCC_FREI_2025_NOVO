import * as repo from '../repository/comunidadesRepository.js'
import { Router } from 'express'
import { getAuthentication } from '../utils/jwt.js';


const auth = getAuthentication();
const endpoints = Router();

endpoints.post('/comunidade', auth, async (req, res) => {
        let dados = req.body;
        let idCriador = req.user.id_user;

        let NewId= await repo.criarComunidades(dados, idCriador);
        res.send({NewId: NewId});
});


endpoints.post('/comunidade/entrar/:idComunity', auth, async (req, res) => {
        let idComunity = req.params.idComunity;
        const idUser = req.user.id_user;

        let NewId = await repo.InsertMember(idComunity, idUser)

        res.send({NewId: NewId})
})

endpoints.post('/comunidade/post', auth,  async (req, res) => {
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

export default endpoints;