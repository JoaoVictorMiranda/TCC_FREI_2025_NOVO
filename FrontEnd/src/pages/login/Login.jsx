import React, { useState } from 'react';
import { Link } from 'react-router';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

import api from '../../api.js'


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    if (localStorage.token == true) {
        navigate('/perfil'); // ou a rota que você quiser
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/user', {
                email: email,
                senha: senha
            });
            let token = response.data.token;

            localStorage.setItem("token", token);
            navigate('/perfil'); // ou a rota que você quiser

        } catch (error) {
            console.error('Erro ao fazer login:', error.response?.data || error.message);
        }
    };

    return (
        <div className='container_login'>
            <h1>Faça Seu login:</h1>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Pedro@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="senha">Senha: </label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="SenhaForte1234"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button type="submit">Enviar</button>
                </form>
                <p>Não tem login? <Link to="/registrar">Registrar</Link></p>
            </div>
        </div>
    );
};

export default Login;
