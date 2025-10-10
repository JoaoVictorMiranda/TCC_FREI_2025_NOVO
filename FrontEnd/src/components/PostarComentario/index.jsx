import React, { useState } from 'react'
import api from '../../api.js'
import './index.scss'

const PostarComentario = ({idFilme}) => {
        const [titulo, setTitulo] = useState('');
        const [avaliacao, setAvaliacao] = useState('');
        const [nota, setNota] = useState('');
        const [posts, setPosts] = useState([]);
        const token = localStorage.getItem("token");
        const id_filme = idFilme;
        async function EnviarComentario() {
                if (!titulo || !avaliacao || !nota) {
                        alert('Erro ao enviar seu post!');
                        return;
                }

                try {


                        await api.post('/EnviarComentario', {
                                "titulo": titulo,
                                "id_filme": id_filme,
                                "avaliacao": avaliacao,
                                "nota": nota,
                        }, {
                                headers: { 'x-access-token': token }
                        })
                        
                }

                catch (err) {
                        alert('Erro ao enviar avaliação!');
                        return;
                }
        }


     async   function carregarComentarios(){
                try {
                        const response = await api.get(`/post/${id_filme}`, {
                                headers: { 'x-access-token': token }
                        })
                        setPosts(response.data)

                } catch (error) {
                        console.log(error)
                }
        }
        carregarComentarios();
        return (
                <div  className='AlinhadorGeralComentario'>
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" placeholder='Titulo' name='titulo' value={titulo} onChange={e => setTitulo(e.target.value)} />
                        <label htmlFor="avaliacao">avaliacao</label>
                        <textarea name="avaliacao" id="avaliacao" value={avaliacao} onChange={e => setAvaliacao(e.target.value)}></textarea>
                        <label htmlFor="nota">nota</label>
                        <input type="number" name="nota" id="nota" value={nota} onChange={(e) => setNota(e.target.value)} />
                        <button onClick={EnviarComentario}>ENVIAR</button>
                        <div className="container_posts">

                                {posts.map((post) => (
                                        <div key={post.id_post} className="Card_post">
                                                <h2>{post.nome}</h2> {/* usuário que postou */}
                                                <h3>{post.titulo}</h3>
                                                <p>{post.avaliacao}</p> {/* título do post */}
                                                <p>Filme: {post.id_filme}</p>
                                                <p>Nota: {post.nota}</p>
                                                <p>Data: {post.criado_em}</p>
                                                <p>Curtidas: {post.curtidas}</p>
                                                <button type='button' onClick={() => alert("CURTIDO")}>Curtir</button>
                                        </div>
                                ))}
                        </div>
                </div>
        )
}

export default PostarComentario;