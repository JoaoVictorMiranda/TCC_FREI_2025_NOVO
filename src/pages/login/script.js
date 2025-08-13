function cadastrando() {
    let emailDigitado = document.getElementById("email").value;
    let senhaDigitada = document.getElementById("senha").value;

    let url = `http://localhost:5520/users`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailDigitado,
            password: senhaDigitada
        })
    })
        .then(data => {
            alert('Cadastro realizado com sucesso!');
        })
}


//FALHEI MISERAVELMENTE EM TENTAR FAZER O LOGIN TENTAREI OUTRA HORA TO COM MUITA DOR DE CABEÇA