import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import api from '../../api.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Foguinho from '../../assets/images/Foguinho.png'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import './index.scss'
import SwiperCard from '../../components/SwiperCard/SwiperCard';
import CommentCard from '../../components/CommentCard/CommentCard';

const moviesURLtop_rated = import.meta.env.VITE_API_TOP_RATED;
const moviesURLpopulares = import.meta.env.VITE_API_POPULAR;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [topComments, setTopComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const navigate = useNavigate();

  // Buscar comentários
  const getComments = async () => {
    try {
      setLoadingComments(true);
      setCommentsError(null);
      
      const token = localStorage.getItem('token');
      console.log('🔑 Token:', token ? 'Encontrado' : 'Não encontrado');
      
      if (!token) {
        setCommentsError('Faça login para ver os comentários');
        return;
      }

      const response = await api.get('/post', {
        headers: {
          Authorization: `x-access-token ${token}`
        }
      });
      
      console.log('✅ Comentários carregados:', response.data);
      setTopComments(response.data);
      
    } catch (error) {
      console.error('❌ Erro ao buscar comentários:', error);
      
      if (error.response?.status === 401) {
        setCommentsError('Acesso não autorizado. Token inválido ou expirado.');
        localStorage.removeItem('token'); // Limpa token inválido
      } else {
        setCommentsError('Erro ao carregar comentários');
      }
    } finally {
      setLoadingComments(false);
    }
  };

  // Buscar filmes
  const getTopRatedMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTopMovies(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  useEffect(() => {
    // Filmes
    const topRatedUrl = `${moviesURLtop_rated}?${apiKey}&language=pt-BR`;
    getTopRatedMovies(topRatedUrl);
    
    // Comentários
    getComments();
  }, []);

  const hasEnoughSlidesForLoop = topMovies.length >= 8;

  return (
    <>
      <div className="container_home">
        <Header User={"BOM DIA"} />

        {/* SEÇÃO DE FILMES */}
        <div className="container_highlights">
          <div className="highlights_content">
            <div className="highlights_title">
              <div className="lado_esquerdo">
                <img src={Foguinho} alt="Ícone de fogo" />
              </div>
              <div className="lado_direito">
                <h1>DESTAQUES DO CINEMA</h1>
                <h3>Esses filmes estão bombando!</h3>
              </div>
            </div>

            <div className="carrossel">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                loop={hasEnoughSlidesForLoop}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
              >
                {topMovies.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <SwiperCard movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* SEÇÃO DE REVIEWS */}
        <div className="container_reviews">
          <div className="reviews_title">
            <h1>Últimas Reviews</h1>
          </div>
          
          {/* Loading */}
          {loadingComments && <div>Carregando comentários...</div>}
          
          {/* Mensagem de erro */}
          {commentsError && (
            <div className="error-message">
              {commentsError}
            </div>
          )}
          
          {/* Comentário estático de exemplo (sempre visível) */}
          <div className="Card_post">
            <h2>João Victor</h2>
            <h3>Harry potter e o calice de fogo</h3>
            <p>01/10/2025</p>
            <p>Nota: 9,3</p>
            <p>Reassisti esta pérola e achei maravilhoso como sempre mesmo sendo muito diferente do livro...</p>
            <p>12 Likes</p>
            <button type='button' onClick={() => alert("CURTIDO")}>Curtir</button>
          </div>

          {/* Componente CommentCard de exemplo */}
          <CommentCard 
            nome={"Lucas"} 
            titulo={"Titulo bom de site"} 
            data={"03/10/2025"} 
            avaliacao={"AAAAAAA"} 
            likes={"25"} 
          />

          {/* Comentários da API (só mostra se tiver dados) */}
          {topComments.length > 0 && topComments.map((comment) => (
            <CommentCard 
              key={comment.id_post}
              nome={comment.nome || comment.usuario?.nome || 'Usuário'}
              titulo={comment.titulo}
              data={new Date(comment.criado_em).toLocaleDateString('pt-BR')}
              nota={comment.nota}
              avaliacao={comment.avaliacao}
              likes={comment.curtidas || comment.likes}
            />
          ))}
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home