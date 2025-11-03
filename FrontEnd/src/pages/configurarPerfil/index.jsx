import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
import './index.scss';

export default function ConfigurarPerfil() {
  const [foto, setFoto] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(URL.createObjectURL(file));
        setFotoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fotoBase64) return;
    
    setLoading(true);

    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded.user?.id || decoded.nome;

      localStorage.setItem(`fotoPerfil_${userId}`, fotoBase64);

      window.dispatchEvent(new Event("fotoPerfilAtualizada"));

      navigate('/perfil');

      setLoading(false);
      alert('Foto atualizada com sucesso!');
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
          disabled={loading || !fotoBase64}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}