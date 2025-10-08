import { Routes, Route, BrowserRouter } from "react-router"

import Home from "./pages/home"
import Login from "./pages/login"
import Registrar from "./pages/registro"
import Perfil from "./pages/perfil"
import NotFound from "./pages/notfound"
import MoviePage from './pages/Movie'
import ConfigurarPerfil from "./pages/configurarPerfil"

const Navegacao = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path='/movie/:id' element={<MoviePage />} />
        <Route path='/perfil/configurar' element={<ConfigurarPerfil />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  )
}

export default Navegacao