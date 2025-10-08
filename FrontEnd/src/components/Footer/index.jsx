import React from 'react';
import './index.scss';
import InstagramIcon from '../../assets/instagram.svg';
import FacebookIcon from '../../assets/facebook.svg';
import TikTokIcon from '../../assets/tiktok.svg';
import LinkedinIcon from '../../assets/linkedin.svg';
import YoutubeIcon from '../../assets/youtube.svg';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='container_footer'>
      <div className="footer_content">
        <div className="container_esquerda">
          <div className="container_links">
            <h2>CULTBRIDGE</h2>
            <p>O CultBridge é uma mescla de redes sociais e comunicativas acopladas em uma só interface.</p>
            <div className="icons">
              <div><img src={InstagramIcon} alt="Instagram" /></div>
              <div><img src={FacebookIcon} alt="Facebook" /></div>
              <div><img src={TikTokIcon} alt="TikTok" /></div>
              <div><img src={LinkedinIcon} alt="LinkedIn" /></div>
              <div><img src={YoutubeIcon} alt="YouTube" /></div>
            </div>

            <button type='button' onClick={handleBackToTop}>Voltar ao Topo</button>
          </div>
        </div>

        <div className="container_direito">
          <div> 
            <h3>Navegar</h3>
            <ul>
              <li>Home</li>
              <li>Em Alta</li>
              <li>Filmes</li>
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              <li>Desenvolvedores</li>
              <li>Contato</li>
            </ul>
          </div>
        </div>

        <div className="container_direitos">
          <p>© Cultbridge. Todos os direitos reservados.</p>
        </div> 
      </div>
    </div>
  )
}

export default Footer