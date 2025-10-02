import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Foguinho from '../../assets/images/Foguinho.png'
import Scarface from '../../assets/images/Scarface.png'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import './index.scss'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageURL = import.meta.env.VITE_IMG;


function Home() {

  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };
  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;
    getTopRatedMovies(topRatedUrl);
  }, []);



  return (
    <>
      <div className="container_home">
        <Header />

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
                loop
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
              >
                <SwiperSlide>
                  <div className="movie_render">
                    <img src={Scarface} alt="" />

                    <div className="alinhador">
                      <div className="lado_esquerdo">
                        <img src={Foguinho} alt="" />
                        <h3>17K</h3>
                      </div>
                      <div className="lado_direito">
                        <img src={Foguinho} alt="" />
                        <h3>8.5</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="movie_render">
                    <img src={Scarface} alt="" />
                    <div className="alinhador">
                      <div className="lado_esquerdo">
                        <img src={Foguinho} alt="" />
                        <h3>17K</h3>
                      </div>
                      <div className="lado_direito">
                        <img src={Foguinho} alt="" />
                        <h3>8.5</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="movie_render">
                    <img src={Scarface} alt="" />
                    <div className="alinhador">
                      <div className="lado_esquerdo">
                        <img src={Foguinho} alt="" />
                        <h3>17K</h3>
                      </div>
                      <div className="lado_direito">
                        <img src={Foguinho} alt="" />
                        <h3>8.5</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="movie_render">
                    <img src={Scarface} alt="" />
                    <div className="alinhador">
                      <div className="lado_esquerdo">
                        <img src={Foguinho} alt="" />
                        <h3>17K</h3>
                      </div>
                      <div className="lado_direito">
                        <img src={Foguinho} alt="" />
                        <h3>8.5</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="movie_render">
                    <img src={Scarface} alt="" />
                    <div className="alinhador">
                      <div className="lado_esquerdo">
                        <img src={Foguinho} alt="" />
                        <h3>17K</h3>
                      </div>
                      <div className="lado_direito">
                        <img src={Foguinho} alt="" />
                        <h3>8.5</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div className="container_reviews">
          <div className="reviews_title">
            {topMovies.length > 0 && topMovies.map((movie) => <h1>{movie.title}</h1>)}
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home
