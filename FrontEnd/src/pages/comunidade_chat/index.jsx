import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const ChatComunidade = () => {
    const { id } = useParams();
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    async function verificarMembro() {
        try {
            console.log('Verificando membro para sala:', id);

            const response = await api.post(`/comunidade/membros/${id}`);
            console.log('Response:', response);

            if (response.status === 401) {
                console.log('Usuário não é membro - redirecionando...');
                navigate('/');
                return;
            }


            console.log('Usuário é membro da comunidade');

        } catch (error) {
            console.log('Erro na verificação:', error);


            if (error.response && error.response.status === 401) {
                alert(error.response.data.acesso);
                navigate('/');
                return;
            }

            alert("Erro de conexão: " + (error.message || 'Erro desconhecido'));
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
            alert("Faça login primeiro");
            navigate('/login');
            return;
        }

        verificarMembro();
    }, [id, navigate]);

    async function PuxarDados () {
        const resp = await api.get('/comunidades')
        console.log(resp.data.dados)
    }

    useEffect(() => {
        PuxarDados()
    },[])

    return (
        <div>
            <h1>Chat da Comunidade: {id}</h1>
        </div>
    )
}

export default ChatComunidade;