import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PostarComentario from '../../components/PostarComentario'
import CardDetalhes from '../../components/CardInfo/index.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiTMDB from '../../apiTMDB.js';
import './index.scss'

import { FaEye } from "react-icons/fa";

const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

export default function index() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [diretor, setDiretor] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await apiTMDB.get(`/movie/${id}?${apiKey}&language=pt-BR`);
            setMovie(response.data);
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const AcharDiretor = async () => {
            const resp = await apiTMDB.get(`/movie/${id}/credits?${apiKey}&language=pt-BR`)

            const elenco = resp.data.crew;
            const diretor = elenco.find(p => p.job === 'Director')

            setDiretor(diretor.name)
        }
        AcharDiretor();
    }, [id])

    if (!movie) return <p>Carregando...</p>;
    return (
        <div>
            <Header />

            <div className="DetalhesDaObra">
                <div className="AlinhadorDetalhes">
                    <div className="DetalhesConteudo">
                        <h1>{movie.title}</h1>
                        <h3>{movie.release_date.split('-')[0]}</h3>
                    </div>
                    <div className="Trailer">
                        <h2>ASSISTIR TRAILER</h2>
                        <button>REGISTRAR</button>
                    </div>
                </div>

            </div>
            <div className="PosterSinopse">
                <img id='BackgroungDoFilme' src={imageURL + movie.backdrop_path} alt="" />
                <div className='EspacoDetalhes'>
                    <div className="PosterEsquerda">
                        <img width={250} src={imageURL + movie.poster_path} alt={movie.title} />
                    </div>
                    <div className="DetalhesAlinhador">
                        <div className="Alinhador">
                            <div className="Diretor">
                                <h1>DIRIGIDO POR</h1>
                                <h3>{diretor}</h3>
                            </div>
                            <div className="Detalhes">
                                <CardDetalhes
                                    Quantidade={'17'}
                                    Info={'ASSISTIRAM'}
                                    Icon={<FaEye />} />

                                <CardDetalhes
                                    Quantidade={'17'}
                                    Info={'ASSISTIRAM'}
                                    Icon={<FaEye />} />

                                <CardDetalhes
                                    Quantidade={'17'}
                                    Info={'ASSISTIRAM'}
                                    Icon={<FaEye />} />
                            </div>
                        </div>
                        <div className='Sinopse'>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>

            <PostarComentario idFilme={id} />
            <Footer />
        </div>
    )
}
