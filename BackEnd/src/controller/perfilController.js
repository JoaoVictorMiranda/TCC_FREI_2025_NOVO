import * as repo from '../repository/perfilRepository.js';
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';
import multer from 'multer';
import { connection } from '../repository/connection.js';

const upload = multer({ dest: 'public/storage' });
const auth = getAuthentication();
const endpoints = Router();


endpoints.post('/usuario/perfil', upload.single('img'), auth, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhuma imagem foi enviada' });
        }

        let caminho = req.file.path;
        let idUser = req.user.id_user;

        console.log('Tentando atualizar perfil:', { idUser, caminho });

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


endpoints.post('/follow/:idFollow', auth, async (req, res) => {
    try {
        const idUser = Number(req.params.idFollow);
        const idSeguidor = Number(req.user.id_user);

        if (idUser === idSeguidor) {
            return res.status(400).send({ erro: 'Você não pode seguir a si mesmo.' });
        }

        const [existe] = await connection.query(`
            SELECT 1 FROM seguidores
            WHERE id_user = ? AND id_seguidor = ?
            LIMIT 1
        `, [idUser, idSeguidor]);

        if (existe.length > 0) {
            return res.status(400).send({ erro: 'Você já segue este usuário.' });
        }

        const info = await repo.seguirUsuario(idUser, idSeguidor);

        res.status(201).send({
            mensagem: 'Seguindo com sucesso!',
            NovoSeguidor: info.insertId
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ erro: 'Erro ao seguir usuário.' });
    }
});


endpoints.get('/user/:id', auth, async (req, res) => {
    try {
        const idUser = Number(req.params.id);

        const usuario = await repo.buscarUsuarioPorId(idUser);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.status(200).json({informacoes: usuario});

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});


export default endpoints;
