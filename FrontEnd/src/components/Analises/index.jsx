import { useEffect, useState } from 'react';
import apiTMDB from '../../apiTMDB.js'
const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

import api from '../../api.js'

import Profile from '../../assets/images/profile.jpg'

import CardComentario from '../CardComentario'

import './index.scss'

export default function SessaoComentarios() {
    const [movie, setMovie] = useState(null)
    const [arr, setArr] = useState([])

    useEffect(() => {
        const fetchMovie = async () => {
            const resp = await apiTMDB.get(`/movie/666?${apiKey}&language=pt-BR`)
            setMovie(resp.data)
        }
        fetchMovie()
    }, [])

    async function PuxarInfo() {
        const resp = await api.get('/post/avaliacao')
        setArr(resp.data)
    }

    PuxarInfo()

    return (
        <div className='SessaoComentarios'>
            <div className="SessaoComentariosConteudo">
                <div className="SessaoComentariosTitulo">
                    <h1>ANÁLISES</h1>
                    <div className='BlocoVermelho' />
                </div>

                <div className="Comentarios">
                    {
                        arr.map((info) => (
                            <CardComentario
                                key={info.id_user}
                                id_user={info.id_user}
                                profile={Profile}
                                perfil={info.nome}
                                analise={info.avaliacao}
                                curtidas={info.curtidas}
                                nota={info.nota}
                            />
                        ))
                    }
                </div>

            </div>

            <button>Carregar</button>
        </div>
    )
}
