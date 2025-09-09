import express from 'express'

const api = express();
api.use(express.json())



api.listen(5022, () => console.log("SUBIU NA 5022"))