import React, { useEffect, useState } from 'react'
import service from '../../services/service.config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Spinner from 'react-bootstrap/Spinner'


function EditVinyl() {

  const AllGenre = [
    "Rock",
    "Pop",
    "Hip-Hop",
    "Jazz",
    "Electronica",
    "Soul",
    "Reagge",
    "Otros",
  ];
  const AllState = [
    "Como Nuevo",
    "Buen estado",
    "Algo desgastado",
    "Muy Desgastado",
  ];

// el params lo hemos usado para traernos la id dinámica del album
const params = useParams()
// console.log(params)

const navigate = useNavigate()

//ESTADOS que guardan un valor inicial y un set para modificarlos
const [vinylId , setVinylId] = useState("")
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
        setVinylId(response.data._id)
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
    return (
    <div className='spinners'>
      <Spinner animation="grow" variant="primary" />
    </div>
    )
}


  return (
    
    <div className="viniloCreateContainer">

      <h3>Edita tu vinilo</h3>

    <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="title">Título</Form.Label>
        <Form.Control type="text" name="title" value={titleInput} onChange={handleTitleChange}/>

        <br />

        <label htmlFor="artist">Banda</label>
        <Form.Control
          type="text"
          name="artist"
          value={artistInput}
          onChange={handleArtistChange}
        />

        <br />


        <Form.Label htmlFor="description">Descripción</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={descriptionInput}
          onChange={handleDescriptionChange}
          
        />

        <br />

        <Form.Label htmlFor="price">Precio</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={priceInput}
          onChange={handlePriceChange}
          
        />

        <br />

        <Form.Label htmlFor="stateConservation">Estado de conservación</Form.Label>
        <Form.Select value={stateConservationInput} onChange={handleStateConservationChange}>
        {AllState.map((eachState) => {
            return (
              <>
                <option value={eachState}>{eachState}</option>
              </>
            );
          })}
        </Form.Select>

        <br />

        <Form.Label htmlFor="genre">Género</Form.Label>
        <Form.Select value={genreInput} onChange={handleGenreChange}>
        {AllGenre.map((eachGenre) => {
            return (
              <>
                <option value={eachGenre}>{eachGenre}</option>
              </>
            );
          })}
        </Form.Select>

        <br />

        <Button variant="outline-warning" type="submit">Guardar cambios</Button>
        <Link to={`/vinylDetails/${vinylId}`}><Button variant="outline-warning">Cancelar</Button></Link>
      </Form>

     {/* <Link to={`/vinylDetails/${vinylId}/editImage`}><button>Cambiar Imagen</button></Link>  */}
    </div>
  );
}
  


export default EditVinyl