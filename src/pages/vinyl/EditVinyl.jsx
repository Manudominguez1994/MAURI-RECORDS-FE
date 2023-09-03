import React, { useEffect, useState } from 'react'
import service from '../../services/service.config'
import { useNavigate, useParams } from 'react-router-dom'

function EditVinyl() {

// el params lo hemos usado para traernos la id dinámica del album
const params = useParams()
// console.log(params)

const navigate = useNavigate()

//ESTADOS que guardan un valor inicial y un set para modificarlos

const [ titleInput, setTitleInput ] = useState(null)
const [ artistInput, setArtistInput ] = useState(null)
const [ imageInput, setImageInput ] = useState(null)
const [ descriptionInput, setDescriptionInput ] = useState(null)
const [ priceInput, setPriceInput ] = useState(null)
const [ stateConservationInput, setStateConservationInput ] = useState(null)
const [ genreInput, setGenreInput ] = useState(null)

// funciones handle que efectuen los cambios que nos ordena el usuario en el form

const handleTitleChange = (event) => {
    setTitleInput(event.target.value)
}

const handleArtistChange = (event) => {
    setArtistInput(event.target.value)
}

const handleImageChange = (event) => {
    setImageInput(event.target.value)
}

const handleDescriptionChange = (event) => {
    setDescriptionInput(event.target.value)
}

const handlePriceChange = (event) => {
    setPriceInput(event.target.value)
}

const handleStateConservationChange = (event) => {
    setStateConservationInput(event.target.value)
}

const handleGenreChange = (event) => {
    setGenreInput(event.target.value)
}

// efectua la llamada cuando se monta el componente
useEffect(() => {
    getVinylDetails()
}, [])

// configuramos la llamada al BE que nos trae la info por defecto del vinilo
const getVinylDetails = async () => {

    try {
        const response = await service.get(`/vinyl/${params.vinyl}`)
        
        setTitleInput(response.data.title)
        setArtistInput(response.data.artist)
        setImageInput(response.data.image)
        setDescriptionInput(response.data.description)
        setPriceInput(response.data.price)
        setStateConservationInput(response.data.stateConservation)
        setGenreInput(response.data.genre)

        console.log('este es mi vinilo defaul', response.data)

    } catch (error) {
        navigate('/error')
    }
} 

// hacemos la llamada a la ruta del BE que actualiza los valores de los inputs del form
const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        const response = await service.put(`/vinyl/${params.vinyl}`, {title: titleInput, 
            artist: artistInput, 
            image: imageInput, 
            description: descriptionInput,
            price: priceInput,
            stateConservation: stateConservationInput,
            genre: genreInput
    }) 
    console.log('este es mi vinilo actualizado', response.data)

    navigate(`/vinylDetails/${response.data._id}`)
        
    } catch (error) {
        navigate('/error')
    }
}

if (titleInput === null && artistInput  === null && imageInput  === null && descriptionInput  === null && priceInput  === null && stateConservationInput  === null && genreInput === null) {
    return <h3>...cargando cambios</h3>
}


  return (
    <>
    <div>EditVinyl</div>

    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input type="text" name="title" value={titleInput} onChange={handleTitleChange}/>

        <br />

        <label htmlFor="artist">Banda</label>
        <input
          type="text"
          name="artist"
          value={artistInput}
          onChange={handleArtistChange}
        />

        <br />

        <label htmlFor="image">Imagen</label>
        <input type="text" name="image" value={imageInput} onChange={handleImageChange}/>

        <br />

        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          name="description"
          value={descriptionInput}
          onChange={handleDescriptionChange}
          
        />

        <br />

        <label htmlFor="price">Precio</label>
        <input
          type="number"
          name="price"
          value={priceInput}
          onChange={handlePriceChange}
          
        />

        <br />

        <label htmlFor="stateConservation">Estado de conservación</label>
        <select value={stateConservationInput} onChange={handleStateConservationChange}>
          <option value="">Seleccionar</option>
          <option value="Como Nuevo">Como nuevo</option>
          <option value="Buen estado">Buen estado</option>
          <option value="Algo desgastado">Algo desgastado</option>
          <option value="Muy Desgastado">Muy Desgastado</option>
        </select>

        <br />

        <label htmlFor="genre">Género</label>
        <select value={genreInput} onChange={handleGenreChange}>
          <option value="">Seleccionar</option>
          <option value="Rock">Rock</option>
          <option value="Pop">Pop</option>
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="Jazz">Jazz</option>
          <option value="Electronica">Electrónica</option>
          <option value="Soul">Soul</option>
          <option value="Reagge">Reagge</option>
        </select>

        <br />

        <button type="submit">Guardar cambios</button>
      </form>
    </>
  );
}
  


export default EditVinyl