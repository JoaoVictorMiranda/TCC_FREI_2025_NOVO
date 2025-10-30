import './index.scss'

import { Link } from 'react-router'

import pipoca from '../../assets/images/cinema.png'

export default function index() {
    return (
        <div className='container_fundo_home'>
            <div className="alinhador">
                <div className="lado_esquerdo">
                    <h4>BEM-VINDO DE VOLTA!</h4>
                    <h1>CULTBRIDGE</h1>
                    <h3>ONDE AS SUAS IDEIAS ENCONTRAM SENTIDO</h3>
                    <div className="AlinhadorBotoes">

                        <button id='Comecar'><Link to={'/comunidade'}>CRIAR COMUNIDADE</Link></button>

                        <button id='Navegar'><Link to={'/filmes'}>NAVEGAR</Link></button>
                    </div>
                </div>
                <div className="lado_direito">
                    <img width={270} src={pipoca} alt="" />
                </div>
            </div>
        </div >
    )
}
