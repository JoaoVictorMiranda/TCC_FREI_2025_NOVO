import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './index.scss';
import api from '../../api.js';
import Header from '../../components/Header/index.jsx';
import Footer from '../../components/Footer/index.jsx';

const Registrar = () => {
    const [nome, setNome] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/user/cadastro', {
                nome: nome,
                nascimento: nascimento,
                email: email,
                senha: senha
            });

            console.log('Cadastro realizado com sucesso:', response.data);
            alert("Cadastro feito seja muito bem vindo meu amigo ficamos feliz em te receber")
            api.post('/usuario', {
                email: email,
                senha: senha
            })
                .then(response => {
                    console.log(response.data);
                    const token = response.data.token
                    localStorage.setItem("token", token)
                    navigate('/perfil')
                })


        } catch (error) {
            console.error('Erro ao cadastrar:', error.response?.data || error.message);
        }
    };

    return (
        <div className='container_registro'>
            <Header />
            <div className="registro">

                    <h1>Crie Sua Conta:</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome: </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Seu Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <label htmlFor="nascimento">Data de Nascimento: </label>
                    <input
                        type="date"
                        id="nascimento"
                        name="nascimento"
                        value={nascimento}
                        onChange={(e) => setNascimento(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="senha">Senha: </label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="SenhaForte1234"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <button type="submit">Registrar</button>
                </form>
                <p>Já tem login? <Link to="/login">Entrar</Link></p>
            </div>
            <Footer />
        </div>
    );
};

export default Registrar;
