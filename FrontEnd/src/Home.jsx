import { useState } from 'react'
import './Home.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function Home() {


  return (
    <>
      <div className="container_home">
        <Header User={"BOM DIA"} />


      <Footer />
      </div>
    </>
  )
}

export default Home
