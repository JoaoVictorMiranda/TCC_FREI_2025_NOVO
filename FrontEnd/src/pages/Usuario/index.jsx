import { useNavigate, useParams } from "react-router"
import api from "../../api.js"
import { useEffect, useState } from "react"

import perfilFixo from '../../assets/images/usuario.png';
import Header from "../../components/Header/index.jsx";
import Footer from "../../components/Footer/index.jsx";

export default function Usuario() {
    const { id } = useParams()
    const [usuario, setUsuario] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState(perfilFixo);
    const navigate = useNavigate()



    const construirUrlFoto = (caminho) => {
        if (!caminho) return perfilFixo;
        if (caminho.startsWith('data:')) return caminho;
        if (caminho.startsWith('http')) return caminho;
        return `http://localhost:5022/${caminho}`;
    };

    async function PuxarInfoPerfil() {
        const resp = await api.get(`/user/${id}`)

        if (resp.status === 404) {
            return navigate('/')
        }

        setUsuario(resp.data.informacoes)
        setFotoPerfil(construirUrlFoto(resp.data.informacoes.foto_perfil))
        console.log(fotoPerfil)
    }

    useEffect(() => {
        PuxarInfoPerfil()
    },[])

    return (
        <div>
            <Header />
            <h2>Usuário: {usuario.nome}</h2>
            <img src={fotoPerfil} alt="" />

            <Footer />
        </div>
    )
}