import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Barras from '../../assets/images/barras.svg';
import Pesquisa from '../../assets/images/pesquisa.svg';
import habuge from '../../assets/images/habuge.svg';

import clickSound from '../../assets/audios/click.mp3';
import './index.scss';

export default function Header() {
    const [nome, setNome] = useState('');
    const [mostrarCampo, setMostrarCampo] = useState(false);
    const [iconeMenu, setIconeMenu] = useState(Barras);
    const [textoBusca, setTextoBusca] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);
    
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const audioRef = useRef(null);
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

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {
                console.log('Erro ao reproduzir áudio:', error);
            });
        }
        

        setMenuAberto(!menuAberto);
        setIconeMenu(menuAberto ? Barras : habuge);
    }

    function fecharMenu() {
        setMenuAberto(false);
        setIconeMenu(Barras);
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
            fecharMenu();
        }
    }

    function pesquisa() {
        abrirBusca();
    }

    function handleLinkClick() {
        fecharMenu();
    }

    return (
        <header className="container_header">
            <div className="menu_hamburguer">
                <img
                    src={iconeMenu}
                    alt="Menu"
                    onClick={alternarMenu}
                    className="hamburguer"
                />
            </div>

            <audio ref={audioRef} preload="auto">
                <source src={clickSound} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
            </audio>

            {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}

            <nav className={`container_nav ${menuAberto ? 'menu_aberto' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={handleLinkClick}>INÍCIO</Link></li>
                    <li><Link to="/filmes" onClick={handleLinkClick}>FILMES</Link></li>
                    <li><Link to="/comunidade" onClick={handleLinkClick}>COMUNIDADE</Link></li>
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
                
                <Link to={nome ? '/perfil' : '/login'} onClick={fecharMenu}>
                    <h3>{nome ? nome : 'Logar'}</h3>
                </Link>
            </div>
        </header>
    );
}