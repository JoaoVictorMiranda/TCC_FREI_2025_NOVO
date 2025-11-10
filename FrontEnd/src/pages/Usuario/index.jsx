import { useNavigate, useParams } from "react-router"
import api from "../../api.js"

export default function Usuario() {
    const { id } = useParams()
    const navigate = useNavigate()

    async function PuxarInfoPerfil() {
        const resp = await api.get(`/user/${id}`)

        if (resp.status === 404) {
            return navigate('/')
        }
    }

    PuxarInfoPerfil()

    return (
        <div>
            oi
        </div>
    )
}