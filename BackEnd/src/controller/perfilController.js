import * as repo from '../repository/perfilRepository.js'
import { Router } from 'express'
import { getAuthentication } from '../utils/jwt.js'
import multer from 'multer';

const upload = multer({ dest: 'public/storage' })
const auth = getAuthentication();

const endpoints = Router();



endpoints.post('/usuario/perfil', upload.single('img'), auth, async (req, res) => {
    try {
        // Verifica se o arquivo foi enviado
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhuma imagem foi enviada' });
        }

        let caminho = req.file.path;
        let idUser = req.user.id_user;

        console.log('Tentando atualizar perfil:', { idUser, caminho });

        // Remove o prefixo 'public/' se existir, para salvar caminho relativo
        caminho = caminho.replace('public/', '');

        const resultado = await repo.alterarFotoPerfil(idUser, caminho);
        
        if (resultado > 0) {
            console.log('Foto de perfil atualizada com sucesso');
            res.status(200).json({ 
                mensagem: 'Foto atualizada com sucesso',
                caminho: caminho 
            });
        } else {
            console.log('Nenhuma linha afetada - usuário não encontrado?');
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }

    } catch (error) {
        console.error('Erro ao atualizar foto de perfil:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});



export default endpoints