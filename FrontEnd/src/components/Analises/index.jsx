import { useEffect, useState } from 'react';
import apiTMDB from '../../apiTMDB.js'
const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;


import CardComentario from '../CardComentario'

import './index.scss'

export default function SessaoComentarios() {
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const fetchMovie = async () => {
            const resp = await apiTMDB.get(`/movie/666?${apiKey}&language=pt-BR`)
            setMovie(resp.data)
        }
        fetchMovie()
    }, [])

    return (
        <div className='SessaoComentarios'>
            <div className="SessaoComentariosConteudo">
                <div className="SessaoComentariosTitulo">
                    <h1>ANÁLISES</h1>
                    <div className='BlocoVermelho' />
                </div>

                <div className="Comentarios">
                    <CardComentario
                        user={'Lucas Viana'}
                        avaliacao={'Bad Movie'}
                        criado_em={'2025-01-25'}
                        nota={'5'}
                        foto_perfil={'https://m.gettywallpapers.com/wp-content/uploads/2023/06/Pfp-Cool.jpg'}
                        poster_filme={movie ? imageURL + movie.poster_path : ''}
                        contagem_likes={'3'}
                        contagem_resp={'2'} />
                    <CardComentario
                        user={'Lucas Viana'}
                        avaliacao={'Bad Movie'}
                        criado_em={'2025-01-25'}
                        nota={'5'}
                        foto_perfil={'https://m.gettywallpapers.com/wp-content/uploads/2023/06/Pfp-Cool.jpg'}
                        poster_filme={movie ? imageURL + movie.poster_path : ''}
                        contagem_likes={'3'}
                        contagem_resp={'2'} />
                </div>

                <div className="Comentarios">
                    <CardComentario
                        user={'Lucas Viana'}
                        avaliacao={'Bad Movie'}
                        criado_em={'2025-01-25'}
                        nota={'5'}
                        foto_perfil={'https://m.gettywallpapers.com/wp-content/uploads/2023/06/Pfp-Cool.jpg'}
                        poster_filme={movie ? imageURL + movie.poster_path : ''}
                        contagem_likes={'3'}
                        contagem_resp={'2'} />
                    <CardComentario
                        user={'Lucas Viana'}
                        avaliacao={'Bad Movie'}
                        criado_em={'2025-01-25'}
                        nota={'5'}
                        foto_perfil={'https://m.gettywallpapers.com/wp-content/uploads/2023/06/Pfp-Cool.jpg'}
                        poster_filme={movie ? imageURL + movie.poster_path : ''}
                        contagem_likes={'3'}
                        contagem_resp={'2'} />
                </div>

            </div>

            <button>Carregar</button>
        </div>
    )
}
