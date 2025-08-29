import React, { useState } from 'react'
import { Link } from "react-router";
import Barras from '../../assets/images/barras.svg'
import './Header.scss'

const Header = () => {

let [usuario, setUsuario] = useState("Lucas Viana")

function puxarUsuario(){


    
}


  return (
    <div className='container_header' onLoad={puxarUsuario}> 
        <div> <img src={Barras} height={50} /> </div>
        <div>
            <nav className='container_nav' >
                <ul>
                    <li><Link to={'/'} >INICIO</Link></li>
                    <li><Link>LISTAS</Link></li>
                    <li><Link>EXPLORAR</Link></li>
                    <li> <Link> JOGOS  </Link>  </li>
                    <li> <Link> FILMES  </Link>  </li>
                    <li> <Link> SERIES  </Link>  </li>
                </ul>
            </nav>
        </div>
        <div className='header_login'>
            <h3>{usuario}</h3>
            <div className="foto_perfil">
            
            </div>

        </div>
     </div>
  )
}

export default Header