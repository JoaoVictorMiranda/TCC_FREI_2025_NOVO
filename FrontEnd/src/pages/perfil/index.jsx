import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import './index.scss';
import perfilFixo from '../../assets/images/usuario.png';
import Carregando from '../../components/Carregando';
import toast, { Toaster } from 'react-hot-toast';

const Perfil = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [fotoPerfil, setFotoPerfil] = useState(perfilFixo);
    const [isLoading, setIsLoading] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef();
    const [qtdMostrar, setQtdMostrar] = useState(5);
    const [seguindo, setSeguindo] = useState(false);
    const { idUser } = useParams();

    const construirUrlFoto = (caminho) => {
        if (!caminho) return perfilFixo;
        if (caminho.startsWith('data:')) return caminho;
        if (caminho.startsWith('http')) return caminho;
        return `http://localhost:5022/${caminho}`;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const carregarDadosUsuario = async () => {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id_user || decoded.user?.id_user;
                
                const res = await api.get(`/user/${userId}`, {
                    headers: { 'x-access-token': token }
                });

                const user = res.data.informacoes;
                console.log(user)
                setNome(user.nome || '');
                if (user.nascimento) setIdade(calcularIdade(user.nascimento));

                if (user.foto_perfil) {
                    setFotoPerfil(construirUrlFoto(user.foto_perfil));
                } else {
                    setFotoPerfil(perfilFixo);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                setFotoPerfil(perfilFixo);
            }
        };

        carregarDadosUsuario();
    }, [token, idUser]);

    useEffect(() => {
        const atualizarFoto = () => {
            if (!token) return;
            const decoded = jwtDecode(token);
            const userId = idUser || decoded.id || decoded.user?.id;

            api.get(`/user/${userId}`, { headers: { 'x-access-token': token } })
                .then(res => {
                    if (res.data.foto_perfil) {
                        setFotoPerfil(construirUrlFoto(res.data.foto_perfil));
                    }
                })
                .catch(() => { });
        };

        window.addEventListener("fotoPerfilAtualizada", atualizarFoto);
        return () => window.removeEventListener("fotoPerfilAtualizada", atualizarFoto);
    }, [token, idUser]);

    useEffect(() => {
        if (token) carregarPost();
    }, [token]);

    function carregarPost() {
        api.post('/post/user', {}, { headers: { 'x-access-token': token } })
            .then(response => setPost(response.data))
            .catch(() => { });
    }

    function calcularIdade(dataISO) {
        const hoje = new Date();
        const nascimento = new Date(dataISO);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
        return idade;
    }

    async function handleDeslogar() {
        setIsLoading(true);
        toast.success("Deslogado - Volte Sempre!", {
            duration: 3000,
            position: 'top-center',
        });
        setTimeout(() => {
            localStorage.removeItem("token");
            setIsLoading(false);
            navigate('/');
            window.location.reload();
        }, 3000);
    }

    async function seguirUsuario() {
        if (!token) return toast.error("É necessário estar logado");
        try {
            const decoded = jwtDecode(token);
            const idUser = decoded.id_user || decoded.id;
            await api.post(`/follow/${idUser}`, {}, { headers: { 'x-access-token': token } });
            setSeguindo(true);
            toast.success("Agora você está seguindo este usuário!");
        } catch {
            toast.error("Erro ao seguir usuário");
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const verPosts = () => setQtdMostrar(prev => Math.min(prev + 5, post.length));
    const postsParaMostrar = post.slice(0, qtdMostrar);

    return (
        <div>
            <Toaster />

            {isLoading && (
                <div className="overlay-carregando">
                    <Carregando />
                </div>
            )}

            <div className="container_principal">
                <Header />

                <section className='container_infoUsuario'>
                    <div className="foto_perfil">
                        <div className='imagem'>
                            <img
                                src={fotoPerfil}
                                alt="Foto de perfil"
                                className="foto-perfil-img"
                                onClick={() => setOpenMenu(!openMenu)}
                                onError={(e) => { e.target.src = perfilFixo; }}
                            />
                            <p
                                className="texto-editar-foto"
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                clique para editar
                            </p>
                        </div>

                        {openMenu && (
                            <div className='menu-perfil' ref={menuRef}>
                                <Link
                                    to="/perfil/configurar"
                                    className="menu-link"
                                >
                                    Editar Foto
                                </Link>

                                <button
                                    onClick={handleDeslogar}
                                    disabled={isLoading}
                                    className="btn-deslogar"
                                >
                                    {isLoading ? 'Saindo...' : 'Deslogar'}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="nome">
                        <div className="only-name">
                            <h1>Nome:</h1>
                            <p>{nome}</p>
                        </div>

                        <div className="infos">
                            <div className="infosIndividuais">
                                <h1>Idade</h1>
                                <p>{idade}</p>
                            </div>
                            <div className="infosIndividuais">
                                <h1>Seguidores</h1>
                                <p>600000</p>
                            </div>
                            <div className="infosIndividuais">
                                <h1>Quero assistir</h1>
                                <p>5</p>
                            </div>
                        </div>

                        <button
                            className={`btn-seguir ${seguindo ? 'seguindo' : ''}`}
                            onClick={seguirUsuario}
                            disabled={seguindo}
                        >
                            {seguindo ? 'Seguindo' : 'Seguir'}
                        </button>
                    </div>
                </section>

                <div className={`container_posts ${post.length === 0 ? 'vazio' : ''}`}>
                    {post.length === 0 ? (
                        <div className="sem-posts">
                            <p>Este usuário ainda não publicou nenhuma análise</p>
                        </div>
                    ) : (
                        postsParaMostrar.map((post) => (
                            <div key={post.id_post} className="Card_post">
                                <h2>{post.nome}</h2>
                                <h3>{post.titulo}</h3>
                                <p>Filme: {post.id_filme}</p>
                                <p>Nota: {post.nota}</p>
                                <p>Data: {post.criado_em.split('T')[0]}</p>
                                <p>Curtidas: {post.curtidas}</p>
                            </div>
                        ))
                    )}
                </div>

                {post.length > 5 && qtdMostrar < post.length && (
                    <button
                        className="button-ver-posts"
                        onClick={verPosts}
                    >
                        Ver todos os posts
                    </button>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Perfil;
