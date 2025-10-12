import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Barras from '../../assets/images/barras.svg';
import Pesquisa from '../../assets/images/pesquisa.svg';
import habuge from '../../assets/images/habuge.svg';

import './index.scss';

export default function Header() {
    const navigate = useNavigate();
    const [mostrarCampo, setMostrarCampo] = useState(false);
    const [iconeMenu, setIconeMenu] = useState(Barras);
    const [textoBusca, setTextoBusca] = useState('');
    const inputRef = useRef(null);

    function alternarMenu() {
        setIconeMenu(iconeMenu === Barras ? habuge : Barras);
    }

    function abrirBusca() {
        setMostrarCampo(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    }

    function buscarFilme(evento) {
        if (evento.key === 'Enter' && textoBusca.trim()) {
            navigate(`/buscainformacoes?query=${encodeURIComponent(textoBusca)}`);
        }
    }

    return (
        <header className="container_header">
            <div>
                <img
                    src={iconeMenu}
                    onClick={alternarMenu}
                    height={50}
                    className="hamburguer"
                />
            </div>

            <nav className="container_nav">
                <ul>
                    <li><Link to="/">INÍCIO</Link></li>
                    <li><Link>FILMES</Link></li>
                    <li><Link>SÉRIES</Link></li>
                    <li><Link>COMUNIDADE</Link></li>
                </ul>
            </nav>

            <div className="header_login">
                <img
                    src={Pesquisa}
                    className="pesquisa"
                    onClick={abrirBusca}
                />
                <div className="caixa_pesquisa">
                    <input
                        ref={inputRef}
                        type="text"
                        value={textoBusca}
                        onChange={(e) => setTextoBusca(e.target.value)}
                        onKeyDown={buscarFilme}
                        placeholder="Buscar filme..."
                        className={`input_pesquisa ${mostrarCampo ? '' : 'sumido'}`}
                        onBlur={() => setMostrarCampo(false)}
                    />
                </div>
            </div>
        </header>
    );
}
