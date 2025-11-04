import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import api from '../../api.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { FaStar } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

import Scarface from '../../assets/images/Scarface.png'
import Chigurh from '../../assets/images/Chigurh.png'
import Coracao from '../../assets/images/heart.png'

import Foguinho from '../../assets/images/Foguinho.png'
import Header from '../../components/Header/index.jsx'
import Footer from '../../components/Footer/index.jsx'

import './index.scss'
import HomeCultBridge from '../../components/HomeCultBridge';
import SwiperCard from '../../components/SwiperCard/SwiperCard';
import HomeCultBridgeRecommendation from '../../components/HomeCultBridgeRecommendation'
import SessaoComentarios from '../../components/Analises/index.jsx';

const moviesURL = import.meta.env.VITE_API;
const moviesURLtop_rated = import.meta.env.VITE_API_TOP_RATED;
const moviesURLpopulares = import.meta.env.VITE_API_POPULAR;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [topComments, setTopComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(1);
  const [URLpages, setURLpages] = useState(moviesURLtop_rated);

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
    const topRatedUrl = `${URLpages}?${apiKey}&language=pt-BR&page=${pagina}`;
    getTopRatedMovies(topRatedUrl);
  }, [pagina, URLpages]);

  const hasEnoughSlidesForLoop = topMovies.length >= 8;

  return (
    <>
      <div className="container_home">
        <Header />

        <HomeCultBridge />

        {/* SEÇÃO DE FILMES */}
        <div className="container_highlights"
          id="DestaquesCinema">
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
            <ul className="menu-categorias">
              <li
                className="menu-item"
                style={{fontWeight: '600'}}
                onClick={() => setURLpages(moviesURLtop_rated)}
              >
                Ranqueados
              </li>
              <li
                className="menu-item"
                style={{fontWeight: '600'}}
                onClick={() => setURLpages(moviesURLpopulares)}
              >
                Populares
              </li>
            </ul>

            <div className="carrossel"
            >
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
        {/* <ul className='lista_paginas'>
          <li id='Bolinha' onClick={() => setPagina(1)}>1</li>
          <li id='Bolinha' onClick={() => setPagina(2)}>2</li>
          <li id='Bolinha' onClick={() => setPagina(3)}>3</li>
          <li id='Bolinha' onClick={() => setPagina(4)}>4</li>
        </ul> */}

        <div className="Recomendacoes"
          id="RecomendacoesFilmesSeries">
          <HomeCultBridgeRecommendation />
        </div>

        <SessaoComentarios />

        <Footer />
      </div>
    </>
  )
}

export default Home