import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";

import './index.scss'

export default function CardComentario({ poster_filme, contagem_likes, contagem_resp, foto_perfil, avaliacao, user, nota, criado_em }) {
    return (
        <div className="CardComentario" style={{ cursor: 'pointer' }}>
            <div className="LadoEsquerdo">
                <img width={140} src={poster_filme} alt="" />
            </div>
            <div className="Alinhador">
                <div className="LadoDireito">
                    <div className="TituloCard">
                        <img width={60} src={foto_perfil} alt="" />
                        <h2>{user}</h2>
                    </div>
                    <h3>Nota: {nota}</h3>
                    <h3>"{avaliacao}"</h3>
                    <h4>{criado_em}</h4>
                </div>
                <div className="Interacoes" >
                    <div className="Coracao">
                        < CiHeart style={{ color: 'red' }} />
                        <h3>{contagem_likes}</h3>
                    </div>
                    <div className="Comentarios">
                        <FaRegCommentDots style={{ fontSize: 23 }} />
                        <h3>{contagem_resp}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
