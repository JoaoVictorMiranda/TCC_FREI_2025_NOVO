import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './index.scss';

export default function ConfigurarPerfil() {
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded.user?.id || decoded.nome; // identificador único

      // salva a foto associada ao usuário
      localStorage.setItem(`fotoPerfil_${userId}`, foto);

      // dispara evento para atualizar o Perfil
      window.dispatchEvent(new Event("fotoPerfilAtualizada"));

      setLoading(false);
      alert('Foto enviada!');
    }, 1500);
  };

  return (
    <div className="container_configurarPerfil">
      <form className="form_configurarPerfil" onSubmit={handleSubmit}>
        <div className="preview_configurarPerfil">
          {foto ? (
            <img src={foto} alt="Preview" className="img_preview" />
          ) : (
            <div className="placeholder_configurarPerfil">Escolha uma foto</div>
          )}
        </div>

        <input
          className="input_configurarPerfil"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />

        <button
          className="button_configurarPerfil"
          type="submit"
          disabled={loading || !foto}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
