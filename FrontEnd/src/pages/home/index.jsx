import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import './index.scss'
import SwiperCard from '../../components/SwiperCard/SwiperCard';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const navigate = useNavigate();

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;
    getTopRatedMovies(topRatedUrl);
  }, []);

  const hasEnoughSlidesForLoop = topMovies.length >= 8;

  return (
    <>
      <div className="container_home">
        <Header User={"BOM DIA"} />

        <div className="container_highlights">
          <div className="highlights_content">
            <div className="highlights_title">
              <div className="lado_esquerdo">
                <img src={Foguinho} alt="" />
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
                    <SwiperCard
                      movie={movie}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Ainda vou modelar o banco certinho pra evitar problemas entre post e avaliação de filmes */}
        {/* Vou criar em componente esse card mais tarde to passando mal então talvez não termine hoje */}

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