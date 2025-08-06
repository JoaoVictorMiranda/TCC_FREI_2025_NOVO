import express from 'express'
import 'dotenv/config'
import * as cultRepo from './repositories/cultbridgeRepository.js'

const api = express();
api.use(express.json());

const PORT = process.env.PORT || 3000;

api.get('/users', async (req, res) => {

    let usuarios = await cultRepo.listarUsuarios();
    res.send(usuarios);
});

api.post('/users', async (req, res) => {
    let dados = req.body;
    let id = await cultRepo.inserirUsuario(dados);

    res.send({ novoId: id });
})



api.listen(PORT, () => console.log(` Subiu com sucesso em ${PORT} `)) 