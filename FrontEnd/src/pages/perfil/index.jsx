import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom'; // Corrigido: 'react-router' para 'react-router-dom'
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
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

    // FUNÇÃO PARA CONSTRUIR URL COMPLETA
    const construirUrlFoto = (caminho) => {
        if (!caminho) return perfilFixo;
        if (caminho.startsWith('http')) return caminho;
        return `http://localhost:5022/${caminho}`;
    };

    useEffect(() => {
        const atualizarFoto = () => {
            const novaFoto = localStorage.getItem("fotoPerfil");
            if (novaFoto) {
                setFotoPerfil(construirUrlFoto(novaFoto));
            }
        };

        window.addEventListener("fotoPerfilAtualizada", atualizarFoto);
        
        return () => {
            window.removeEventListener("fotoPerfilAtualizada", atualizarFoto);
        };
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const nomeUsuario = decoded.nome || decoded.user?.nome || '';
                setNome(nomeUsuario);

                // USAR FUNÇÃO UNIFICADA PARA CONSTRUIR URL
                const fotoDoToken = construirUrlFoto(decoded.foto_perfil);
                
                // Verificar se há foto no localStorage primeiro
                const fotoLocal = localStorage.getItem("fotoPerfil");
                setFotoPerfil(fotoLocal ? construirUrlFoto(fotoLocal) : fotoDoToken);

                const nascimento = decoded.nascimento;
                if (nascimento) {
                    const anos = calcularIdade(nascimento);
                    setIdade(anos);
                }
            } catch (error) {
                console.error('Token inválido ou expirado:', error);
            }
        }
    }, [token]);

    // CARREGAR POSTS AUTOMATICAMENTE
    useEffect(() => {
        if (token) {
            carregarPost();
        }
    }, [token]);

    function carregarPost() {
        if (!token) return console.error('Token não encontrado');

        api.post('/post/user', {}, {
            headers: { 'x-access-token': token }
        })
            .then(response => {
                console.log('Dados do usuário:', response.data);
                setPost(response.data)
            })
            .catch(error => console.error(error));
    }

    function calcularIdade(dataISO) {
        const hoje = new Date();
        const nascimento = new Date(dataISO);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    function handleDeslogar() {
        setIsLoading(true); // Ativa o carregamento
        
        // Simula o processo de logout com delay
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("fotoPerfil");
            setIsLoading(false); // Desativa o carregamento
            navigate('/login');
        }, 1500); // 1.5 segundos de delay
    }

    return (
        <div>
            <div className="container_principal">
                <Header />

                {/* Mostrar componente de carregamento quando isLoading for true */}
                {isLoading && <Carregando />}

                <section className='container_infoUsuario'>

                    <div className="foto_perfil">
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
                                }}
                                onError={(e) => {
                                    e.target.src = perfilFixo;
                                }}
                            />
                        </div>

                        <div className="button-editar">
                            <Link to="/perfil/configurar">Editar Foto</Link>
                        </div>
                    </div>

                    <div className="nome">
                        <div className="only-name">
                            <h1>Nome:</h1>
                            <p>{nome}</p>
                        </div>
                        
                        <div className="infos"> 
                            <div className="infosIndividuais">
                                <h1>Idade: </h1>
                                <p>{idade}</p>
                            </div> 

                            <div className="infosIndividuais">
                                <h1>Seguidores</h1>
                                <p>0</p>
                            </div> 
                                
                            <div className="infosIndividuais">
                                <h1>Quero assistir</h1>
                                <p>5</p>
                            </div> 
                        </div>
                    </div>
                    
                </section>

                <div className="container_posts">
                    {post.length === 0 && <p>Nenhum post encontrado</p>}

                    {post.map((post) => (
                        <div key={post.id_post} className="Card_post">
                            <h2>{post.nome}</h2>
                            <h3>{post.titulo}</h3>
                            <p>Filme: {post.id_filme}</p>
                            <p>Nota: {post.nota}</p>
                            <p>Data: {post.criado_em}</p>
                            <p>Curtidas: {post.curtidas}</p>
                            <button type='button' onClick={() => alert("CURTIDO")}>Curtir</button>
                        </div>
                    ))}
                </div>

                <div className="deslogar">
                    <button onClick={handleDeslogar} disabled={isLoading}>
                        {isLoading ? 'Saindo...' : 'Deslogar'}
                    </button>
                </div>

            </div>
            <Footer />  
        </div>
    );
};

export default Perfil;