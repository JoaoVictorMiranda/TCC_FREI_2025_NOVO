import { Routes, Route, BrowserRouter } from "react-router"

import React from 'react'
import Home from "./Home.jsx"
import Login from "./pages/login/Login.jsx"
import Registrar from "./pages/registro/registro.jsx"
import Perfil from "./pages/perfil/perfil.jsx"

const Navegacao = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>

  )
}

export default Navegacao