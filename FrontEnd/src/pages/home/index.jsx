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
                onClick={() => setURLpages(moviesURLtop_rated)}
              >
                Melhores ranqueados
              </li>
              <li
                className="menu-item"
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
          <ul className='lista_paginas'>
            <li onClick={() => setPagina(1)}>1</li>
            <li onClick={() => setPagina(2)}>2</li>
            <li onClick={() => setPagina(3)}>3</li>
            <li onClick={() => setPagina(4)}>4</li>
          </ul>
        </div>


        <div className="Recomendacoes"
          id="RecomendacoesFilmesSeries">
          <HomeCultBridgeRecommendation />
        </div>

        <div className="container_reviews">
          <div className="container_reviews_content">
            <div className="reviews_title">
              <h1>ANÁLISES EM ALTA</h1>
              <div className="bloco_vermelho" />
            </div>

            <div className="review">
              <div className="lado_esquerdo">
                <img src={Scarface} alt="" />
              </div>
              <div className="lado_direito">
                <div className="camada1">
                  <div className="perfil">
                    <img src={Chigurh} alt="" />
                    <h3>Lucas Viana</h3>
                    <FaStar />

                    <h4>9.5</h4>
                  </div>
                  <div className="review_content">
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, ex dolore saepe fugit corrupti consequuntur similique vel quasi dolores enim provident reiciendis veritatis totam recusandae quisquam, aliquid labore, explicabo sed!</h4>
                  </div>
                  <div className="interacao">
                    <div className="lado_esquerdo">
                      <div className="icone">
                        < CiHeart />
                      </div>
                      <h3>17K</h3>
                    </div>
                    <div className="lado_central">
                      < FaCommentDots />
                      <h3>17K</h3>
                    </div>
                    <div className="lado_direito">
                      < MdOutlineDateRange />
                      <h3>2025-01-25</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

          <div className="botao_carregar">
            <button>VER MAIS</button>
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home