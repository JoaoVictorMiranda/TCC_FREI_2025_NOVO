import React, { useState } from 'react'
import api from '../../api.js'
import './index.scss'

const PostarComentario = () => {
        const [titulo, setTitulo] = useState('');
        const [avaliacao, setAvaliacao] = useState('');
        const [nota, setNota] = useState('');

        async function EnviarComentario() {
                if (!titulo || !avaliacao || !nota) {
                        alert('Erro ao enviar seu post!');
                        return;
                }

                try {
                        localStorage.getItem("token");

                        await api.post('/EnviarComentario', {
                                "titulo": titulo,
                                "id_filme": 1238,
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

        return (
                <div className='AlinhadorGeralComentario'>
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" placeholder='Titulo' name='titulo' value={titulo} onChange={e => setTitulo(e.target.value)} />
                        <label htmlFor="avaliacao">avaliacao</label>
                        <textarea name="avaliacao" id="avaliacao" value={avaliacao} onChange={e => setAvaliacao(e.target.value)}></textarea>
                        <label htmlFor="nota">nota</label>
                        <input type="number" name="nota" id="nota" value={nota} onChange={(e) => setNota(e.target.value)} />
                        <button onClick={EnviarComentario}>ENVIAR</button>
                </div>
        )
}

export default PostarComentario;