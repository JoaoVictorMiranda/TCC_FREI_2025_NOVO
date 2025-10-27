import { CiHeart } from "react-icons/ci";

import './index.scss'

export default function CardComentario({ profile, perfil, nota, analise, curtidas }) {
    return (
        <div className="CardComentario" >
            <div className="FotoPerfil">
                <img height={60} src={profile} alt="" />
            </div>
            <div className="AlinhadorComentario">
                <div className="Perfil">
                    <h3>{perfil}</h3>
                    <h3>Nota: {nota ? nota : '0'}</h3>
                </div>
                <div className="Analise">
                    <h4>"{analise}"</h4>
                </div>
                <div className="Curtidas">
                    <h3><CiHeart />{curtidas}</h3>
                </div>
            </div>
        </div>
    )
}
