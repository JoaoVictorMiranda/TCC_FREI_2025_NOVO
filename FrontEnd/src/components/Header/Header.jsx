import React, { useState, useRef } from 'react'
import { Link } from "react-router";
import Barras from '../../assets/images/barras.svg'
import Pesquisa from '../../assets/images/pesquisa.svg'
import habuge from '../../assets/images/habuge.svg'
import './Header.scss'

const Header = ({User}) => {
    const [showInput, setShowInput] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    let [usuario, setUsuario] = useState(User);
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
                        <li><Link>COMUNIDADE</Link></li>
                        <li><Link>FILMES</Link></li>
                        <li> <Link>SÉRIES</Link></li>
                    </ul>
                </nav>
            </div>
            <div className='header_login'>
                {isFocused && <div className="overlay" onClick={() => setIsFocused(false)}></div>}
                <img src={Pesquisa} className='pesquisa' onClick={pesquisa} />
                <Link to={'/login'} ><h3>{usuario}</h3></Link>
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