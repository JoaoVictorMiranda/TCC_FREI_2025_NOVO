import './index.scss'
import pipoca from '../../assets/images/pipoca.png'

export default function index() {
    return (
        <div className='container_fundo_home'>
            <div className="alinhador">
                <div className="lado_esquerdo">
                    <h1>CULTBRIDGE</h1>
                    <h3>UMA PONTE ENTRE AS CULTURAS</h3>
                    <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis aliquid dignissimos impedit sequi iusto inventore velit pariatur maiores aspernatur enim, cupiditate, sunt iste accusamus! Sit vero dolorum eum numquam ut.</h4>
                    <button>COMEÇAR</button>
                </div>
                <div className="lado_direito">
                    <img src={pipoca} alt="" />
                </div>
            </div>
        </div>
    )
}
