import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router';
import api from '../../api';
import Header from '../../components/Header';
import Footer from '../../components/Footer'

const Comunidades = () => {
        let [nome, setNome] = useState();
        let [descricao, setDescricao] = useState();
        let [imagem, setImagem] = useState();
        const navigate = useNavigate();

        useEffect(() => {
                let token = localStorage.getItem("token");
                
                 if(!token){
                alert("TA PERDIDO FI?");
                navigate('/login')
        }
        })

        const handleSubmit = async (e) => {
                e.preventDefault();

                const formData = new FormData();

                formData.append('nome', nome);
                formData.append('descricao', descricao);
                

                if (imagem) {
                    formData.append('img', imagem);
                }
                
                try {
                    await api.post('/comunidade', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data' 
                        }
                    });

                    alert("COMUNIDADE CRIADA COM SUCESSO");
                } catch (error) {
                    console.error("Erro ao criar comunidade:", error);
                    alert("Erro ao criar comunidade");
                }
            };



  return (
    <div>

            <Header/>

        <h1>Criar Comunidades</h1>


        <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome da comunidade</label>
        <input type="text"  name='nome' placeholder='Nome da comunidade' onChange={(e) => setNome(e.target.value)} required />
        <br />
        <label htmlFor="descricao">Descrição da comunidade</label>
        <input type="text"  name='descricao' placeholder='Descrição da comunidade' 
        onChange={(e) => setDescricao(e.target.value)} required />

        <label htmlFor="foto">Foto de capa da comunidade(optional)</label>
        <br />
        <input  type="file" 
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])} />
        <button type='submit'>Mandar</button>
        </form>

        <Footer/>

    </div>
  )
}

export default Comunidades