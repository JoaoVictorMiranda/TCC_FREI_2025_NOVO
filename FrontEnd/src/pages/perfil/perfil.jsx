import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ ajuste aqui

const Perfil = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);

                // Nome
                const nomeUsuario = decoded.nome || decoded.user?.nome || '';
                setNome(nomeUsuario);

                // Data de nascimento (ex.: "2002-10-18")
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

    // Função para calcular a idade em anos
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

    return (
        <div>
            <h1>Nome:</h1>
            <p>{nome}</p>
            <h1>Idade: </h1>
            <p>{idade}</p>
        </div>
    );
};

export default Perfil;
