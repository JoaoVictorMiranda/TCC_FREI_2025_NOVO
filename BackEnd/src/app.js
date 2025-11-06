import express from 'express'
import adicionarRotas from './rotas.js'
import cors from 'cors'

const api = express();



api.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));


api.use(express.json());


adicionarRotas(api)


api.get('/health', (req, res) => {

    res.status(200).json({ 
        status: 'OK', 
        message: 'Servidor rodando',
        timestamp: new Date().toISOString()
    });
});


api.get('/', (req, res) => {
    res.json({ 
        message: 'API funcionando!',
        version: '1.0.0'
    });
});


api.use((req, res) => {
    res.status(404).json({ 
        error: 'Rota não encontrada',
        path: req.originalUrl
    });
});

api.use((error, req, res, next) => {
    console.error('Erro no servidor:', error);
    
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

const PORT = process.env.PORT || 5022;

api.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});


