import {Routes, Route, BrowserRouter} from  "react-router"

import React from 'react'
import Home from "./home"

const Navegacao = () => {
  return (
<BrowserRouter>
<Routes>
<Route   path="/" element={<Home/>}     />



</Routes>

</BrowserRouter>

  )
}

export default Navegacao