import React from 'react'
import Foguinho from '../../assets/images/Foguinho.png'
import { FaStar } from 'react-icons/fa';

const imageURL = import.meta.env.VITE_IMG;



const SwiperCard = ({ movie, showLink = true }) => {
    const popularidade = movie.popularity

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
                        <h3>{movie.popularity}</h3>
                    </div>
                    <div className="lado_direito">
                        <FaStar />
                        <h3>{movie.vote_average}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwiperCard