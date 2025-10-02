import React from 'react'
import Foguinho from '../../assets/images/Foguinho.png'

const imageURL = import.meta.env.VITE_IMG;

const SwiperCard = ({ movie, showLink = true }) => {
    return (
        <div>
            <div className="movie_render">
                <img
                    src={imageURL + movie.poster_path}
                    alt={movie.title}
                />
                <div className="alinhador">
                    <div className="lado_esquerdo">
                        <img src={Foguinho} alt="Ícone de popularidade" />
                        <h3>17K</h3>
                    </div>
                    <div className="lado_direito">
                        <img src={Foguinho} alt="Ícone de avaliação" />
                        <h3>{movie.vote_average}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwiperCard