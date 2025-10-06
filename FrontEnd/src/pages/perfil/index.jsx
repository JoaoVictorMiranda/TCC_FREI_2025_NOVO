import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router';

const Perfil = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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


    function Deslogar(){
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


            <button onClick={Deslogar} > Deslogar</button>



            <Footer />
        </div>
    );
};

export default Perfil;
