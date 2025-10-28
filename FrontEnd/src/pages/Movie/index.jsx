import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CardDetalhes from '../../components/CardInfo/index.jsx';
import Carregando from '../../components/Carregando/index.jsx';
import CardComentario from '../../components/CardComentario/index.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiTMDB from '../../apiTMDB.js';
import api from '../../api.js';
import './index.scss'

import { FaEye } from "react-icons/fa";

const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

export default function index() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [diretor, setDiretor] = useState('');
    const [media, setMedia] = useState([]);
    const [arr, setArr] = useState([]);

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

    useEffect(() => {
        async function BuscarMedia() {
            const resp = await api.get(`/post/media/${id}`)
            console.log(resp.data.media[0].MediaCurtidas)
            setMedia(resp.data.media[0].MediaCurtidas.split(".")[0])
        }
        BuscarMedia()
        BuscarInfo()
    }, [media])

    async function BuscarInfo() {
        const resp = await api.get(`/post/${id}`)
        console.log(resp.data.Info)
        setArr(resp.data.Info)
    }

    if (!movie) return <Carregando />;

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
                        <div className="Diretor">
                            <h1>DIRIGIDO POR</h1>
                            <h3>{diretor}</h3>
                        </div>
                        <div className="Information">
                            <CardDetalhes
                                Info={'Assistiram'} />
                            <CardDetalhes
                                Quantidade={`${media ? media : '0'}`}
                                Info={'Aproveitamento'} />
                            <CardDetalhes
                                Info={'Querem Assistir'} />
                        </div>
                        <div className='Sinopse'>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <CardComentario /> */}

            <div className="SessaoComentarios">

                <h1>ANÁLISES</h1>
                <div className="BlocoVermelho" />
                {
                    arr.map((info) => (
                        <div className="Comentarios">
                            <CardComentario
                                key={info.id_user}
                                id_user={info.id_user}
                                perfil={info.nome}
                                analise={info.avaliacao}
                                curtidas={info.curtidas}
                                nota={info.nota}
                            />
                        </div>
                    ))
                }
            </div>

            {/* <PostarComentario idFilme={id} /> */}
            {/* <CardComentario /> */}
            <Footer />
        </div>
    )
}
