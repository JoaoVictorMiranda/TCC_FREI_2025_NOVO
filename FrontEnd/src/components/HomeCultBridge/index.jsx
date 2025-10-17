import './index.scss'

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
                        <button id='Comecar'>CRIAR REGISTRO</button>
                        <button id='Navegar'>NAVEGAR</button>
                    </div>
                </div>
                <div className="lado_direito">
                    <img src={pipoca} alt="" />
                </div>
            </div>
        </div>
    )
}
