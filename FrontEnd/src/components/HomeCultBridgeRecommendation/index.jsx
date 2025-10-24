import { useEffect, useState } from 'react';
import apiTMDB from '../../apiTMDB.js'
const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

import './index.scss'

export default function index() {
    const [movie, setMovie] = useState(null)
    const [diretor, setDiretor] = useState('')

    useEffect(() => {
        const fetchMovie = async () => {
            const resp = await apiTMDB.get(`/movie/666?${apiKey}&language=pt-BR`)
            setMovie(resp.data)
        }
        fetchMovie()
    }, [])

    useEffect(() => {
        const AcharDiretor = async () => {
            const resp = await apiTMDB.get(`/movie/666/credits?${apiKey}&language=pt-BR`)

            const elenco = resp.data.crew;
            const diretor = elenco.find(p => p.job === 'Director')

            setDiretor(diretor.name)
        }
        AcharDiretor();
    }, [])

    return (
        <div className='HomeAbaRecomendados'>
            <div className="reviews_title">
                <h1>EXPLORAR</h1>
                <div className='BlocoVermelho' />
            </div>

            <div className="FilmeDestaque">
                <div className="LadoEsquerdo">
                    <img width={250} src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="LadoDireito">
                    <h1>{movie ? movie.title : 'Carregando...'}</h1>
                    <h3>Dirigido por {diretor}</h3>
                    <button>Registrar</button>
                </div>
            </div>

            <h1 id='FilmesRecomendados'>Filmes Recomendados</h1>
            <div className="BannersExibicao">
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
            </div>

            <div className="BannersExibicao">
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
            </div>

            <h1 id='FilmesRecomendados'>Outras opções</h1>
            <div className="BannersExibicao">
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
            </div>

            <div className="BannersExibicao">
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
                <div className="banner">
                    <img src={movie ? imageURL + movie.poster_path : ''} alt="" />
                </div>
            </div>

        </div>
    )
}
