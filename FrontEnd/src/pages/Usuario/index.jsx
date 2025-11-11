import { useNavigate, useParams } from "react-router"
import api from "../../api.js"
import { useEffect, useState } from "react"

export default function Usuario() {
    const { id } = useParams()
    const [usuario, setUsuario] = useState('')
    const navigate = useNavigate()

    async function PuxarInfoPerfil() {
        const resp = await api.get(`/user/${id}`)

        if (resp.status === 404) {
            return navigate('/')
        }

        setUsuario(resp.data.informacoes)
    }

    useEffect(() => {
        PuxarInfoPerfil()
    },[])

    return (
        <div>
            <h2>Usuário: {usuario.nome}</h2>
            <img src={usuario.foto_perfil} alt="" />
        </div>
    )
}