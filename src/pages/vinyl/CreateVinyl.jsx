import React from 'react'


function CreateVinyl() {


  return (
    <>
        <div>CREAR VINILO</div>

        <form >
            <label htmlFor="title">Título</label>
            <input type="text" name='title'/>

            <br />

            <label htmlFor="artist">Banda</label>
            <input type="text" name='artist'/>

            <br />

            <label htmlFor="image">Imagen</label>
            <input type="text" name='image'/>

            <br />

            <label htmlFor="description">Descripción</label>
            <input type="text" name='description'/>

            <br />

            <label htmlFor="price">Precio</label>
            <input type="number" name='price'/>

            <br />

            <label htmlFor="stateConservation">Estado de conservación</label>
            <select>
                <option value="">Seleccionar</option>
                <option value="Como Nuevo">Como nuevo</option>
                <option value="Buen estado">Buen estado</option>
                <option value="Algo desgastado">Algo desgastado</option>
                <option value="Muy Desgastado">Muy Desgastado</option>
            </select>

            <br />

            <label htmlFor="genre">Género</label>
            <select>
                <option value="">Seleccionar</option>
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Jazz">Jazz</option>
                <option value="Electronica">Electrónica</option>
                <option value="Soul">Soul</option>
                <option value="Reagge">Reagge</option>
            </select>
            

            <br />

            <button>Subir vinilo</button>

            

            


        </form>

    
    
    </>

  )
}

export default CreateVinyl