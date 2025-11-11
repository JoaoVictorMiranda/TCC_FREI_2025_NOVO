import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import DefinirTopico from '../../components/Topicos';
import ModalPostarComentario from '../../components/ModalPostarComentario';
import { CiSearch } from "react-icons/ci";
import "./index.scss"

const Comunidades = () => {
    let [nome, setNome] = useState();
    let [descricao, setDescricao] = useState();
    let [imagem, setImagem] = useState();
    const [modal, setModal] = useState(false)
    const [busca, setBusca] = useState('')
    const [comunidade, setComunidade] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (!token) {
            alert("TA PERDIDO FI?");
            navigate('/login')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nome', nome);
        formData.append('descricao', descricao);

        if (imagem) {
            formData.append('img', imagem);
        }

        try {
            await api.post('/comunidade', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert("COMUNIDADE CRIADA COM SUCESSO");
        } catch (error) {
            console.error("Erro ao criar comunidade:", error);
            alert("Erro ao criar comunidade");
        }
    };

    async function PuxarComunidades() {
        const resp = await api.get('/comunidades')
        console.log(resp.data.dados)
        setComunidade(resp.data.dados)
    }

    useEffect(() => {
        PuxarComunidades()
    }, [])

    return (
        <div className='component-comuni'>

            <Header />
            <div className='ConteudoPaginaFilmes'>
                <DefinirTopico tema={'COMUNIDADES'} />

                <div className="TituloPesquisarFilmesDinamicos">
                    <div className="BarraPesquisa">
                        <h3><CiSearch style={{ color: 'white' }} /></h3>
                        <input type="text" placeholder='Pesquisar...' value={busca} onChange={(e => setBusca(e.target.value))}></input>
                    </div>
                    <button onClick={() => setModal(true)}>CRIAR COMUNIDADE</button>
                </div>
                <div className="ListarComunidades">
                    {
                        comunidade.map((comunidade) => (
                            <div className='BlocoComunidade' onClick={() => navigate(`/comunidade/${comunidade.id_comunidade}`)}>
                                {comunidade.nome}
                                {comunidade.descricao}
                            </div>
                        ))
                    }
                </div>
            </div>


            <Footer />

            <ModalPostarComentario
                abrir={modal}
                setModal={() => setModal(!modal)}
                fechar={() => setModal(false)}
                tema={'Criar Comunidade'}
                conteudo={
                    <form className='infor-comuni' onSubmit={handleSubmit}>
                        <label id='Nome-comuni' htmlFor="nome">Nome da comunidade</label>
                        <input className='barrinha-aaa' type="text" name='nome' placeholder='Nome da comunidade' onChange={(e) => setNome(e.target.value)} required />
                        <br />
                        <label htmlFor="descricao">Descrição da comunidade</label>
                        <input className='barrinha-aaa' type="text" name='descricao' placeholder='Descrição da comunidade'
                            onChange={(e) => setDescricao(e.target.value)} required />

                        <label htmlFor="foto">Foto de capa da comunidade(optional)</label>
                        <br />
                        <input

                            className='fotin-grupo'
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagem(e.target.files[0])} />
                        <button className='submit' type='submit'>Mandar</button>
                    </form>} />

        </div>
    )
}

export default Comunidades