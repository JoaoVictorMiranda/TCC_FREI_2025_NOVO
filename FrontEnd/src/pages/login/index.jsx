import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
            navigate('/perfil');
        }, 2000);
    };

    const handleVoltar = () => {
        navigate('/');
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login com ${provider}`);
    };

    return (
        <div className="login-container">
            <Header User={"Lucas Viana"} />
            
            <form onSubmit={handleSubmit} className="login-form">
                <h1>CultBridge</h1>

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
                    <Link to="/registrar">Criar conta</Link>
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

            <Footer />
        </div>
    );
};

export default Login;