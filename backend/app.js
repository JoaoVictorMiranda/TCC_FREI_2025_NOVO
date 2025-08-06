import express from 'express'
import 'dotenv/config'
const api = express();
api.use(express.json());

const PORT = process.env.PORT || 3000;




api.listen(PORT, () => console.log(` Subiu com sucesso em ${PORT} `)) 