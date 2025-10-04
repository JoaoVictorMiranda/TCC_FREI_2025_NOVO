import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';

const imageURL = import.meta.env.VITE_IMG;

const SwiperCard = ({ movie, showLink = true }) => {

    return (
        <div>
            <div className="movie_render">
                <img id='Posteres'
                    src={imageURL + movie.poster_path}
                    alt={movie.title}
                />
                <div className="alinhador">
                    <div className="lado_esquerdo">
                        <FaUser />
                        <h3>{movie.popularity.toFixed(1)}</h3>

                    </div>
                    <div className="lado_direito">
                        <FaStar />
                        <h3>{movie.vote_average.toFixed(1)}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwiperCard