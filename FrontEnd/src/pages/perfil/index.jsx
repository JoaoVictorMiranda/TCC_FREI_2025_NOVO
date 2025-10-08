import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router';
import api from '../../api';

const Perfil = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);


                const nomeUsuario = decoded.nome || decoded.user?.nome || '';
                setNome(nomeUsuario);

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
        localStorage.removeItem("token")
        navigate('/login')

    }


    return (
        <div>
            <Header />
            <h1>Nome:</h1>
            <p>{nome}</p>
            <h1>Idade: </h1>
            <p>{idade}</p>
            <div className="container_posts">
                {post.length === 0 && <p>Nenhum post encontrado</p>}

                {post.map((post) => (
                    <div key={post.id_post} className="Card_post">
                        <h2>{post.nome}</h2> {/* usuário que postou */}
                        <h3>{post.titulo}</h3> {/* título do post */}
                        <p>Filme: {post.id_filme}</p>
                        <p>Nota: {post.nota}</p>
                        <p>Data: {post.criado_em}</p>
                        <p>Curtidas: {post.curtidas}</p>
                        <button type='button' onClick={() => alert("CURTIDO")}>Curtir</button>
                    </div>
                ))}
            </div>


            <button onClick={Deslogar} > Deslogar</button>
            <button onClick={carregarPost} >CarregarPosts</button>



            <Footer />
        </div>
    );
};

export default Perfil;
