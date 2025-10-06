import * as repo from '../repository/perfilRepository.js'
import { Router } from 'express'
import { getAuthentication } from '../utils/jwt.js'
import multer from 'multer';

const upload = multer({ dest: 'public/storage' })
const auth = getAuthentication();

const endpoints = Router();



endpoints.post('/usuario/perfil', upload.single('img'), auth, async (req, res) => {
    let caminho = req.file.path;
    let idUser = req.user.id_user;

    await repo.alterarFotoPerfil(idUser, caminho);
    res.send();
})



export default endpoints