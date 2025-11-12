import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CardDetalhes from '../../components/CardInfo/index.jsx';
import Carregando from '../../components/Carregando/index.jsx';
import CardComentario from '../../components/CardComentario/index.jsx';
import ModalPostarComentario from '../../components/ModalPostarComentario/index.jsx';
import { Toaster, toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiTMDB from '../../apiTMDB.js';
import api from '../../api.js';
import './index.scss'

import { FaEye } from "react-icons/fa";
import DefinirTopico from '../../components/Topicos/index.jsx';

const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

export default function index() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [diretor, setDiretor] = useState('');
    const [modal, setModal] = useState(false)
    const [media, setMedia] = useState([]);
    const [count, setCount] = useState([])
    const [arr, setArr] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [nota, setNota] = useState('')

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
            setMedia(resp.data.media[0].MediaCurtidas.split(".")[0])
        }
        BuscarMedia()
        BuscarInfo()
    }, [media])

    useEffect(() => {
        async function BuscarQuantidadeAnalises() {
            const resp = await api.get(`/post/count/${id}`)
            setCount(resp.data.contagem[0].ContarAvaliacao)
        }
        BuscarQuantidadeAnalises()
    }, [])

    async function BuscarInfo() {
        const resp = await api.get(`/post/${id}`)
        console.log(resp.data.Info)
        setArr(resp.data.Info)
    }

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

    async function EnviarAvaliacao() {
        if (!titulo || !avaliacao || !nota) {
            toast.error('Erro ao enviar análise!')
            return
        }

        try {
            const body = {
                id_filme: id,
                avaliacao: avaliacao,
                nota: nota
            }

            toast.success('Análise Enviada com Sucesso!')

            await api.post('/EnviarComentario', body)
            setModal(false)

            await BuscarInfo()
            await BuscarMedia()
        }

        catch (err) {
            console.log(err)
            return
        }
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
                        <button onClick={() => setModal(true)}>REGISTRAR</button>
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
                                Info={'Assistiram'}
                                Quantidade={`${count ? count : '0'}`} />
                            <CardDetalhes
                                Quantidade={`${media ? media : '0'}`}
                                Info={'Aproveitamento'} />
                            <CardDetalhes
                                Quantidade={`${count ? count : '0'}`}
                                Info={'Análises'} />
                        </div>
                        <div className='Sinopse'>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="SessaoComentarios">

                <div className="OsComentarios">

                    <DefinirTopico
                        tema={'ANÁLISES'} />
                    {
                        arr.length >= 1 ?
                            arr.map((info) => (
                                <div className="Comentarios" key={info.id_post}>
                                    <CardComentario
                                        id_post={info.id_post}
                                        perfil={info.nome}
                                        analise={info.avaliacao}
                                        curtidasIniciais={info.curtidas}
                                        nota={info.nota}
                                        CliqueCurtir={CurtirComentario}
                                        usuarioCurtiu={info.usuario_curtiu}
                                        id_user={info.id_user}
                                    /> :
                                </div>
                            ))
                            :
                            <h2 style={{ textAlign: 'center' }}>Nenhuma análise encontrada</h2>
                    }
                </div>
            </div>

            <Footer />

            <ModalPostarComentario
                abrir={modal}
                setModal={() => setModal(!modal)}
                fechar={() => setModal(false)}
                tema={'Adicionar Análise'}
                salvar={EnviarAvaliacao}
                conteudo={
                    <div className='Modal'>
                        <label style={{ fontWeight: '500' }}>Avaliação</label>
                        <input type='text' value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
                        <label style={{ fontWeight: '500' }}>Nota</label>
                        <input
                            type="number"
                            value={nota}
                            onChange={e => {
                                const valor = Number(e.target.value);
                                if (valor > 5) setNota(5);
                                else if (valor < 1) setNota(1);
                                else setNota(valor);
                            }}
                        />
                    </div>
                }
            >
            </ModalPostarComentario>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}
