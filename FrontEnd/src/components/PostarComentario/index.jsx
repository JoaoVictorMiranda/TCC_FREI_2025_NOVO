import React, {useState} from 'react'
import './index.scss'


const PostarComentario = () => {
        const [nota, setNota] = useState();
        
        function Enviar(){
                //FAZ
                if(nota > 5){
                        alert("MAIOR QUE 5")
                        //TA RECARREGANDO A PAGINA ARRUMA
                }else{
                }
        }

  return (
    <div>
        <form >
                <label htmlFor="titulo">Titulo</label>
                <input type="text" placeholder='Titulo' name='titulo'  />
                <label htmlFor="avaliacao">avaliacao</label>
                <textarea name="avaliacao" id="avaliacao"></textarea>
                <label htmlFor="nota">nota</label>
                <input type="number" name="nota" id="nota" onChange={(e) => setNota(e.target.value)} />
                <button onClick={Enviar} >ENVIAR</button>
        </form>
    </div>
  )
}

export default PostarComentario


/*
   INSERT INTO post_avaliacao (titulo, id_filme, avaliacao, id_user, nota, criado_em)
        VALUES
    (?,?,?,?,?,?);
*/