import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importação correta do jwt-decode

import Barras from '../../assets/images/barras.svg';
import Pesquisa from '../../assets/images/pesquisa.svg';
import habuge from '../../assets/images/habuge.svg';

import './index.scss';

export default function Header() {
    const [nome, setNome] = useState('');
    const [mostrarCampo, setMostrarCampo] = useState(false);
    const [iconeMenu, setIconeMenu] = useState(Barras);
    const [textoBusca, setTextoBusca] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const nomeUsuario = decoded.nome || decoded.user?.nome || '';
                setNome(nomeUsuario);
            } catch (error) {
                console.error('Token inválido ou expirado:', error);
            }
        }
    }, [token]);

    function alternarMenu() {
        setIconeMenu(iconeMenu === Barras ? habuge : Barras);
    }

    function abrirBusca() {
        setMostrarCampo(true);
        setIsFocused(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    }

    function buscarFilme(evento) {
        if (evento.key === 'Enter' && textoBusca.trim()) {
            navigate(`/buscainformacoes?query=${encodeURIComponent(textoBusca)}`);
            setMostrarCampo(false);
            setIsFocused(false);
        }
    }

    function pesquisa() {
        abrirBusca();
    }

    return (
        <header className="container_header">
            <div>
                <img
                    src={iconeMenu}
                    alt="Menu"
                    onClick={alternarMenu}
                    height={50}
                    className="hamburguer"
                />
            </div>

            <nav className="container_nav">
                <ul>
                    <li><Link to="/">INÍCIO</Link></li>
                    <li><Link to="/filmes">FILMES</Link></li>
                    <li><Link to="/series">SÉRIES</Link></li>
                    <li><Link to="/comunidade">COMUNIDADE</Link></li>
                </ul>
            </nav>

            <div className="header_login">
                {isFocused && <div className="overlay" onClick={() => setIsFocused(false)}></div>}
                
                <div className="caixa_pesquisa">
                    <input
                        ref={inputRef}
                        type="text"
                        value={textoBusca}
                        onChange={(e) => setTextoBusca(e.target.value)}
                        onKeyDown={buscarFilme}
                        placeholder="Buscar filme..."
                        className={`input_pesquisa ${mostrarCampo ? '' : 'sumido'}`}
                        onBlur={() => {
                            setTimeout(() => {
                                setMostrarCampo(false);
                                setIsFocused(false);
                            }, 200);
                        }}
                    />
                </div>
                
                <img 
                    src={Pesquisa} 
                    alt="Pesquisar" 
                    className='pesquisa' 
                    onClick={pesquisa} 
                />
                
                <Link to={nome ? '/perfil' : '/login'}>
                    <h3>{nome ? nome : 'Logar'}</h3>
                </Link>
            </div>
        </header>
    );
}