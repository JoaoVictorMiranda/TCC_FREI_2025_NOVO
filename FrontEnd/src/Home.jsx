import { useState } from 'react'
import './Home.scss'
import Header from './components/Header/Header'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*<h1>VAI TOMAR NO CU GILBERTO E MARCOS</h1>*/}
      <div className="container_home">
      <Header />



      </div>
    </>
  )
}

export default Home
