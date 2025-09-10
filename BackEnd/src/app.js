import express from 'express'
import adicionarRotas from './rotas.js'

const api = express();
api.use(express.json())


adicionarRotas(api)


api.listen(5022, () => console.log("SUBIU NA 5022"))