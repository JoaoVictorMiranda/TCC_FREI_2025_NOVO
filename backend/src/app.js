import express from 'express'
import 'dotenv/config'
import * as cultRepo from './repository/cultbridgeRepository.js'
import { adicionarRotas } from './rotas.js';

const api = express();
api.use(express.json());

const PORT = process.env.PORT || 3000;

adicionarRotas(api);

api.listen(PORT, () => console.log(` Subiu com sucesso em ${PORT} `)) 