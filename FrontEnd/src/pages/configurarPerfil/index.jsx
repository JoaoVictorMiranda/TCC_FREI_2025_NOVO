import { useState } from 'react';
import api from '../../api';

function ConfigurarPerfil() {
    const [foto, setFoto] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione apenas arquivos de imagem');
            e.target.value = '';
            return;
        }
        
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('A imagem deve ter no máximo 5MB');
            e.target.value = '';
            return;
        }
        
        setFoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!foto) {
            alert('Selecione uma imagem');
            return;
        }

        const formData = new FormData();
        formData.append('img', foto);

        setLoading(true);

        try {
            const response = await api.post('/usuario/perfil', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const novaUrl = response.data.foto_perfil;

            if (novaUrl) {
                localStorage.setItem('fotoPerfil', novaUrl);
                window.dispatchEvent(new Event('fotoPerfilAtualizada'));
            }

            alert('Foto de perfil atualizada com sucesso!');
            setFoto(null); // Limpa o estado após sucesso
            document.querySelector('input[type="file"]').value = ''; // Limpa o input
        } catch (error) {
            console.error('Erro ao enviar a foto:', error);
            alert('Erro ao atualizar foto de perfil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
            />
            <button type="submit" disabled={loading || !foto}>
                {loading ? 'Enviando...' : 'Enviar'}
            </button>
        </form>
    );
}

export default ConfigurarPerfil;