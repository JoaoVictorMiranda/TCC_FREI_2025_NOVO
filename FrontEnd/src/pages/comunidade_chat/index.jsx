import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const ChatComunidade = () => {
    const { id } = useParams();
    const [mensagem, setMensagem] = useState(''); 
    const navigate = useNavigate();

    async function verificarMembro(){
        try {
            console.log('Verificando membro para sala:', id);
            
            const response = await api.post(`/comunidade/membros/${id}`);
            console.log('Response:', response);
            
            if(response.status === 401){
                console.log('Usuário não é membro - redirecionando...');
                alert(response.data.acesso); // "Acesso negado usuario não pertence a comunidade"
                navigate('/'); // Redireciona para home
                return; // ⚠️ IMPORTANTE: para a execução aqui
            }
            
            // Se chegou aqui, o usuário é membro
            console.log('Usuário é membro da comunidade');
            alert(response.data.acesso); // "Acesso Permitido"
            
        } catch (error) {
            console.log('Erro na verificação:', error);
            
            // ⚠️ TRATAMENTO ESPECÍFICO PARA ERRO 401
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
        
        if(!token){
            alert("Faça login primeiro");
            navigate('/login');
            return;
        }
        
        verificarMembro();
    }, [id, navigate]); // ⚠️ IMPORTANTE: colocar as dependências

    // Resto do componente...
    return (
        <div>
            <h1>Chat da Comunidade: {id}</h1>
            {/* Seu form aqui */}
        </div>
    )
}

export default ChatComunidade;