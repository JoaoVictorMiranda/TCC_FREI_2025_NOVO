import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './index.scss';
import perfilFixo from '../../assets/images/usuario.png';
import Carregando from '../../components/Carregando';

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

    const construirUrlFoto = (caminho) => {
        if (!caminho) return perfilFixo;
        if (caminho.startsWith('data:')) return caminho;
        if (caminho.startsWith('http')) return caminho;
        return `http://localhost:5022/${caminho}`;
    };

    useEffect(() => {
        const carregarFotoUsuario = () => {
            if (!token) return;
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id || decoded.user?.id || decoded.nome;
                const fotoSalva = localStorage.getItem(`fotoPerfil_${userId}`);
                if (fotoSalva) {
                    setFotoPerfil(construirUrlFoto(fotoSalva));
                } else {
                    setFotoPerfil(perfilFixo);
                }
            } catch (error) {
                console.error('Erro ao carregar foto:', error);
                setFotoPerfil(perfilFixo);
            }
        };

        carregarFotoUsuario();
        window.addEventListener("fotoPerfilAtualizada", carregarFotoUsuario);

        return () => window.removeEventListener("fotoPerfilAtualizada", carregarFotoUsuario);
    }, [token]);

    useEffect(() => {
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            const nomeUsuario = decoded.nome || decoded.user?.nome || '';
            setNome(nomeUsuario);

            const nascimento = decoded.nascimento;
            if (nascimento) setIdade(calcularIdade(nascimento));
        } catch (error) {
            console.error('Token inválido ou expirado:', error);
        }
    }, [token]);

    useEffect(() => {
        if (token) carregarPost();
    }, [token]);

    function carregarPost() {
        if (!token) return console.error('Token não encontrado');
        api.post('/post/user', {}, { headers: { 'x-access-token': token } })
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }

    function calcularIdade(dataISO) {
        const hoje = new Date();
        const nascimento = new Date(dataISO);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
        return idade;
    }

    function handleDeslogar() {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            setIsLoading(false);
            navigate('/login');
        }, 1500);
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
            <div className="container_principal">
                <Header />
                {isLoading && <Carregando />}

                <section className='container_infoUsuario'>
                    <div className="foto_perfil" style={{ position: "relative" }}>
                        <div className='imagem' style={{ textAlign: "center" }}>
                            <img
                                src={fotoPerfil}
                                alt="Foto de perfil"
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: "50%",
                                    border: "1px solid black",
                                    objectFit: "cover",
                                    cursor: "pointer"
                                }}
                                onClick={() => setOpenMenu(!openMenu)}
                                onError={(e) => { e.target.src = perfilFixo; }}
                            />

                           <p style={{ 
                                color: 'white', 
                                textAlign: 'center', 
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }} 
                            onClick={() => setOpenMenu(!openMenu)}>
                                clique para editar
                        </p>
                        
                        </div>

                        {openMenu && (
                            <div className='menu'
                                ref={menuRef}
                                style={{
                                    position: "absolute",
                                    top: "160px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    padding: "10px",
                                    zIndex: 10,
                                    width: "150px",
                                    textAlign: "center"
                                }}
                            >
                                <Link to="/perfil/configurar" style={{ display: "block", margin: "5px 0" }}>Editar Foto</Link>
                                <button onClick={handleDeslogar} disabled={isLoading} style={{ margin: "5px 0" }}>
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
                                <h1>Idade </h1>
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
                                <p>Data: {post.criado_em}</p>
                                <p>Curtidas: {post.curtidas}</p>
                                <button type='button' onClick={() => alert("CURTIDO")}>Curtir</button>
                            </div>
                        ))
                    )}
                </div>

                {post.length > 5 && qtdMostrar < post.length && (
                    <button className="button-ver-posts" onClick={verPosts}>
                        Ver todos os posts
                    </button>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default Perfil;