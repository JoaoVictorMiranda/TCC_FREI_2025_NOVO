import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api';

const ChatComunidade = () => {
        const { id } = useParams();
        const [mensagem, setMensagem] = useState(); 

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                        api.post(`/comunidades/chat/${id}`, {
                                mensagem: mensagem
                        })
                } catch (error) {
                        
                }
        }

  return (
    <div>
        <form onSubmit={handleSubmit}>
                <h1>{id}</h1>
                <input type="text" onChange={(e) => setMensagem(e.target.value)} />
                <button type='submit'>Enviar</button>
        </form>
    </div>
  )
}

export default ChatComunidade