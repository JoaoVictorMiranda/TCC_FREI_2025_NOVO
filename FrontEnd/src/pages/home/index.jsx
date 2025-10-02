import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

        <div className="container_reviews">
          <div className="reviews_title">
            <h1>Últimas Reviews</h1>
          </div>
          {/* Ainda vou modelar o banco certinho pra evitar problemas entre post e avaliação de filmes */}
          {/* Vou criar em componente esse card mais tarde to passando mal então talvez não termine hoje */}
          <div className="container_reviews">
            <div className="Card_post">
              <h2>João Victor</h2>
              <h3>Harry potter e o calice de fogo</h3>
              <p>01/10/2025</p>
              <p>Nota: 9,3</p>
              <p>Reassisti esta pérola e achei maravilhoso como sempre mesmo sendo muito diferente do livro a cena do harry chorando no corpo do cedrico ainda pega no coração de quem assiste</p>
              <button type='button' onClick={() => alert("CURTIDO")}>Curtir</button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home