import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../api';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();



    const handleSubmit = async (e) => {
        e.preventDefault();


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
            .catch(error => {
                console.error('Deu merda:', error);
            });



    };

    const handleVoltar = () => {
        navigate('/');
    };


    return (
        <div className="login-container">
            <Header />

            <form onSubmit={handleSubmit} className="login-form">
                <h1>CultBridge</h1>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="seu@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Sua senha"
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <div className="help-links">
                    <Link to="/forgot-password">Esqueceu a senha?</Link>
                    <Link to="/registrar">Criar conta</Link>
                </div>

                <button type="submit" className="login-button" >
                    Login
                </button>

                <div className="divider">ou</div>

                <div className="social-login">
                    <button type="button" onClick={() => handleSocialLogin('Google')}>
                        Google
                    </button>
                </div>

                <button type="button" onClick={handleVoltar} className="back-button">
                    Voltar ao Início
                </button>
            </form>

            <Footer />
        </div>
    );
};

export default Login;