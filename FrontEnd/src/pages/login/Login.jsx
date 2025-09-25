import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';
import iconeControle from '../../assets/iconecontrole.svg';
import camera from '../../assets/camera.svg';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulação de login
        setTimeout(() => {
            console.log('Login realizado:', formData);
            setLoading(false);
            navigate('/community');
        }, 2000);
    };

    const handleVoltar = () => {
        navigate('/');
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login com ${provider}`);
    };

    return (
        <div className={`login-container ${loading ? 'loading' : ''}`}>
            <form onSubmit={handleSubmit} className="login-form">
                <h1>CineCommunity</h1>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
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
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="help-links">
                    <Link to="/forgot-password">Esqueceu a senha?</Link>
                    <Link to="/register">Criar conta</Link>
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar na Comunidade'}
                </button>

                <div className="divider">ou</div>

                <div className="social-login">
                    <button type="button" onClick={() => handleSocialLogin('Google')}>
                        Google
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('Twitter')}>
                        Twitter
                    </button>
                </div>

                <button type="button" onClick={handleVoltar} className="back-button">
                    Voltar ao Início
                </button>
            </form>

            <div className="flutuante">
                <img src={iconeControle} alt="Ícone controle" height="100" />
            </div>

            <div className="flutuante">
                <img src={camera} alt="Câmera" height="80" />
            </div>
        </div>
    );
};

export default Login;