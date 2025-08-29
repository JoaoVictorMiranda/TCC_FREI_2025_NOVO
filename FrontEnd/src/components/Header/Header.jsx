import React, { useState, useRef } from 'react'
import { Link } from "react-router";
import Barras from '../../assets/images/barras.svg'
import Pesquisa from '../../assets/images/pesquisa.svg'
import habuge from '../../assets/images/habuge.svg'
import './Header.scss'

const Header = () => {
    const [showInput, setShowInput] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    let [usuario, setUsuario] = useState("Lucas Viana");
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


function trocarBarras(){
    if(haburguer == Barras){
        setHaburguer(habuge)
    }else if(haburguer == habuge){
        setHaburguer(Barras)
    }
}
    return (
        <div className='container_header' onLoad={puxarUsuario}>
            <div> <img src={haburguer}  onClick={trocarBarras} height={50} className='hamburguer' /> </div>
            <div>
                <nav className='container_nav' >
                    <ul>
                        <li><Link to={'/'} >INICIO</Link></li>
                        <li><Link>LISTAS</Link></li>
                        <li><Link>EXPLORAR</Link></li>
                        <li><Link>JOGOS</Link></li>
                        <li><Link>FILMES</Link></li>
                        <li> <Link>SÉRIES</Link></li>
                    </ul>
                </nav>
            </div>
            <div className='header_login'>
                {isFocused && <div className="overlay" onClick={() => setIsFocused(false)}></div>}
                <img src={Pesquisa} className='pesquisa' onClick={pesquisa} />
                <h3>{usuario}</h3>
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