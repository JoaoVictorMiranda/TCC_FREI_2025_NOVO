import { useState } from 'react';
import api from '../../api';

function ConfigurarPerfil() {
    const [foto, setFoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!foto) {
            alert('Selecione uma imagem');
            return;
        }
    
        const formData = new FormData();
        formData.append('img', foto);
    
            const response = await api.post('/usuario/perfil', formData, {
                headers: {
                    'x-access-token': ` ${localStorage.getItem('token')}`,
                }
            });
            
            alert('Foto de perfil atualizada com sucesso!');
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFoto(e.target.files[0])}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default ConfigurarPerfil;