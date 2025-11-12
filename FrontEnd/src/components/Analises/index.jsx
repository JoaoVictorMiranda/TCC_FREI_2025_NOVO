import { useEffect, useState } from 'react';
import apiTMDB from '../../apiTMDB.js'
import { useNavigate } from 'react-router-dom';
const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

import api from '../../api.js'

import Profile from '../../assets/images/profile.jpg'

import CardComentario from '../CardComentario'

import './index.scss'
import DefinirTopico from '../Topicos/index.jsx';

export default function SessaoComentarios() {
    const [movie, setMovie] = useState(null)
    const [arr, setArr] = useState([])

    const navigate = useNavigate();


    async function PuxarInfo() {
        const resp = await api.get('/post/avaliacao')
        setArr(resp.data.slice(0, 6))
    }

    useEffect(() => {
        PuxarInfo()
    }, [])

    async function CurtirComentario(id_post) {
        try {
            const resp = await api.post('/post/curtir', { id_post });
            return resp.data
        }

        catch (err) {
            console.error(err);
            return { liked: false };
        }
    }

    return (
        <div className='SessaoComentarios'>
            <div className="SessaoComentariosConteudo">
                <DefinirTopico
                    tema={'ANÁLISES RECENTES'} />
                <div className="ComentariosIsolados">
                    {
                        arr.length
                            ? arr.map((info) => (

                                <div onClick={() => navigate(`/movie/${info.id_filme}`)}>
                                    <CardComentario
                                        key={info.id_post}
                                        id_post={info.id_post}
                                        perfil={info.nome}
                                        analise={info.avaliacao}
                                        curtidasIniciais={info.curtidas}
                                        nota={info.nota}
                                        CliqueCurtir={CurtirComentario}
                                        usuarioCurtiu={info.usuario_curtiu}
                                        id_user={info.id_user}
                                    />
                                </div>

                            ))
                            : <h1>Nenhuma análise encontrada</h1>
                    }
                </div>

            </div>

        </div>
    )
}
