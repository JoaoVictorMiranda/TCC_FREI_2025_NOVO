import React, { useState, useRef, useEffect } from 'react'
import { Link } from "react-router";
import Barras from '../../assets/images/barras.svg'
import Pesquisa from '../../assets/images/pesquisa.svg'
import habuge from '../../assets/images/habuge.svg'
import { jwtDecode } from 'jwt-decode';
import './index.scss'

const Header = () => {
    const [nome, setNome] = useState('');
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

    const [showInput, setShowInput] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    function pesquisa() {
        setShowInput(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    }

    function puxarUsuario() {

    }
    let [haburguer, setHaburguer] = useState(Barras);

    function trocarBarras() {
        if (haburguer == Barras) {
            setHaburguer(habuge)
        } else if (haburguer == habuge) {
            setHaburguer(Barras)
        }
    }
    return (
        <div className='container_header' onLoad={puxarUsuario}>
            <div> <img src={haburguer} onClick={trocarBarras} height={50} className='hamburguer' /> </div>
            <div>
                <nav className='container_nav' >
                    <ul>
                        <li><Link to={'/'} >INICIO</Link></li>
                        <li><Link>FILMES</Link></li>
                        <li> <Link>SÉRIES</Link></li>
                        <li><Link>COMUNIDADE</Link></li>
                    </ul>
                </nav>
            </div>
            <div className='header_login'>
                {isFocused && <div className="overlay" onClick={() => setIsFocused(false)}></div>}
                <img src={Pesquisa} className='pesquisa' onClick={pesquisa} />
                <Link to={nome ? '/perfil' : '/login'} ><h3>{nome ? nome : 'Logar'}</h3></Link>
                <div className="caixa_pesquisa">
                    <input
                        type="text"
                        id='pesquisa'
                        ref={inputRef}
                        className={`input_pesquisa ${showInput ? '' : 'sumido'}`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            setShowInput(false); // Esconder o input quando perder foco
                        }}
                    />
                </div>
                <div className="foto_perfil">

                </div>

            </div>
        </div>
    )
}

export default Header