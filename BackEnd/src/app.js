import express from 'express'
import adicionarRotas from './rotas.js'
import cors from 'cors'

const api = express();
api.use(express.json())
api.use(cors())

adicionarRotas(api)

api.listen(5022, () => console.log("SUBIU NA 5022"))


/* MUDAR MAIS TARDE

// Importa o framework Express para criar o servidor web
import express from "express";

// Importa o middleware CORS para permitir requisições de diferentes origens (domínios)
import cors from "cors";

// Importa o dotenv para carregar variáveis de ambiente do arquivo .env
import dotenv from "dotenv";

// Importa a função que define as rotas da aplicação (arquivo externo)
import CriarRotas from "./rotas.js";

// Carrega as variáveis de ambiente do arquivo .env para process.env
dotenv.config();

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware CORS (Cross-Origin Resource Sharing)
app.use(cors({
    // Define qual origem (URL do frontend) tem permissão para acessar a API
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    // Permite o envio de credenciais (cookies, autenticação) nas requisições
    credentials: true
}));

// Configura o middleware para parsing automático de JSON no corpo das requisições
// Converte automaticamente o body das requisições em objetos JavaScript
app.use(express.json());

// Chama a função que define todas as rotas da aplicação
// Passa a instância do app Express para que as rotas sejam registradas
CriarRotas(app);

// Define uma rota GET para health check - monitoramento do status do servidor
app.get('/health', (req, res) => {
    // Retorna status 200 (OK) com informações sobre o servidor
    res.status(200).json({ 
        status: 'OK', 
        message: 'Servidor rodando',
        // Timestamp em formato ISO para saber quando a resposta foi gerada
        timestamp: new Date().toISOString()
    });
});

// Define a rota raiz (GET /) - endpoint básico da API
app.get('/', (req, res) => {
    // Retorna um JSON com mensagem de confirmação e versão da API
    res.json({ 
        message: 'API funcionando!',
        version: '1.0.0'
    });
});

// Middleware para tratamento de rotas não encontradas (404)
// Esta função é executada quando nenhuma rota anterior corresponde à requisição
app.use((req, res) => {
    // Retorna status 404 (Not Found) com informações sobre a rota acessada
    res.status(404).json({ 
        error: 'Rota não encontrada',
        // Mostra qual URL foi tentada e não existe
        path: req.originalUrl
    });
});

// Middleware global de tratamento de erros
// Recebe 4 parâmetros (error, req, res, next) - o Express identifica como middleware de erro
app.use((error, req, res, next) => {
    // Loga o erro no console do servidor para debugging
    console.error('Erro no servidor:', error);
    
    // Retorna status 500 (Internal Server Error)
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        // Em desenvolvimento, mostra a mensagem de erro detalhada
        // Em produção, mostra uma mensagem genérica por segurança
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// Define a porta do servidor - usa a variável de ambiente PORT ou 3000 como fallback
const PORT = process.env.PORT || 5000;

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    // Callback executado quando o servidor inicia com sucesso
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});


*/