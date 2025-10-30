import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router';
import api from '../../api';
import './index.scss';
import perfilFixo from '../../assets/images/usuario.png';

const Perfil = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    // REMOVER: const [imagem, setImagem] = useState(perfilFixo); // ← Estado removido

    const [fotoPerfil, setFotoPerfil] = useState(perfilFixo);

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
                setFotoPerfil(construirUrlFoto(novaFoto)); // ← AGORA CONSTRÓI URL COMPLETA
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

    function Deslogar() {
        localStorage.removeItem("token");
        localStorage.removeItem("fotoPerfil"); // ← LIMPAR FOTO AO DESLOGAR
        navigate('/login');
    }

    return (
        <div>
            <div className="container_principal">
                <Header />

                <section className='container_infoUsuario'>
                    <div className="foto_perfil">
                        <div style={{ textAlign: "center" }}>
                            {/* SIMPLIFICAR - SEM VERIFICAÇÃO DESNECESSÁRIA */}
                            <img
                                src={fotoPerfil}
                                alt="Foto de perfil"
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                                onError={(e) => {
                                    // SE DER ERRO AO CARREGAR, USA FOTO PADRÃO
                                    e.target.src = perfilFixo;
                                }}
                            />
                        </div>
                        <Link to="/perfil/configurar">Editar Foto</Link>
                    </div>

                    <div className="info">  
                        <div className='nome_idade'>
                            <h1>Nome:</h1>
                            <p>{nome}</p>
                            <h1>Idade: </h1>
                            <p>{idade}</p>
                        </div>

                        <div className="seguidores_queroAssistir">
                            <h1>Seguidores</h1>
                            <p>0</p>
                            <h1>Quero assistir</h1>
                            <p>5</p>
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

                {/* REMOVER BOTÃO DE CARREGAR POSTS - AGORA É AUTOMÁTICO */}
                <button onClick={Deslogar}>Deslogar</button>
            </div>
            <Footer />
        </div>
    );
};

export default Perfil;