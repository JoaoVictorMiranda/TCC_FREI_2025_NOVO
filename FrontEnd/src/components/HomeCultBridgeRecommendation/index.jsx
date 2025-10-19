import scarface from '../../assets/images/Scarface.png'

import './index.scss'

export default function index() {
    return (
        <div className='HomeAbaRecomendados'>
            <div className="reviews_title">
                <h1>EXPLORAR</h1>
            </div>

            <div className="BannersExibicao">
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
            </div>

            <div className="BannersExibicao">
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
                <div className="banner">
                    <img src={scarface} alt="" />
                </div>
            </div>
        </div>
    )
}
