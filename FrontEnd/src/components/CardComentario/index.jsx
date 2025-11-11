import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import foto_perfil from "../../assets/images/profile.jpg";
import "./index.scss";

export default function CardComentario({ id_post, id_user, perfil, nota, analise, curtidasIniciais, CliqueCurtir, usuarioCurtiu }) {
    const [curtidas, setCurtidas] = useState(curtidasIniciais || 0);
    const [curtido, setCurtido] = useState(usuarioCurtiu || false);
    const navigate = useNavigate();

    async function handleCurtir() {
        const resultado = await CliqueCurtir(id_post);
        if (resultado.liked) {
            setCurtidas(c => c + 1);
            setCurtido(true);
        } else {
            setCurtidas(c => c - 1);
            setCurtido(false);
        }
    }

    function IrParaPerfil() {
        navigate(`/perfil/${id_user}`);
    }

    return (
        <div className="CardComentario">
            <div className="FotoPerfil">
                <img 
                onClick={IrParaPerfil}
                style={{cursor: 'pointer'}}
                height={60}
                src={foto_perfil}
                alt="" />
            </div>
            <div className="AlinhadorComentario">
                <div className="Perfil">
                    <h3>{perfil}</h3>
                    <h3>{nota ?? "0"}</h3>
                </div>
                <div className="Analise">
                    <h4>{analise}</h4>
                </div>
                <div className="Curtidas">
                    {curtido ? (
                        <FaHeart
                            color="red"
                            style={{ fontSize: 25, cursor: "pointer" }}
                            onClick={handleCurtir}
                        />
                    ) : (
                        <CiHeart
                            style={{ fontSize: 25, cursor: "pointer" }}
                            onClick={handleCurtir}
                        />
                    )}
                    <h4 style={{ paddingLeft: 5 }}>{curtidas}</h4>
                </div>
            </div>
        </div>
    );
}
