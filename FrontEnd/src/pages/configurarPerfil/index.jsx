import React, { useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import './index.scss'
import godfather from '../../../../BackEnd/public/assets/cultbridge_perfil/godfather.svg'
import BradPitt from '../../../../BackEnd/public/assets/cultbridge_perfil/BradPitt.svg'
import Heisemberg from '../../../../BackEnd/public/assets/cultbridge_perfil/Heisemberg.svg'
import McLovin from '../../../../BackEnd/public/assets/cultbridge_perfil/Mclovin.svg'

const ConfigurarPerfil = () => {

    let [fotoAtual, setFotoAtual] = useState();

    return (
        <div className='container_configurar'>
            <Header />
            <h1>Configure seu perfil</h1>
            <p>Aqui voce podera configurar muitas coisas do seu perfil então seja bem vindo e seja voce mesmo independente de qualquer coisa
            </p>
            <h2>Você é importante nunca mude pra agradar o outro apenas para ser você mesmo...</h2>


            {/* Aqui vou fazer jaja a parte de configurar foto de perfil mas não sei se consigo ainda hoje mas vou ver ainda */}
            <h3>Troque sua foto de perfil.</h3>
            {/* DADOS FIXOS QUE SERÂO MUDADOS DEPOIS RELAXA */}
            <div className="container_fotos">
                <div className="foto_atual">
                    <img src={fotoAtual} alt="" />
                </div>
                <div className="fotos">
                    <div className="escolher_foto"><img src={godfather} alt="" onClick={() => setFotoAtual(godfather)} /></div>
                    <div className="escolher_foto"><img src={BradPitt} alt="" onClick={() => setFotoAtual(BradPitt)} /></div>
                    <div className="escolher_foto"><img src={Heisemberg} alt="" onClick={() => setFotoAtual(Heisemberg)} /></div>
                    <div className="escolher_foto"><img src={McLovin} alt="" onClick={() => setFotoAtual(McLovin)} /></div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ConfigurarPerfil