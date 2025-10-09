import Header from '../../components/Header'
import MovieDetails from '../../components/MovieDetails'
import Footer from '../../components/Footer'
import PostarComentario from '../../components/PostarComentario'

import './index.scss'

export default function index() {
    return (
        <div>
            <Header />
            <MovieDetails />
            <PostarComentario />
            <Footer />
        </div>
    )
}
