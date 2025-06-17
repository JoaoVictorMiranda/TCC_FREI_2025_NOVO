function postarComentario() {
    const texto = document.getElementById('textoComentario').value.trim();
    const areaComentarios = document.getElementById('areaComentarios');

    if (texto === '') {
        alert('Digite algo para comentar!');
        return;
    }

    const novoComentario = document.createElement('p');
    novoComentario.textContent = texto;
    areaComentarios.appendChild(novoComentario);

    document.getElementById('textoComentario').value = '';
}

function apagarComentarios() {
    localStorage.removeItem('comentarios');
    document.getElementById('areaComentarios').innerHTML = '';
}
