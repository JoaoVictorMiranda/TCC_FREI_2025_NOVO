import * as repo from '../repository/chatRepository.js'
import { Router } from 'express'
import { getAuthentication } from '../utils/jwt.js'

const endpoints = Router();
const auth = getAuthentication();

endpoints.post('/comunidade/chat/:idComunidade', auth, async (req, res) => {
        let idcomunidade = req.params.idComunidade;
        let idUser = req.user.id_user


        let novoId = await repo.salaComunidade(idcomunidade, idUser);
        res.send({
                NovoId: novoId
        })
})
