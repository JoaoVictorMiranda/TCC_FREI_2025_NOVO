function entrando() {
    let emailDigitado = document.getElementById("email").value;
    let senhaDigitada = document.getElementById("senha").value;
    let avisoElemento = document.querySelector('.aviso');
    let usuarioEncontrado = false; 
    // Fazendo o fetch do JSON
    fetch('teste.json')
        .then(resposta => resposta.json())
        .then(dados => {

            for(let i = 0; i < dados.users.length; i++){
                            // Verificando a senha e email juntos
            if (senhaDigitada === dados.users[i].password && emailDigitado === dados.users[i].email) {
                usuarioEncontrado = true;
                break
            } else {

            }                        
            }
            // Verificando as credenciais e exibindo o aviso
            if (usuarioEncontrado == true) {
                avisoElemento.textContent = "Acesso concedido!";
                avisoElemento.style.color = "green"; // Mensagem de sucesso em verde
            } else {
                avisoElemento.textContent = "Credenciais incorretas.";
                avisoElemento.style.color = "red"; // Mensagem de erro em vermelho
            }   

        })
        .catch(erro => console.error("Erro ao carregar JSON:", erro));
}
